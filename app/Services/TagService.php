<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Comment;
use App\Models\Tag;

class TagService
{
    public function listAllTags()
    {
        return Tag::query()->get();
    }

    public function findTagById(int $tagId): ?Tag
    {
        return Comment::query()
            ->where('id', $tagId)
            ->first();
    }

    public function store(string $label)
    {
        $tag = new Tag;

        $tag->label = $label;

        return $tag->save();
    }

    public function update(Tag $tag, string $label)
    {
        $tag->label = $label;
        $tag->save();
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();
    }
}
