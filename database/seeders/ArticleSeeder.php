<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;


class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()
            ->count(3)
            ->state(new Sequence(
                ['email' => 'user1@example.com', 'password' => bcrypt('password1')],
                ['email' => 'user2@example.com', 'password' => bcrypt('password2')],
                ['email' => 'user3@example.com', 'password' => bcrypt('password3')]
            ))
            ->has(
                Article::factory()
                    ->count(3)
                    ->has(
                        Comment::factory(3)
                    )
                    ->has(
                        Tag::factory(2)
                    )
            )
            ->create();
    }
}
