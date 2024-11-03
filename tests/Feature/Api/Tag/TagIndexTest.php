<?php

namespace Tests\Feature\Api\Tags;

use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TagIndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_list_all_tags(): void
    {
        Tag::factory()->count(15)->create();

        $page = 1;
        $perPage = 5;
        $response = $this->get(
            "/api/tags/?page={$page}&perPage={$perPage}"
        );


        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'label',
                        'created_at',
                        'updated_at',
                    ]
                ],
                'links',
                'total'
            ])
            ->assertJsonCount($perPage, 'data')
            ->assertJson([
                'current_page' => $page,
                'per_page' => $perPage
            ]);
    }
}
