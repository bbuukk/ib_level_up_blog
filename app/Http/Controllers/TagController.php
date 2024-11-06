<?php

namespace App\Http\Controllers;

use App\Http\Requests\Tags\IndexTagRequest;
use App\Http\Requests\Tags\StoreTagRequest;
use App\Http\Requests\Tags\UpdateTagRequest;

use App\Models\Tag;

use App\Services\TagService;
use Illuminate\Pagination\LengthAwarePaginator;

class TagController
{

    public function __construct(private TagService $tagService) {}

    public function index(IndexTagRequest $request): LengthAwarePaginator
    {
        $data = $request->validated();
        ['page' => $page, 'perPage' => $perPage, 'sort' => $sort] = $data;

        $tags = $this->tagService->listAllTags($sort);

        return $tags
            ->paginate(perPage: $perPage, page: $page)
            ->withQueryString();
    }

    public function show(Tag $tag)
    {
        return $tag;
    }


    public function store(StoreTagRequest $request)
    {
        $label = $request->validated("label");

        $this->tagService->store($label);

        return response(status: 201);
    }

    public function update(Tag $tag, UpdateTagRequest $request)
    {
        $label = $request->validated('label');

        $this->tagService->update($tag, $label);

        return response()->json($tag, 200);
    }

    public function destroy(Tag $tag)
    {
        $this->tagService->destroy($tag);

        return response(status: 204);
    }
}
