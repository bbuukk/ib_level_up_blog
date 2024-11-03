<?php

namespace Tests\Feature\Api\Comment;

use App\Models\User;
use App\Models\Comment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use Database\Factories\UserFactory;

class CommentDeleteTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_not_delete_comment_being_unauthorized()
    {
        $comment = Comment::factory()->set('content', "test")->createOne();

        $response = $this->deleteJson(
            "/api/comments/{$comment->id}"
        );

        $response->assertUnauthorized();
        $this->assertDatabaseHas(
            'comments',
            [
                'content' => 'test',
            ]
        );
    }

    public function test_can_delete_comment_authored_by_myself()
    {
        $user = UserFactory::new()->create();
        $comment = Comment::factory()->for($user, "author")->createOne();

        $response = $this->actingAs($user)
            ->delete(
                "/api/comments/{$comment->id}"
            );

        $response->assertNoContent();
        $this->assertDatabaseMissing('comments', [
            'id' => $comment->id,
        ]);
    }

    public function test_can_not_update_comment_being_authored_by_someone_else()
    {
        $user1 = UserFactory::new()->create();
        $user2 = UserFactory::new()->create();
        $comment = Comment::factory()->for($user1, "author")->set('content', "test")->createOne();

        $response = $this->actingAs($user2)
            ->delete(
                "/api/comments/{$comment->id}"
            );

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
