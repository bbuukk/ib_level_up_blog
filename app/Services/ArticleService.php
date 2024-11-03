<?php

namespace App\Services;

use App\Models\Tag;
use App\Models\Article;
use App\Models\Comment;
use App\Models\User;

use App\Traits\SortByDirectModelAttribute;

class ArticleService
{
    use SortByDirectModelAttribute;

    public function listAllArticles(array $sort)
    {
        $query = Article::query();

        $query = $this->sortByDirectModelAttribute($query, $sort);

        //TODO: assumption that we will use infinite scroll in future, that's why i picked cursorPaginate
        return $query->with('author');
    }

    public function listAllArticlesByTag(Tag $tag, array $sort)
    {
        $query = $tag->articles();

        $query = $this->sortByDirectModelAttribute($query, $sort);

        return $query->with('author');
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

    public function getCommentsForArticle(
        Article $article,
        array $sort,
    ) {
        $query = $article->comments();

        $query = $this->sortByDirectModelAttribute($query, $sort);

        return $query->with('author');
    }

    public function getTagsForArticle(
        Article $article,
        array $sort
    ) {
        $query = $article->tags();

        $query = $this->sortByDirectModelAttribute($query, $sort);

        return $query;
    }

    public function addComment(Article $article, string $commentContent, User $author)
    {
        $comment = new Comment;
        $comment->content = $commentContent;
        $comment->author()->associate($author);

        $article->comments()->save($comment);
    }

    public function destroy(Article $article)
    {

        $article->comments()->delete();
        $article->delete();
    }
}
