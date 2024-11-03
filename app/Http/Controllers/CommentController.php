<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Models\Comment;
use App\Services\CommentService;

use App\Http\Requests\Comments\UpdateCommentRequest;

class CommentController
{

    public function __construct(private CommentService $commentService) {}

    public function update(Comment $comment, UpdateCommentRequest $request)
    {
        $newContent = $request->validated('content');

        $user = Auth::user();

        if ($comment->author_id !== $user->id) {
            abort(403, 'Forbidden. Please authorize as the comment author to make changes.');
        }

        $this->commentService->update($comment, $newContent);

        return response()->json($comment, '200');
    }

    public function destroy(Comment $comment)
    {
        $user = Auth::user();

        if ($comment->author_id !== $user->id) {
            abort(403, 'Forbidden. Please authorize as the comment author to delete it.');
        }

        $comment->delete();

        return response()->json($comment, '204');
    }
}
