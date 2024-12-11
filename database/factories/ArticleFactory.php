<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

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

        $attributes = [
            'title' => $this->faker->sentence(6),
            'content' => $this->faker->text(1500),
            'author_id' => User::factory(),
            'created_at' => $createdAt,
            'updated_at' => $createdAt
        ];

        if (
            env('APP_ENV') !== 'production' &&
            env('APP_ENV') !== 'testing'
        ) {
            $attributes['cover_url'] = $this->generateFakeImage();
        }

        return $attributes;
    }

    private function generateFakeImage()
    {
        $width = 800;
        $height = 600;
        $imageUrl = "https://picsum.photos/{$width}/{$height}";

        $response = Http::get($imageUrl);

        if ($response->successful()) {
            $disk = "public";
            $extension = 'jpg';
            $filename = uniqid() . '.' . $extension;

            // Save the image content to a temporary file
            $tempFile = tempnam(sys_get_temp_dir(), 'img');
            file_put_contents($tempFile, $response->body());

            // Use putFileAs with the temporary file
            $filePath = Storage::disk($disk)->putFileAs('covers/', $tempFile, $filename);

            // Remove the temporary file
            unlink($tempFile);

            return Storage::disk($disk)->url($filePath);
        }

        return null;
    }
}
