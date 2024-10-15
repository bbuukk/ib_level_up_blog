<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Article::factory()
            ->count(5)
            ->has(
                Comment::factory(3)
            )
            ->has(
                Tag::factory(2)
            )
            ->create();
    }
}
