<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\Comment;
use App\Models\Tag;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleTest extends TestCase
{
    use RefreshDatabase;

    public function test_article_creation(): void
    {
        // given: a user on our app
        $user = UserFactory::new()
            ->set('name', 'test user')
            ->createOne();

        // when: creating a new article as that user
        $response = $this
            ->actingAs($user)
            ->postJson(
                '/api/articles',
                [
                    'title' => 'test title',
                    'content' => 'test content',
                ]
            );

        // then: assert that article was created by correct user
        $response->assertStatus(201);
        $this->assertDatabaseHas('articles', [
            'title' => 'test title',
            'content' => 'test content',
            'author_id' => $user->id,
        ]);
    }


    // public function test_cannot_change_article_authored_by_someone_else(): void

    /**
     * TODO: make this test pass on your repo
     */
    public function test_cannot_change_article_authored_by_someone_else(): void
    {
        // given: two users and an article created by first user
        $user1 = UserFactory::new()->createOne();
        $user2 = UserFactory::new()->createOne();
        $articleFromUser1 = Article::factory()
            ->set('title', 'test title')
            ->set('content', 'test content')
            ->for($user1, 'author')
            ->createOne();

        // when: trying to edit article from another user
        $response = $this
            ->actingAs($user2)
            ->putJson(
                '/api/articles/' . $articleFromUser1->id,
                [
                    'title' => 'changed title',
                    'content' => 'changed content',
                ]
            );

        // then: assert that action is forbidden
        $response->assertForbidden();
        $this->assertDatabaseHas(
            'articles',
            [
                'title' => 'test title',
                'content' => 'test content',
                'author_id' => $user1->id,
            ]
        );
    }



    public function test_cannot_delete_article_authored_by_someone_else(): void
    {
        // given: two users and an article created by first user
        $user1 = UserFactory::new()->createOne();
        $user2 = UserFactory::new()->createOne();

        $articleFromUser1 = Article::factory()
            ->set('title', 'test title')
            ->set('content', 'test content')
            ->for($user1, 'author')
            ->create();


        // when: trying to delete article from another user
        $response = $this
            ->actingAs($user2)
            ->delete('api/articles/' . $articleFromUser1->id);

        // then: assert that action is forbidden
        $response->assertForbidden();
        $this->assertDatabaseHas(
            'articles',
            [
                'title' => 'test title',
                'content' => 'test content',
                'author_id' => $user1->id,
            ]
        );
    }

    public function test_cannot_delete_tag_from_article_authored_by_someone_else(): void
    {
        // given: two users and an article created by first user
        $user1 = UserFactory::new()->createOne();
        $user2 = UserFactory::new()->createOne();

        $articleFromUser1 = Article::factory()
            ->set('title', 'test title')
            ->set('content', 'test content')
            ->for($user1, 'author')
            ->has(Tag::factory(2))
            ->createOne();

        $articleFromUser1Tag = $articleFromUser1->tags()->first();

        // when: trying to delete tag from an article from another user
        $response = $this
            ->actingAs($user2)
            ->delete('api/articles/' . $articleFromUser1->id . '/tags/' . $articleFromUser1Tag->id);

        // then: assert that action is forbidden
        $response->assertForbidden();
        $this->assertDatabaseHas(
            'article_tag',
            [
                'article_id' => $articleFromUser1->id,
                'tag_id' => $articleFromUser1Tag->id,
            ]
        );
    }


    public function test_cannot_add_tag_to_article_authored_by_someone_else(): void
    {
        // given: two users and an article created by first user
        $user1 = UserFactory::new()->createOne();
        $user2 = UserFactory::new()->createOne();

        $articleFromUser1 = Article::factory()
            ->set('title', 'test title')
            ->set('content', 'test content')
            ->for($user1, 'author')
            ->has(Tag::factory(2))
            ->createOne();

        $tag = Tag::factory()->createOne();

        // when: trying to add a tag to an article from another user
        $response = $this
            ->actingAs($user2)
            ->post('api/articles/' . $articleFromUser1->id . '/tags/' . $tag->id);

        // then: assert that action is forbidden
        $response->assertForbidden();
        $this->assertDatabaseMissing(
            'article_tag',
            [
                'article_id' => $articleFromUser1->id,
                'tag_id' => $tag->id,
            ]
        );;
    }
}
