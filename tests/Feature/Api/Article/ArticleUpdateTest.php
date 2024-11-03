<?php

namespace Tests\Feature\Api\Article;

use App\Models\Article;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_change_article_authored_by_myself(): void
    {
        // given: user created an article
        $user1 = UserFactory::new()->createOne();
        $articleFromUser1 = Article::factory()
            ->set('title', 'test title')
            ->set('content', 'test content')
            ->for($user1, 'author')
            ->createOne();

        // when: user1 is trying to edit article authored by him
        $response = $this
            ->actingAs($user1)
            ->putJson(
                '/api/articles/' . $articleFromUser1->id,
                [
                    'title' => 'changed title',
                    'content' => 'changed content',
                ]
            );

        // then: assert that action is allowed
        $response->assertOk();
        $this->assertDatabaseHas(
            'articles',
            [
                'title' => 'changed title',
                'content' => 'changed content',
                'author_id' => $user1->id,
            ]
        );
    }

    public function test_cannot_change_article_authored_by_someone_else(): void
    {
        // given: two users and an article created by first user
        $user1 = UserFactory::new()->createOne();
        $user2 = UserFactory::new()->createOne();
        $articleFromUser1 = Article::factory()
            ->set('title', 'test title')
            ->set('content', 'test content')
            ->for($user1, 'author')
            ->createOne();

        // when: trying to edit article from another user
        $response = $this
            ->actingAs($user2)
            ->putJson(
                '/api/articles/' . $articleFromUser1->id,
                [
                    'title' => 'changed title',
                    'content' => 'changed content',
                ]
            );

        // then: assert that action is forbidden
        $response->assertForbidden();
        $this->assertDatabaseHas(
            'articles',
            [
                'title' => 'test title',
                'content' => 'test content',
                'author_id' => $user1->id,
            ]
        );
    }
}
