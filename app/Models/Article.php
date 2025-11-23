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
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    protected $appends = ['media_url'];

    public function getMediaUrlAttribute(): ?string
    {
        return $this->media_file ? asset('storage/media/' . $this->media_file) : null;
    }

    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at');
    }

    public function scopeDraft($query)
    {
        return $query->whereNull('published_at');
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
