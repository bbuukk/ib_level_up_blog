<?php

namespace Tests\Feature\Api\Article;

use App\Models\Article;
use App\Models\Tag;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleIndexByTagTest extends TestCase
{
    use RefreshDatabase;

    public function test_list_article_that_have_the_tag()
    {
        $tag = Tag::factory()->create();

        // Create some articles with the tag
        Article::factory()
            ->count(5)
            ->hasAttached($tag)
            ->create();

        // Create some articles without the tag
        Article::factory()->count(3)->create();

        $response = $this->getJson("/api/articles/tags/{$tag->id}?page=1&perPage=10");

        // Assert the response
        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'content',
                        'created_at',
                        'updated_at',
                        'cover_url',
                        'author'
                    ]
                ],
                'links',
            ])
            ->assertJsonCount(5, 'data')
            ->assertJsonPath('total', 5);

        // Check if all returned articles have the correct tag
        $responseData = $response->json('data');

        foreach ($responseData as $article) {
            $this->assertTrue(in_array($tag->id, Article::find($article['id'])->tags->pluck('id')->toArray()));
        }
    }
}
