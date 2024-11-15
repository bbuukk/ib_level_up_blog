<?php

namespace App\Http\Controllers;

use App\Http\Requests\Users\IndexUserRequest;
use App\Models\User;
use App\Services\UserService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController
{
    public function __construct(private UserService $userService) {}

    public function index(IndexUserRequest $request)
    {
        $data = $request->validated();
        ['page' => $page, 'perPage' => $perPage, 'sort' => $sort] = $data;

        $isEmailVerified = $request->validated('filter.isEmailVerified');
        $createdSince = $request->validated('filter.createdSinceDate')
            ? Carbon::parse($request->validated('filter.createdSinceDate'))
            : null;
        $search = $request->validated('search');

        $query = $this->userService->listAllUsers(
            $sort,
            $isEmailVerified,
            $createdSince,
            $search,
        );

        return $query
            ->paginate(page: $page, perPage: $perPage)
            ->withQueryString();
    }

    public function show(User $user)
    {
        return $user;
    }

}
