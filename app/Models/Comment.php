<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'article_id',
        'text',
        'likes',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
