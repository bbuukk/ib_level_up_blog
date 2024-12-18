<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\SampleController;
use App\Http\Controllers\TagController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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

Route::post('/login', function (Request $request) {
    $email = $request->get('email');
    $password = $request->get('password');

    $user = User::query()->where('email', $email)->first();

    if (!Hash::check($password, $user->password)) {
        throw new Exception('invalid password');
    }

    return [
        'type' => 'Bearer',
        'token' => encrypt(base64_encode($email . ':' . $password))
    ];
});

/**
 * Articles
 */
Route::group(["prefix" => "articles"], function () {

    Route::get('/', [ArticleController::class, 'index']);
    Route::get('/{articleId}', [ArticleController::class, 'show']);
    Route::get('/{articleId}/comments', [ArticleController::class, 'comments']);
    Route::get('/tags/{tag}', [ArticleController::class, 'getArticlesByTag']);

    Route::post('/{articleId}/comments', [ArticleController::class, 'addComment']);
    Route::post('/', [ArticleController::class, 'store']);
    Route::post('/{article}/tags/{tag}', [ArticleController::class, 'linkTagWithArticle']);

    Route::put('/{articleId}', [ArticleController::class, 'update']);

    Route::delete('/{articleId}', [ArticleController::class, 'destroy']);
    Route::delete('/{article}/tags/{tag}', [ArticleController::class, 'removeTagFromArticle']);
});

Route::group(["prefix" => "comments"], function () {
    Route::put('/{commentId}', [CommentController::class, 'update']);
    Route::delete('/{commentId}', [CommentController::class, 'destroy']);
});

Route::apiResource('tags', TagController::class);
