<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;

class IndexUserRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    protected function prepareforvalidation(): void
    {
        $this->merge([
            'page' => (int) ($this->input('page', 1)),
            'perPage' => (int) ($this->input('perPage', 10)),
            'sort' => $this->input('sort', ['created_at' => 'asc']),
        ]);
    }


    public function rules(): array
    {
        return [
            'page' => ['required', 'numeric'],
            'perPage' => ['required', 'numeric'],

            'sort' => ['required', 'array'],
            'sort.created_at' => ['sometimes', 'required', 'string', 'in:asc,desc'],

            'filter' => ['sometimes', 'required', 'array'],
            'filter.isEmailVerified' => ['sometimes', 'required', 'boolean'],
            'filter.createdSinceDate' => ['sometimes', 'required', 'date'],

            'search' => ['sometimes', 'required', 'string']
        ];
    }
}
