<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Services\CommentService;
use Illuminate\Http\Request;

use App\Http\Requests\UpdateCommentRequest;

class CommentController
{

    private CommentService $commentService;

    public function __construct(CommentService $service)
    {
        $this->commentService = $service;
    }

    public function update(int $commentId, Request $request)
    {
        $newContent = $request->input('content');

        $comment = $this->commentService->findCommentById($commentId);
        if (is_null($comment)) {
            abort(404, 'Comment not found');
        }

        $comment->content = $newContent;
        $comment->save();

        return response()->json($comment, '200');
    }

    public function destroy(int $commentId)
    {

        $comment = $this->commentService->findCommentById($commentId);
        if (is_null($comment)) {
            abort(404, 'Comment not found');
        }

        $comment->delete();

        return response()->json($comment, '204');
    }
}
