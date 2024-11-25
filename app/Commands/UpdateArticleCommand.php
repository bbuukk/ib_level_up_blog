<?php

namespace App\Commands;


class UpdateArticleCommand
{
    public function __construct(
        private $article,
        private ?string $title,
        private ?string $content,
        private ?string $coverUrl
    ) {}

    public function execute()
    {
        $this->article->versions()->create([
            'title' => $this->article->title,
            'content' => $this->article->content,
            'cover_url' => $this->article->cover_url
        ]);

        $this->article->fill(array_filter([
            'title' => $this->title,
            'content' => $this->content,
            'cover_url' => $this->coverUrl
        ]));


        $this->article->save();
    }
}
