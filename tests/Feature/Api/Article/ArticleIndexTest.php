<?php

namespace Tests\Feature\Api\Article;

use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;


class ArticleIndexTest extends TestCase
{
    use RefreshDatabase;

    private User $author;
    private Article $article1;
    private Article $article2;

    protected function setUp(): void
    {
        parent::setUp();

        // Use a fixed date for testing
        $baseDate = '2023-01-15 12:00:00';

        $this->author = User::factory()->create();

        $this->article1 = Article::factory()->create([
            'author_id' => $this->author->id,
            'title' => 'First Test Article',
            'content' => 'This is the first test content',
            'created_at' => $baseDate,
        ]);

        $this->article2 = Article::factory()->create([
            'author_id' => $this->author->id,
            'title' => 'Second Test Article',
            'content' => 'This is the second test content',
            'created_at' => date('Y-m-d H:i:s', strtotime($baseDate . ' +2 days')),
        ]);

        Article::factory()->count(15)->create([
            'created_at' => $baseDate,
        ]);
    }

    public function test_list_all_articles(): void
    {
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
            ])
            ->assertJsonCount($perPage, 'data')
            ->assertJson([
                'per_page' => $perPage,
            ]);
    }

    public function test_list_and_sort_all_articles(): void
    {

        $perPage = 5;
        $response = $this->get(
            "/api/articles/?perPage={$perPage}&sort[created_at]=desc",
        );

        $response->assertStatus(200);

        $responseData = $response->json('data');

        $values = array_column($responseData, 'created_at');

        $sortedValues = $values;
        rsort($sortedValues);

        $this->assertEquals($sortedValues, $values, "The array is not sorted in descending order by created_at");
    }


    public function test_list_articles_filtered_by_author()
    {
        $anotherAuthor = User::factory()->create();
        $anotherArticle = Article::factory()->create([
            'author_id' => $anotherAuthor->id
        ]);

        $response = $this->getJson("/api/articles?filter[authorId]={$this->author->id}");

        $response->assertStatus(200)
            ->assertJsonCount(2, 'data')
            ->assertJsonMissing(['id' => $anotherArticle->id]);
    }


    public function test_index_filters_by_created_since_date()
    {
        $filterDate = '2023-01-16';

        $response = $this->getJson("/api/articles?filter[createdSinceDate]={$filterDate}");

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $this->article2->id);
    }

    public function test_index_searches_title_and_content()
    {
        $response = $this->getJson('/api/articles?search=first');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $this->article1->id);
    }
}
