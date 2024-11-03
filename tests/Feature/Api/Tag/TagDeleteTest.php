<?php

namespace Tests\Feature\Api\Tags;

use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TagDeleteTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_delete_tag()
    {
        $tag = Tag::factory()->create();

        $response = $this->deleteJson("/api/tags/{$tag->id}");

        $response->assertNoContent();
        $this->assertDatabaseMissing('tags', ['id' => $tag->id]);
    }
}
