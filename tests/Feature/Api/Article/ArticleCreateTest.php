<?php

namespace Tests\Feature\Api\Article;

use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleCreateTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_article_being_authenticated(): void
    {
        $user = UserFactory::new()
            ->set('name', 'test user')
            ->createOne();

        // when: creating a new article as that user
        $response = $this
            ->actingAs($user)
            ->postJson(
                '/api/articles',
                [
                    'title' => 'test title',
                    'content' => 'test content',
                ]
            );

        // then: assert that article was created by correct user
        $response->assertStatus(201);
        $this->assertDatabaseHas('articles', [
            'title' => 'test title',
            'content' => 'test content',
            'author_id' => $user->id,
        ]);
    }

    public function test_cannot_create_article_being_not_authenticated(): void
    {

        $user = UserFactory::new()
            ->set('name', 'test user')
            ->createOne();

        $response = $this
            ->postJson(
                '/api/articles',
                [
                    'title' => 'test title',
                    'content' => 'test content',
                ]
            );

        $response->assertStatus(401);
        $this->assertDatabaseMissing('articles', [
            'title' => 'test title',
            'content' => 'test content',
            'author_id' => $user->id,
        ]);
    }
}
