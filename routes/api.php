<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\TagController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/**
 * Users
 */

Route::get('/me', function () {
    return Auth::user();
})->middleware(['auth:sanctum']);

Route::group(["prefix" => "users"], function () {

    Route::get('/', [UserController::class, 'index']);
    Route::get('/{user}', [UserController::class, 'show']);

    Route::post('/', [UserController::class, 'store']);

    Route::group(['middleware' => ['auth:sanctum']], function () {

        Route::put('/{user}', [UserController::class, 'update']);
        Route::delete('/{user}', [UserController::class, 'destroy']);
    });
});

Route::post('/login', function (Request $request) {
    $email = $request->get('email');
    $password = $request->get('password');

    $user = User::query()->where('email', $email)->first();
    //TODO: check if $user is present, if not abort

    if (!Hash::check($password, $user->password)) {
        throw new Exception('invalid password');
    }

    $token = $user->createToken('name-irrelevant');

    return [
        'type' => 'Bearer',
        'token' => $token->plainTextToken
    ];
});

/**
 * Articles
 */
Route::group(["prefix" => "articles"], function () {

    Route::get('/', [ArticleController::class, 'index']);
    Route::get('/{article}', [ArticleController::class, 'show']);
    Route::get('/{article}/comments', [ArticleController::class, 'comments']);
    Route::get('/{article}/tags', [ArticleController::class, 'getArticleTags']);
    Route::get('/tags/{tag}', [ArticleController::class, 'getArticlesByTag']);
    Route::get('/{article}/versions', [ArticleController::class, 'versions']);

    Route::group(['middleware' => ['auth:sanctum']], function () {

        Route::post('/', [ArticleController::class, 'store']);
        Route::post('/{article}/comments', [ArticleController::class, 'addComment']);
        Route::post('/{article}/tags/{tag}', [ArticleController::class, 'linkTagWithArticle']);
        Route::post('/{article}/restore/{versionId}', [ArticleController::class, 'restore']);

        Route::put('/{article}', [ArticleController::class, 'update']);

        Route::delete('/{article}', [ArticleController::class, 'destroy']);
        Route::delete('/{article}/tags/{tag}', [ArticleController::class, 'removeTagFromArticle']);
    });
});

// Route::put('/articles/{article}', [ArticleController::class, 'update']);

Route::group(["prefix" => "comments", 'middleware' => ['auth:sanctum']], function () {
    Route::put('/{comment}', [CommentController::class, 'update']);
    Route::delete('/{comment}', [CommentController::class, 'destroy']);
});

Route::apiResource('tags', TagController::class);
