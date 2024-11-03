<?php

namespace Tests\Feature\Api\Article;

use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleShowTest extends TestCase
{
    use RefreshDatabase;

    public function test_show_article(): void
    {

        $user = User::factory()->createOne([
            'name' => 'josephpeshi',
            'email' => 'josephpeshi@example.com'
        ]);

        $article = Article::factory()->createOne([
            'title' => 'test title',
            'content' => 'test content',
            'author_id' => $user->id,
        ]);

        $response = $this->get(
            "/api/articles/" . $article->id
        );

        $response
            ->assertStatus(200)
            ->assertJson([
                'id' => $article->id,
                'title' => "test title",
                'content' => 'test content',
                // 'created_at',
                // 'updated_at',
                'author_id' => $user->id,
                'author' => [

                    'id' => $user->id,
                    'name' => 'josephpeshi',
                    'email' => 'josephpeshi@example.com'
                ]
            ]);
    }
}
