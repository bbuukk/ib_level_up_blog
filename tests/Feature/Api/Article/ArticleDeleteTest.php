<?php

namespace Tests\Feature\Api\Article;

use App\Models\Article;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleDeleteTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_delete_article_being_authored_by_myself(): void
    {
        $user = UserFactory::new()
            ->createOne();
        $article = Article::factory()
            ->for($user, 'author')
            ->createOne();

        $response = $this
            ->actingAs($user)
            ->delete(
                "/api/articles/{$article->id}"
            );

        $response->assertStatus(204);
        $this->assertDatabaseMissing('articles', [
            'id' => $article->id,
            'author_id' => $user->id,
        ]);
    }

    public function test_cannot_delete_article_authored_by_someone_else(): void
    {
        // given: two users and an article created by first user
        $user1 = UserFactory::new()->createOne();
        $user2 = UserFactory::new()->createOne();

        $articleFromUser1 = Article::factory()
            ->set('title', 'test title')
            ->set('content', 'test content')
            ->for($user1, 'author')
            ->create();


        // when: trying to delete article from another user
        $response = $this
            ->actingAs($user2)
            ->delete('api/articles/' . $articleFromUser1->id);

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
