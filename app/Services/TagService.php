<?php

namespace App\Services;

use App\Models\Comment;
use App\Models\Tag;

use App\Traits\SortByDirectModelAttribute;

class TagService
{
    use SortByDirectModelAttribute;

    public function listAllTags(array $sort)
    {
        $query = Tag::query();

        $query = $this->sortByDirectModelAttribute($query, $sort);

        return $query;
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
