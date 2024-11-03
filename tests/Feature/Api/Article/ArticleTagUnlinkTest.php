<?php

namespace Tests\Feature\Api\Article;

use App\Models\Article;
use App\Models\Tag;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleTagUnlinkTest extends TestCase
{

    use RefreshDatabase;

    public function test_can_delete_tag_from_article_authored_by_myself(): void
    {
        $user1 = UserFactory::new()->createOne();

        $articleFromUser1 = Article::factory()
            ->set('title', 'test title')
            ->set('content', 'test content')
            ->for($user1, 'author')
            ->has(Tag::factory(2))
            ->createOne();

        $articleFromUser1Tag = $articleFromUser1->tags()->first();

        $response = $this
            ->actingAs($user1)
            ->delete('api/articles/' . $articleFromUser1->id . '/tags/' . $articleFromUser1Tag->id);

        $response->assertNoContent();
        $this->assertDatabaseMissing(
            'article_tag',
            [
                'article_id' => $articleFromUser1->id,
                'tag_id' => $articleFromUser1Tag->id,
            ]
        );
    }

    public function test_cannot_delete_tag_from_article_authored_by_someone_else(): void
    {
        // given: two users and an article created by first user
        $user1 = UserFactory::new()->createOne();
        $user2 = UserFactory::new()->createOne();

        $articleFromUser1 = Article::factory()
            ->set('title', 'test title')
            ->set('content', 'test content')
            ->for($user1, 'author')
            ->has(Tag::factory(2))
            ->createOne();

        $articleFromUser1Tag = $articleFromUser1->tags()->first();

        // when: trying to delete tag from an article from another user
        $response = $this
            ->actingAs($user2)
            ->delete('api/articles/' . $articleFromUser1->id . '/tags/' . $articleFromUser1Tag->id);

        // then: assert that action is forbidden
        $response->assertForbidden();
        $this->assertDatabaseHas(
            'article_tag',
            [
                'article_id' => $articleFromUser1->id,
                'tag_id' => $articleFromUser1Tag->id,
            ]
        );
    }
}
