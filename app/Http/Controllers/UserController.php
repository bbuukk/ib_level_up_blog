<?php

namespace App\Http\Controllers;

use App\Http\Requests\Users\IndexUserRequest;
use App\Http\Requests\Users\StoreUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;
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

    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        ['name' => $name, 'email' => $email, 'password' => $password] = $data;
        $avatarPhoto = $request->file('avatar');

        $user = $this->userService->store($name, $email, $password, $avatarPhoto);

        $token = $user->createToken('name-irrelevant');

        $token->type = 'Bearer';
        $user->token = $token;

        return response()->json($user, 201);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        if (Auth::id() !== $user->id) {
            abort(403, 'Forbidden. Please authorize as the user to make changes.');
        }

        $newName = $request->validated('name');
        $newEmail = $request->validated('email');
        $newPassword = $request->validated('password');
        $newAvatarUrl = $user->avatar_url;

        if ($request->hasFile('avatar')) { // new avatar file
            $avatarPhoto = $request->file('avatar');
            $newAvatarUrl = $this->userService->updateAvatarInStorage($user, $avatarPhoto);
        } elseif ($request->has('avatar')) { //avatar is set to anything, but a file
            $this->userService->deleteAvatarInStorage($user);
            $newAvatarUrl = null;
        }
        //else no action needed, as avatar was not specified in params

        $this->userService->update($user, $newName, $newEmail, $newPassword, $newAvatarUrl);

        return response()->json($user, '200');
    }

    public function destroy(User $user)
    {
        if (Auth::id() !== $user->id) {
            abort(403, 'Forbidden. Please authorize as the user to make changes.');
        }

        $this->userService->destroy($user);

        return response(status: '204');
    }
}
