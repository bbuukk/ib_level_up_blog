<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Comment;
use App\Models\User;

class ArticleService
{
    public function listAllArticles()
    {
        return Article::query()->get();
    }

    public function store(
        string $title,
        string $content,
        User $author
    ): bool {
        $article = new Article;

        $article->title = $title;
        $article->content = $content;
        $article->author()->associate($author);

        return $article->save();
    }

    public function findArticleById(int $articleId): ?Article
    {
        return Article::query()
            ->with('author')
            ->where('id', $articleId)
            ->first();
    }

    public function getCommentsForArticle(Article $article)
    {
        return $article
            ->comments()
            ->get();
    }

    public function addComment(Article $article, string $commentContent)
    {
        $comment = new Comment;
        $comment->content = $commentContent;

        $article->comments()->save($comment);
    }

    public function destroy(Article $article)
    {

        $article->comments()->delete();
        $article->delete();
    }
}
