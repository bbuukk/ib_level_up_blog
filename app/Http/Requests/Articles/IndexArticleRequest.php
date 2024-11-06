<?php

namespace App\Http\Requests\Articles;

use Illuminate\Foundation\Http\FormRequest;

class IndexArticleRequest extends FormRequest
{

    protected function prepareforvalidation(): void
    {
        $this->merge([
            'perPage' => (int) ($this->input('perPage', 10)),
            'sort' => $this->input('sort', ['created_at' => 'asc']),
            'cursor' => $this->input('cursor')
        ]);
    }


    public function rules(): array
    {
        return [
            'perPage' => ['required', 'numeric'],

            'sort' => ['required', 'array'],
            'sort.created_at' => ['sometimes', 'required', 'string', 'in:asc,desc'],

            'cursor' => ['nullable', 'string'],
        ];
    }
}
