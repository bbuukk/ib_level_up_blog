<?php

namespace App\Http\Controllers;

use App\Http\Requests\Articles\UpdateArticleRequest;
use App\Http\Requests\Articles\StoreArticleRequest;

use App\Http\Requests\Comments\StoreCommentRequest;

use App\Models\Article;
use App\Models\Tag;

use App\Services\ArticleService;
use App\Services\TagService;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class ArticleController
{

    public function __construct(private ArticleService $articleService, private TagService $tagService) {}

    // list
    // showAllArticle
    public function index()
    {
        // view layer (input) -> later on we will have pagination and search

        // model layer - fetch all articles from the DB
        $articles = $this->articleService->listAllArticles();

        // view layer (output) - transform the response in some way (there is a better way to do this with Laravel)
        $response = [];
        foreach ($articles as $article) {
            array_push($response, [
                'id' => $article->id,
                'content' => $article->content,
                'title' => $article->title,
                'created_at' => $article->created_at,
                'updated_at' => $article->updated_at,
                'author' => [
                    'id' => $article->author()->first()->id,
                    'name' => $article->author()->first()->name,
                ]
            ]);
        }

        return $response;
    }

    public function show(Article $article)
    {
        $article = $article->load('author');

        return $article;
    }

    // getComments
    // articleComments
    public function comments(int $articleId): Collection
    {
        // view layer (input) - does nothing

        // model layer - fetch article + fetch comments for that article
        $article = $this->articleService->findArticleById($articleId);
        if (is_null($article)) {
            abort(404, 'Article not found');
        }
        $comments = $this->articleService->getCommentsForArticle($article);

        // view layer (output) - does nothing, rely on automatic conversion to JSON
        return $comments;
    }

    public function store(StoreArticleRequest $request)
    {
        $title = $request->validated('title');
        $content = $request->validated('content');
        $author = Auth::user();

        $this->articleService->store($title, $content, $author);

        return response(status: 201);
    }

    public function addComment(Article $article, StoreCommentRequest $request)
    {
        $content = $request->validated('content');

        $author = Auth::user();

        $this->articleService->addComment($article, $content, $author);

        return response(status: 201);
    }

    public function update(Article $article, UpdateArticleRequest $request)
    {
        $newArticle = $request->validated();

        $user = Auth::user();
        if ($article->author_id !== $user->id) {
            abort(403, 'Forbidden. Please authorize as the article author to make changes.');
        }

        $article->update($newArticle);

        return response()->json($article, '200');
    }

    public function destroy(Article $article)
    {
        $user = Auth::user();
        if ($article->author_id !== $user->id) {
            abort(403, 'Forbidden. Please authorize as the article author to make changes.');
        }

        $this->articleService->destroy($article);

        return response()->json($article, '204');
    }

    public function getArticlesByTag(Tag $tag)
    {
        $articles = $tag->articles()->get();

        return response()->json($articles, '200');
    }

    public function linkTagWithArticle(Article $article, Tag $tag)
    {
        $user = Auth::user();

        if ($article->author_id !== $user->id) {
            abort(403, 'Forbidden. Please authorize as the article author to make changes.');
        }

        $article->tags()->attach($tag);

        return response(status: '201');
    }

    public function removeTagFromArticle(Article $article, Tag $tag)
    {
        $user = Auth::user();

        if ($article->author_id !== $user->id) {
            abort(403, 'Forbidden. Please authorize as the article author to make changes.');
        }

        $article->tags()->detach($tag);

        return response(status: '204');
    }
}
