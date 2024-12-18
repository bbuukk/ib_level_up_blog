<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateArticleRequest;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\StoreCommentRequest;

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

    // display
    // findById
    public function show(int $articleId)
    {
        // view layer (input) - does nothing

        // model layer - fetch article
        $article = $this->articleService->findArticleById($articleId);
        if (is_null($article)) {
            abort(404, 'Article not found');
        }

        // view layer (output) - does nothing, rely on automatic conversion to JSON
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

    // create
    // saveArticle
    // persist
    // newArticle
    public function store(StoreArticleRequest $request)
    {
        // view layer - validate the request
        $title = $request->validated('title');
        $content = $request->validated('content');
        $author = Auth::user();

        //$author = $this->getIdentityFromAuthorizationHeader($request);

        // model layer - do the thing with the data (store)
        $this->articleService->store($title, $content, $author);

        // view layer - render response
        // return $this->generateCsv()
        // return $this->sendEmailToAuthor()
        return response(status: 201);
    }

    public function addComment(int $articleId, StoreCommentRequest $request)
    {
        $content = $request->validated('content');

        $article = $this->articleService->findArticleById($articleId);
        if (is_null($article)) {
            abort(404, 'Article not found');
        }
        $this->articleService->addComment($article, $content);

        return response(status: 201);
    }

    public function update(int $articleId, UpdateArticleRequest $request)
    {
        $newArticle = $request->validated();

        $article = $this->articleService->findArticleById($articleId);
        if (is_null($article)) {
            abort(404, 'article not found');
        }

        $article->update($newArticle);

        return response()->json($article, '200');
    }

    public function destroy(int $articleId)
    {
        $article = $this->articleService->findArticleById($articleId);
        if (is_null($article)) {
            abort(404, 'article not found');
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
        $article->tags()->attach($tag);

        return response(status: '201');
    }

    public function removeTagFromArticle(Article $article, Tag $tag)
    {
        $article->tags()->detach($tag);

        return response(status: '204');
    }
}
