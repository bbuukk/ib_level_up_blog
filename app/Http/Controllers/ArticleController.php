<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Article;
use App\Models\Services\ArticleService;
use Illuminate\Support\Collection;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ArticleController
{
    private ArticleService $articleService;

    public function __construct(ArticleService $service)
    {
        $this->articleService = $service;
    }

    // list
    // showAllArticle
    public function index()
    {
        // view layer (input) -> later on we will have pagination and search

        // model layer - fetch all articles from the DB
        $articles = $this->articleService->listAllArticles();

        // view layer (output) - transform the response in some way
        $response = [];
        foreach ($articles as $article) {
            array_push($response, [
                'content' => $article->content,
                'title' => $article->title,
                'created' => $article->created_at,
                'update' => $article->updated_at,
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

        // model layer - do the thing with the data (store)
        $this->articleService->store($title, $content);

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
}
