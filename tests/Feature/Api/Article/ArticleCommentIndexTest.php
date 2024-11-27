<?php

namespace Tests\Feature\Api\Article;

use App\Models\Article;
use App\Models\Comment;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleCommentIndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_list_all_comments_of_article(): void
    {

        $article = Article::factory()
            ->has(
                Comment::factory(10)
            )->createOne();

        $page = 1;
        $perPage = 5;
        $response = $this->get(
            "/api/articles/{$article->id}/comments/?page={$page}&perPage={$perPage}"
        );

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'content',
                        'created_at',
                        'updated_at',
                        'author'
                    ]
                ],
                'total',
                'current_page'
            ])
            ->assertJsonCount($perPage, 'data')
            ->assertJson([
                'per_page' => $perPage,
            ]);
    }
}
