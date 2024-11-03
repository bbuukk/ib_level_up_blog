<?php

namespace Tests\Feature\Api\Tags;

use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TagUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_update_tag()
    {
        $tag = Tag::factory()->create();
        $updatedData = ['label' => 'changed label'];

        $response = $this->putJson("/api/tags/{$tag->id}", $updatedData);

        $response->assertOk()
            ->assertJsonFragment($updatedData);

        $this->assertDatabaseHas('tags', $updatedData);
    }
}
