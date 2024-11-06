<?php

namespace Tests\Feature\Api\Comment;

use App\Models\User;
use App\Models\Comment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use Database\Factories\UserFactory;

class CommentUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_not_update_comment_being_unauthorized()
    {
        $comment = Comment::factory()->set('content', "test")->createOne();

        $response = $this->putJson("/api/comments/{$comment->id}", [
            'content' => 'Updated content'
        ]);

        $response->assertUnauthorized();
        $this->assertDatabaseHas(
            'comments',
            [
                'content' => 'test',
            ]
        );
    }

    public function test_can_update_comment_authored_by_myself()
    {
        $user = UserFactory::new()->create();
        $comment = Comment::factory()->for($user, "author")->createOne();

        $updatedContent = 'Updated comment content';

        $response = $this->actingAs($user)
            ->putJson("/api/comments/{$comment->id}", [
                'content' => $updatedContent
            ]);

        $response->assertOk();
        $this->assertDatabaseHas('comments', [
            'id' => $comment->id,
            'content' => $updatedContent
        ]);
    }

    public function test_can_not_update_comment_being_authored_by_someone_else()
    {
        $user1 = UserFactory::new()->create();
        $user2 = UserFactory::new()->create();
        $comment = Comment::factory()->for($user1, "author")->set('content', "test")->createOne();

        $response = $this->actingAs($user2)
            ->putJson("/api/comments/{$comment->id}", [
                'content' => 'changed test'
            ]);

        $response->assertForbidden();
        $this->assertDatabaseHas(
            'comments',
            [
                'content' => 'test',
                'author_id' => $user1->id,
            ]
        );
    }
}
