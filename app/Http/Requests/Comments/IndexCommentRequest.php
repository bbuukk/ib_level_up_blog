<?php

namespace App\Http\Requests\Comments;

use Illuminate\Foundation\Http\FormRequest;

class IndexCommentRequest extends FormRequest
{

    protected function prepareforvalidation(): void
    {
        $this->merge([
            'page' => (int) ($this->input('page', 1)),
            'perPage' => (int) ($this->input('perPage', 5)),
            'sort' => $this->input('sort', ['created_at' => 'desc']),
        ]);
    }

    public function rules(): array
    {
        return [
            'page' => ['sometimes', 'required', 'numeric'],
            'perPage' => ['required', 'numeric'],

            'sort' => ['required', 'array'],
            'sort.created_at' => ['sometimes', 'required', 'string', 'in:asc,desc'],
        ];
    }
}
