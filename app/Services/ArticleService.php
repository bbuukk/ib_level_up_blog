<?php

namespace App\Services;


use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use App\Models\Tag;
use App\Models\Article;
use App\Models\Comment;
use App\Models\User;
use App\Traits\ManipulateFilesInPublicStorage;
use App\Traits\SortByDirectModelAttribute;
use Carbon\Carbon;

class ArticleService
{
    use SortByDirectModelAttribute;
    use ManipulateFilesInPublicStorage;

    public function listAllArticles(
        array $sort,
        ?int $authorId,
        ?Carbon $createdSince,
        ?string $search,
    ) {
        $query = Article::query();

        $query = $this->sortByDirectModelAttribute($query, $sort);

        if (!is_null($authorId)) {
            $query->where('author_id', $authorId);
        }

        if (!is_null($createdSince)) {
            $query->where('created_at', '>=', $createdSince);
        }

        if (!is_null($search)) {
            $query
                ->where('title', 'ilike', "%$search%")
                ->orWhere('content', 'ilike', "%$search%");
        }

        $query->with('author');

        return $query;
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
        User $author,
        ?UploadedFile $coverPhoto
    ): Article {
        $article = new Article;

        $article->title = $title;
        $article->content = $content;
        $article->author()->associate($author);

        if (!is_null($coverPhoto)) {
            $coverUrl = $this->storeFileInPublicStorage($coverPhoto, 'covers');
            $article->cover_url = $coverUrl;
        }

        $article->save();

        return $article;
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

    public function update(
        Article $article,
        ?string $title,
        ?string $content,
        ?string $coverUrl
    ) {
        $title && $article->title = $title;
        $content && $article->content = $content;

        $article->cover_url = $coverUrl;

        $article->save();
    }

    public function updateCoverInStorage(Article $article, $coverPhoto)
    {
        $oldCoverPhotoUrl = $article->cover_url;
        if (!is_null($oldCoverPhotoUrl)) {
            $this->deleteFileFromPublicStorage($oldCoverPhotoUrl);
        }

        $relativeUrl = $this->storeFileInPublicStorage($coverPhoto, 'covers');
        return $relativeUrl;
    }

    public function deleteCoverInStorage(Article $article)
    {
        $oldCoverPhotoUrl = $article->cover_url;
        if (!is_null($oldCoverPhotoUrl)) {
            $this->deleteFileFromPublicStorage($oldCoverPhotoUrl);
        }
    }


    public function addComment(Article $article, string $commentContent, User $author)
    {
        $comment = new Comment;
        $comment->content = $commentContent;
        $comment->author()->associate($author);

        $article->comments()->save($comment);
        return $comment;
    }

    public function destroy(Article $article)
    {
        $coverUrl = $article->cover_url;
        if (!is_null($coverUrl)) {
            $this->deleteFileFromPublicStorage($coverUrl);
        }


        //TODO: remove, make comments cascade when articles is deleted
        $article->comments()->delete();
        $article->delete();
    }
}
