<?php

namespace App\Http\Controllers;

use Illuminate\Pagination\LengthAwarePaginator;

use App\Http\Requests\Articles\IndexArticleRequest;
use App\Http\Requests\Articles\UpdateArticleRequest;
use App\Http\Requests\Articles\StoreArticleRequest;

use App\Http\Requests\Comments\StoreCommentRequest;
use App\Http\Requests\Comments\IndexCommentRequest;

use App\Http\Requests\Tags\IndexTagRequest;

use App\Models\Article;
use App\Models\Tag;

use App\Services\ArticleService;
use App\Services\TagService;
use Carbon\Carbon;
use Illuminate\Pagination\CursorPaginator;
use Illuminate\Support\Facades\Auth;


class ArticleController
{

    public function __construct(private ArticleService $articleService, private TagService $tagService) {}

    public function index(IndexArticleRequest $request): CursorPaginator
    {
        $perPage = (int) $request->validated('perPage');
        $sort = $request->validated('sort');

        $cursor = (int) $request->validated('cursor');

        $authorId = $request->validated('filter.authorId');
        $createdSince = $request->validated('filter.createdSinceDate')
            ? Carbon::parse($request->validated('filter.createdSinceDate'))
            : null;
        $search = $request->validated('search');


        $query = $this->articleService->listAllArticles(
            $sort,
            $authorId,
            $createdSince,
            $search,
        );

        return $query
            // fallback unique column for cursor pagination
            ->orderBy('id', 'desc')
            ->cursorPaginate(perPage: $perPage, cursor: $cursor)
            ->withQueryString();
    }

    public function show(Article $article)
    {
        $article = $article->load('author');

        return $article;
    }

    public function comments(IndexCommentRequest $request, Article $article): CursorPaginator
    {
        $data = $request->validated();
        ['perPage' => $perPage, 'sort' => $sort, 'cursor' => $cursor] = $data;

        $query = $this->articleService->getCommentsForArticle($article, $sort);

        return $query
            // fallback unique column for cursor pagination
            ->orderBy('id', 'desc')
            ->cursorPaginate(perPage: $perPage, cursor: $cursor)
            ->withQueryString();
    }

    public function getArticleTags(IndexTagRequest $request, Article $article): LengthAwarePaginator
    {
        $data = $request->validated();
        ['page' => $page, 'perPage' => $perPage, 'sort' => $sort] = $data;

        $tags = $this->articleService->getTagsForArticle($article, $sort);

        return $tags
            ->paginate(perPage: $perPage, page: $page)
            ->withQueryString();
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

    public function getArticlesByTag(IndexArticleRequest $request, Tag $tag)
    {
        $data = $request->validated();
        ['perPage' => $perPage, 'sort' => $sort, 'cursor' => $cursor] = $data;

        $query = $this->articleService->listAllArticlesByTag($tag, $sort);

        return $query
            // fallback unique column for cursor pagination
            ->orderBy('id', 'desc')
            ->cursorPaginate(perPage: $perPage, cursor: $cursor)
            ->withQueryString();
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
