<?php

namespace Tests\Feature\Api\Article;

use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleIndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_list_all_articles(): void
    {
        Article::factory()->count(15)->create();

        $perPage = 5;
        $response = $this->get(
            "/api/articles/?&perPage={$perPage}"
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
                'next_cursor',
                'prev_cursor'
            ])
            ->assertJsonCount($perPage, 'data')
            ->assertJson([
                'per_page' => $perPage,
            ]);
    }

    public function test_list_and_sort_all_articles(): void
    {
        Article::factory()->count(15)->create();

        $perPage = 5;
        $response = $this->get(
            "/api/articles/?perPage={$perPage}&sort[created_at]=desc",
        );

        $response->assertStatus(200);

        $responseData = $response->json('data');

        $values = array_column($responseData, 'created_at');

        //todo valid?
        $sortedValues = $values;
        rsort($sortedValues);

        //check if array of original created_at values equals to sorted one
        $this->assertEquals($sortedValues, $values, "The array is not sorted in descending order by created_at");
    }
}
