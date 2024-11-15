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

}
