<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'body',
        'media_file',
        'user_id',
    ];

    protected $appends = ['media_url'];

    public function getMediaUrlAttribute(): ?string
    {
        return $this->media_file ? asset('storage/media/' . $this->media_file) : null;
    }

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
