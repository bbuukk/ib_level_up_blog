<?php

namespace Tests\Feature\Api\Tags;

use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TagShowTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_single_tag()
    {
        $tag = Tag::factory()->create();

        $response = $this->getJson("/api/tags/{$tag->id}");

        $response->assertOk()->assertJson(['id' => $tag->id, 'label' => $tag->label]);
    }

    public function test_returns_404_for_non_existent_tag()
    {
        $response = $this->getJson("/api/tags/999999");

        $response->assertStatus(404);
    }
}
