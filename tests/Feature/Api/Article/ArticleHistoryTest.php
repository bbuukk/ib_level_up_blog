<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Article;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ArticleHistoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_article_update_creates_version()
    {
        $user = UserFactory::new()->createOne();
        $article = Article::factory()
            ->set('title', 'test title')
            ->set('content', 'test content')
            ->for($user, 'author')
            ->createOne();

        $response = $this
            ->actingAs($user)
            ->putJson(
                '/api/articles/' . $article->id,
                [
                    'title' => 'changed title',
                    'content' => 'changed content',
                ]
            );

        $response->assertStatus(200);
        $this->assertDatabaseHas('article_versions', [
            'article_id' => $article->id,
            'title' => $article->title,
            'content' => $article->content,
        ]);
    }

    public function test_can_retrieve_article_versions()
    {

        $user = UserFactory::new()->createOne();
        $article = Article::factory()
            ->set('title', 'test title')
            ->set('content', 'test content')
            ->for($user, 'author')
            ->createOne();
        $article->versions()->create(['title' => 'Old Title', 'content' => 'Old Content']);

        $response = $this
            ->actingAs($user)
            ->getJson("/api/articles/{$article->id}/versions");

        $response->assertStatus(200)
            ->assertJsonCount(1);
    }

    public function test_can_restore_article_version()
    {

        $user = UserFactory::new()->createOne();
        $article = Article::factory()
            ->set('title', 'test title')
            ->set('content', 'test content')
            ->for($user, 'author')
            ->createOne();

        $oldArticle = $article->versions()->create(['title' => 'Old Title', 'content' => 'Old Content']);

        $response = $this
            ->actingAs($user)
            ->postJson("/api/articles/{$article->id}/restore/{$oldArticle->id}");

        $response->assertStatus(200);
        $this->assertDatabaseHas('articles', [
            'id' => $article->id,
            'title' => 'Old Title',
            'content' => 'Old Content',
        ]);
    }
}
