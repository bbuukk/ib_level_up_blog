<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\SampleController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * Add your routes below, one per line
 */

Route::get('/version', [SampleController::class, 'version']);
Route::post('/echo', [SampleController::class, 'echo']);


/**
 * Users
 */
Route::get('/users', function () {
    $users = User::query()->get();
    return $users;
});
Route::get('/users/{userId}', function (int $userId) {
    return User::query()->findOrFail($userId);
});

/**
 * Articles
 */
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{articleId}', [ArticleController::class, 'show']);
Route::get('/articles/{articleId}/comments', [ArticleController::class, 'comments']);
Route::post('/articles/{articleId}/comments', [ArticleController::class, 'addComment']);
Route::post('/articles', [ArticleController::class, 'store']);
