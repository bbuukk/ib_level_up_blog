<?php

namespace App\Services;


use Illuminate\Http\UploadedFile;

use App\Models\User;
use App\Traits\ManipulateFilesInPublicStorage;
use App\Traits\SortByDirectModelAttribute;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class UserService
{
    use SortByDirectModelAttribute;
    use ManipulateFilesInPublicStorage;

    public function listAllUsers(
        array $sort,
        ?bool $isEmailVerified,
        ?Carbon $createdSince,
        ?string $search,
    ) {
        $query = User::query();

        $query = $this->sortByDirectModelAttribute($query, $sort);

        if (!is_null($isEmailVerified)) {
            if ($isEmailVerified) {
                $query->whereNotNull('email_verified_at');
            } else {
                $query->whereNull('email_verified_at');
            }
        }

        if (!is_null($createdSince)) {
            $query->where('created_at', '>=', $createdSince);
        }

        if (!is_null($search)) {
            $query
                ->where('name', 'ilike', "%$search%")
                ->orWhere('email', 'ilike', "%$search%");
        }


        return $query;
    }

    //TODO?: Use salting and peppering
    public function store(
        string $name,
        string $email,
        string $password,
        ?UploadedFile $avatarPhoto
    ): User {

        $avatarUrl = null;
        if (!is_null($avatarPhoto)) {
            $avatarUrl = $this->storeFileInPublicStorage($avatarPhoto, 'avatars');
        }

        return User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'avatar_url' => $avatarUrl
        ]);
    }

    public function update(
        User $user,
        ?string $name,
        ?string $email,
        ?string $password,
        ?string $avatarUrl
    ) {
        if ($name) {
            $user->name = $name;
        }

        if ($email) {
            $user->email = $email;
            $user->email_verified_at = null;
            //TODO?: send verification link to new email
        }


        if ($password) {
            $user->password = Hash::make($password);
        }

        $user->avatar_url = $avatarUrl;

        $user->save();
    }

    public function updateAvatarInStorage(User $user, $avatarPhoto)
    {
        $oldAvatarPhotoUrl = $user->avatar_url;
        if (!is_null($oldAvatarPhotoUrl)) {
            $this->deleteFileFromPublicStorage($oldAvatarPhotoUrl);
        }

        $url = $this->storeFileInPublicStorage($avatarPhoto, 'avatars');
        return $url;
    }

    public function deleteAvatarInStorage(User $user)
    {
        $oldAvatarPhotoUrl = $user->avatar_url;
        if (!is_null($oldAvatarPhotoUrl)) {
            $this->deleteFileFromPublicStorage($oldAvatarPhotoUrl);
        }
    }

    public function destroy(User $user)
    {
        $avatarUrl = $user->avatar_url;
        if (!is_null($avatarUrl)) {
            $this->deleteFileFromPublicStorage($avatarUrl);
        }

        $user->delete();
    }
}
