<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_return_paginated_users_on_index()
    {
        User::factory()->count(20)->create();

        $response = $this->getJson('/api/users?page=1&perPage=10');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data',
                'current_page',
                'per_page',
                'total'
            ])
            ->assertJsonCount(10, 'data');
    }

    public function
    test_filter_users_by_email_verification_status_on_index()
    {
        User::factory()->count(5)->create(['email_verified_at' => null]);
        User::factory()->count(5)->create(['email_verified_at' => now()]);

        $response = $this->getJson('/api/users?filter[isEmailVerified]=1');

        $response->assertStatus(200)
            ->assertJsonCount(5, 'data');
    }

    public function test_filter_users_by_creation_date_on_index()
    {
        User::factory()->count(3)->create(['created_at' => now()->subDays(5)]);
        User::factory()->count(2)->create(['created_at' => now()]);

        $response = $this->getJson('/api/users?filter[createdSinceDate]=' . now()->subDays(2)->toDateString());

        $response->assertStatus(200)
            ->assertJsonCount(2, 'data');
    }

    public function test_index_search_parameter()
    {
        $author = User::factory()->create();

        $matchingArticle1 = Article::factory()->create([
            'title' => 'Matching Title',
            'content' => 'Some content',
            'author_id' => $author->id,
        ]);

        $matchingArticle2 = Article::factory()->create([
            'title' => 'Another Title',
            'content' => 'Matching content',
            'author_id' => $author->id,
        ]);

        $nonMatchingArticle = Article::factory()->create([
            'title' => 'It does not match',
            'content' => 'It does not match',
            'author_id' => $author->id,
        ]);

        $response = $this->getJson('/api/articles/?search=Matching');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'data',
            'links',
            'total'
        ]);

        $response->assertJsonCount(2, 'data');

        $response->assertJsonFragment(['id' => $matchingArticle1->id]);
        $response->assertJsonFragment(['id' => $matchingArticle2->id]);

        $response->assertJsonMissing(['id' => $nonMatchingArticle->id]);
    }

    public function test_returns_user_on_show()
    {
        $user = User::factory()->create();

        $response = $this->getJson("/api/users/{$user->id}");

        $response->assertStatus(200)
            ->assertJson($user->toArray());

        $this->assertDatabaseHas('users', [
            'name' => $user['name'],
            'email' => $user['email'],
        ]);
    }

    public function test_create_user_and_save_their_avatar_to_storage_on_store()
    {
        $password = $this->faker->password(12, 20);
        $user = [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => $password,
            'password_confirmation' => $password,
        ];

        $response = $this->postJson('/api/users', $user);

        $response->assertStatus(201)
            ->assertJsonStructure(['id', 'name', 'email', 'avatar_url']);
        $this->assertDatabaseHas('users', [
            'name' => $user['name'],
            'email' => $user['email'],
        ]);
    }

    public function test_saves_avatar_when_user_gets_created_on_store()
    {
        Storage::fake('public');

        $password = $this->faker->password(12, 20);
        $user = [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => $password,
            'password_confirmation' => $password,
            'avatar' => UploadedFile::fake()->image('avatar.jpg')
        ];

        $response = $this->postJson('/api/users', $user);

        $response->assertStatus(201)
            ->assertJsonStructure(['id', 'name', 'email', 'avatar_url']);

        $avatarUrl = $response->json('avatar_url');
        $filename = basename($avatarUrl);
        $this->assertTrue(Storage::disk('public')->exists('avatars/' . $filename));
    }

    public function test_modifies_user_details_on_update()
    {
        $user = UserFactory::new()->create();
        $this->actingAs($user);

        $updatedData = [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ];

        $response = $this->putJson("/api/users/{$user->id}", $updatedData);

        $response->assertStatus(200)
            ->assertJson($updatedData);

        $this->assertDatabaseHas('users', $updatedData);

        //resetting email should nullify email_verified_at
        $this->assertDatabaseHas('users', [
            'id' => $user['id'],
            'email_verified_at' => null
        ]);
    }

    public function test_modifies_avatar_of_user_on_update()
    {
        Storage::fake('public');

        $user = UserFactory::new()->create();
        $this->actingAs($user);

        $avatarFile = UploadedFile::fake()->image('avatar.jpg');

        $updatedData = [
            'avatar' => $avatarFile
        ];

        $response = $this->putJson("/api/users/{$user->id}", $updatedData);

        $response->assertStatus(200);
        $responseAvatarUrl = $response->json('avatar_url');
        $filename = basename($responseAvatarUrl);

        //assert: image was saved on disk
        $this->assertTrue(Storage::disk('public')->exists('avatars/' . $filename));

        $avatarUrl = Storage::disk('public')->url('avatars/' . $filename);
        //assert: path of image file is same as in response
        $this->assertEquals($responseAvatarUrl, $avatarUrl);
    }

    public function test_deletes_old_avatar_file_of_user_on_update()
    {
        Storage::fake('public');

        $oldAvatarFile = UploadedFile::fake()->image('avatar.jpg');
        $oldFilename = $oldAvatarFile->hashName();

        Storage::disk('public')->putFileAs('avatars', $oldAvatarFile, $oldFilename);
        $oldAvatarUrl = Storage::disk('public')->url('avatars/' . $oldFilename);

        $user = UserFactory::new()->create(['avatar_url' => $oldAvatarUrl]);

        $this->actingAs($user);

        $newAvatarFile = UploadedFile::fake()->image('new_avatar.png');
        $updatedData = [
            'avatar' => $newAvatarFile
        ];

        $response = $this->putJson("/api/users/{$user->id}", $updatedData);

        $response->assertStatus(200);
        $this->assertFalse(Storage::disk('public')->exists('avatars/' . $oldFilename));
    }

    public function test_delete_avatar_of_user_on_update()
    {
        Storage::fake('public');

        $oldAvatarFile = UploadedFile::fake()->image('avatar.jpg');
        $oldFilename = $oldAvatarFile->hashName();

        Storage::disk('public')->putFileAs('avatars', $oldAvatarFile, $oldFilename);
        $oldAvatarUrl = Storage::disk('public')->url('avatars/' . $oldFilename);

        $user = UserFactory::new()->create(['avatar_url' => $oldAvatarUrl]);

        $this->actingAs($user);

        $updatedData = [
            'avatar' => ''
        ];

        $response = $this->putJson("/api/users/{$user->id}", $updatedData);

        $response->assertStatus(200);
        $this->assertFalse(Storage::disk('public')->exists('avatars/' . $oldFilename));

        $this->assertNull($response->json('avatar_url'));

        $user->refresh();
        $this->assertNull($user->avatar_url);
    }

    public function test_user_cannot_be_modified_by_another_user_on_update()
    {
        $user = UserFactory::new()->create();
        $anotherUser = UserFactory::new()->create();
        $this->actingAs($anotherUser);

        $response = $this->putJson("/api/users/{$user->id}", ['name' => 'New Name']);

        $response->assertStatus(403);
        $this->assertDatabaseHas('users', [
            'id' => $user['id'],
            'name' => $user['name']
        ]);
    }

    public function test_deletes_user_on_destroy()
    {
        $user = UserFactory::new()->create();
        $this->actingAs($user);

        $response = $this->delete("/api/users/{$user->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_deletes_articles_authored_by_user_on_destroy()
    {
        $user = UserFactory::new()->create();
        Article::factory()->count(3)->create(['author_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->delete("/api/users/{$user->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);

        $this->assertDatabaseMissing('articles', ['author_id' => $user->id]);
    }

    public function test_user_cannot_be_deleted_by_another_user_on_destroy()
    {
        $user = UserFactory::new()->create();
        $anotherUser = UserFactory::new()->create();
        $this->actingAs($anotherUser);

        $response = $this->delete("/api/users/{$user->id}");

        $response->assertStatus(403);
        $this->assertDatabaseHas('users', ['id' => $user->id]);
    }

    public function test_delete_avatar_file_of_user_on_destroy()
    {
        Storage::fake('public');

        $avatarFile = UploadedFile::fake()->image('avatar.jpg');
        $filename = $avatarFile->hashName();

        Storage::disk('public')->putFileAs('avatars', $avatarFile, $filename);
        $avatarUrl = Storage::disk('public')->url('avatars/' . $filename);

        $user = UserFactory::new()->create(['avatar_url' => $avatarUrl]);

        $this->actingAs($user);
        $response = $this->delete("/api/users/{$user->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
        $this->assertFalse(Storage::disk('public')->exists('avatars/' . $filename));
    }
}
