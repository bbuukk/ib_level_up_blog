<?php

namespace Tests\Feature\Api\Article;

use App\Models\Article;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleCommentCreateTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_comment_article_being_authenticated(): void
    {
        $user = UserFactory::new()->createOne();
        $article = Article::factory()->createOne();

        $response = $this
            ->actingAs($user)
            ->postJson(
                "/api/articles/{$article->id}/comments",
                [
                    'content' => 'test content',
                ]
            );

        $response->assertStatus(201);
        $this->assertDatabaseHas('comments', [
            'content' => 'test content',
            'article_id' => $article->id,
            'author_id' => $user->id,
        ]);
    }

    public function test_can_not_comment_article_being_not_authenticated(): void
    {
        $user = UserFactory::new()->createOne();
        $article = Article::factory()->createOne();

        $response = $this
            ->postJson(
                "/api/articles/{$article->id}/comments",
                [
                    'content' => 'test content',
                ]
            );

        $response->assertStatus(401);
        $this->assertDatabaseMissing('comments', [
            'content' => 'test content',
            'article_id' => $article->id,
            'author_id' => $user->id,
        ]);
    }
}
