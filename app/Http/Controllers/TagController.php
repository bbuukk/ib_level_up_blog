<?php

namespace App\Http\Controllers;

use App\Http\Requests\Tags\IndexTagRequest;
use App\Http\Requests\Tags\StoreTagRequest;
use App\Http\Requests\Tags\UpdateTagRequest;

use App\Models\Tag;


use App\Services\TagService;

class TagController
{

    public function __construct(private TagService $tagService) {}

    public function index()
    {
        $tags = $this->tagService->listAllTags();

        return $tags;
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
