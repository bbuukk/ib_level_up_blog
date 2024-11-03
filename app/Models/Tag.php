<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    use HasFactory;

    public function resolveRouteBinding($value, $field = null)
    {
        $record = $this->where('id', $value)->first();

        if (!$record) {
            throw new ModelNotFoundException("The requested tag could not be found. It may have been removed or does not exist.", 404);
        }

        return $record;
    }

    public function articles(): BelongsToMany
    {
        return $this->belongsToMany(Article::class);
    }
}
