<?php

namespace Tests\Feature\Api\Article;

use App\Models\Article;
use App\Models\Tag;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleTagLinkTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_add_tag_to_article_authored_by_myself(): void
    {
        $user1 = UserFactory::new()->createOne();

        $articleFromUser1 = Article::factory()
            ->set('title', 'test title')
            ->set('content', 'test content')
            ->for($user1, 'author')
            ->has(Tag::factory(2))
            ->createOne();

        $tag = Tag::factory()->createOne();

        // when: trying to add a tag to an article from another user
        $response = $this
            ->actingAs($user1)
            ->post('api/articles/' . $articleFromUser1->id . '/tags/' . $tag->id);

        // then: assert that action is forbidden
        $response->assertCreated();
        $this->assertDatabaseHas(
            'article_tag',
            [
                'article_id' => $articleFromUser1->id,
                'tag_id' => $tag->id,
            ]
        );;
    }

    public function test_cannot_add_tag_to_article_authored_by_someone_else(): void
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

        $tag = Tag::factory()->createOne();

        // when: trying to add a tag to an article from another user
        $response = $this
            ->actingAs($user2)
            ->post('api/articles/' . $articleFromUser1->id . '/tags/' . $tag->id);

        // then: assert that action is forbidden
        $response->assertForbidden();
        $this->assertDatabaseMissing(
            'article_tag',
            [
                'article_id' => $articleFromUser1->id,
                'tag_id' => $tag->id,
            ]
        );;
    }
}
