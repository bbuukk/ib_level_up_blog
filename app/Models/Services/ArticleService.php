<?php

namespace App\Models\Services;

use App\Models\Article;

class ArticleService
{
    public function listAllArticles()
    {
        return Article::query()->get();
    }

    public function store(
        string $title,
        string $content,
    ): bool {
        $article = new Article;

        $article->title = $title;
        $article->content = $content;

        return $article->save();
    }

    public function findArticleById(int $articleId): ?Article
    {
        return Article::query()
            ->where('id', $articleId)
            ->first($articleId);
    }

    public function getCommentsForArticle(Article $article)
    {
        return $article
            ->comments()
            ->get();
    }
}
