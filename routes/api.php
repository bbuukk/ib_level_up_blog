<?php

use App\Http\Controllers\SampleController;
use App\Models\Article;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * Add your routes below, one per line
 */

Route::get('/version', [SampleController::class, 'version']);
Route::post('/echo', [SampleController::class, 'echo']);

Route::get('/users', function () {
    $users = User::query()->get();
    return $users;
});

Route::get('/users/{userId}', function (int $userId) {
    return User::query()->findOrFail($userId);
});

Route::get('/articles', function () {
    $articles = Article::query()->get();
    return $articles;
});

Route::get('/articles/{articleId}', function (int $articleId) {
    return Article::query()->findOrFail($articleId);
});

Route::get(
    '/articles/{articleId}/comments',
    function (int $articleId): Collection {
        $article = Article::query()->findOrFail($articleId);

        $comments = $article
            ->comments()
            ->get();

        return $comments;
    }
);
