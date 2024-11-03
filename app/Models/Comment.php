<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    use HasFactory;

    public function resolveRouteBinding($value, $field = null)
    {
        $record = $this->where('id', $value)->first();

        if (!$record) {
            throw new ModelNotFoundException("The requested comment could not be found. It may have been removed or does not exist.", 404);
        }

        return $record;
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
