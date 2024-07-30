<?php

use App\Http\Controllers\SampleController;
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
