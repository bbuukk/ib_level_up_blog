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

        // Create test data

        $this->author = User::factory()->create();

        $this->article1 = Article::factory()->create([
            'author_id' => $this->author->id,
            'title' => 'First Test Article',
            'content' => 'This is the first test content',
            'created_at' => now()->subDays(2),
        ]);

        $this->article2 = Article::factory()->create([
            'author_id' => $this->author->id,
            'title' => 'Second Test Article',
            'content' => 'This is the second test content',
            'created_at' => now()->subDay(),
        ]);

        Article::factory()->count(15)->create();
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

        //todo valid?
        $sortedValues = $values;
        rsort($sortedValues);

        //check if array of original created_at values equals to sorted one
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
        $date = now()->subDay()->toDateString();

        $response = $this->getJson("/api/articles?filter[createdSinceDate]={$date}");

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
