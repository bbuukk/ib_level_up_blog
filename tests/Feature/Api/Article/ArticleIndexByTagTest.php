<?php

namespace Tests\Feature\Api\Article;

use App\Models\Article;
use App\Models\Tag;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleIndexByTagTest extends TestCase
{
    use RefreshDatabase;

    //TODO: unskip after fixing endpoint
    public function test_list_all_comments_of_article(): void
    {
        $this->markTestSkipped('Broken ep');

        $tag = Tag::factory()->createOne();

        Article::factory()
            ->count(10)
            ->hasAttached($tag)
            ->create();

        $response = $this->get(
            "/api/articles/tags/{$tag->id}"
        );

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'content',
                        'created_at',
                        'updated_at',
                        'author'
                    ]
                ],
            ])
            ->assertJsonCount(10, 'data');
    }
}
