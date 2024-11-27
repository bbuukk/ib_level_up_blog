<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArticleVersion extends Model
{
    protected $fillable = ['article_id', 'title', 'content', 'cover_url'];


    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
