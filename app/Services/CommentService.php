<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Comment;

class CommentService
{


    public function findCommentById(int $commentId): ?Comment
    {
        return Comment::query()
            ->where('id', $commentId)
            ->first();
    }
}
