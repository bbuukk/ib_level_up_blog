<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $title
 * @property string $content
 */
class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        // Add other fields that you want to be fillable
    ];

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
