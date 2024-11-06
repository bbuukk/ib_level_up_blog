<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $createdAt = $this->faker->dateTimeBetween('-1 year', 'now');

        return [
            'title' => $this->faker->sentence(6),
            'content' => $this->faker->paragraph(5),
            'author_id' => User::factory(),
            'created_at' => $createdAt,
            'updated_at' => $createdAt
        ];
    }
}
