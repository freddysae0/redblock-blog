<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'body',
        'media_url',
        'total_views',
        'unique_views',
        'likes',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'article_category');
    }

    public function views()
    {
        return $this->hasMany(View::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
