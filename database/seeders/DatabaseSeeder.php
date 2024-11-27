<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Sequence;

use App\Models\Article;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->cleanupOldImages();

        User::factory(4)->create();

        $this->call(ArticleSeeder::class);
        $this->call(CommentSeeder::class);
        $this->call(TagSeeder::class);

        $tags = Tag::factory()
            ->count(2)
            ->state(new Sequence(
                ['label' => 'featured'],
                ['label' => 'ai'],
            ))
            ->create();

        //TODO: refactor
        User::factory()
            ->set('name', 'Francisco')
            ->set('email', 'francisco@internetbrands.com')
            ->set('password', 'test1234')
            ->has(
                Article::factory(8)
                    ->afterCreating(function (Article $article) use ($tags) {
                        $article->tags()->attach(
                            $tags->random(rand(1, 2))->pluck('id')->toArray()
                        );
                    })
                    ->has(Comment::factory(1))
            )
            ->createOne();
    }

    private function cleanupOldImages()
    {
        Storage::disk('public')->deleteDirectory('covers');
        Storage::disk('public')->makeDirectory('covers');
    }
}
