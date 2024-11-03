<?php

namespace Tests\Feature\Api\Article;

use App\Models\Article;
use App\Models\Tag;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleTagIndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_list_all_tags_of_article(): void
    {

        $tagsCount = 10;
        $article = Article::factory()
            ->has(
                Tag::factory($tagsCount)
            )->createOne();

        $page = 1;
        $perPage = 5;
        $response = $this->get(
            "/api/articles/{$article->id}/tags/?page={$page}&perPage={$perPage}sort[created_at]=desc"
        );

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'label',
                        'created_at',
                        'updated_at',
                        'pivot'
                    ]
                ],
                'links'
            ])
            ->assertJsonCount($perPage, 'data')
            ->assertJson([
                'per_page' => $perPage,
                'current_page' => $page,
                'total' => $tagsCount
            ]);
    }
}
