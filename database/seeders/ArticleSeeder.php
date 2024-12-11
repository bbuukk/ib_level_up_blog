<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
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
        $users = [
            [
                'name' => 'User 1',
                'email' => 'user1@example.com',
                'password' => bcrypt('password1'),
            ],
            [
                'name' => 'User 2',
                'email' => 'user2@example.com',
                'password' => bcrypt('password2'),
            ],
            [
                'name' => 'User 3',
                'email' => 'user3@example.com',
                'password' => bcrypt('password3'),
            ],
        ];

        User::factory()
            ->count(3)
            ->state(new Sequence(...$users))
            ->has(
                Article::factory()
                    ->count(3)
                    ->has(
                        Comment::factory(3)
                    )
            )
            ->create();
    }
}
