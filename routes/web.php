<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\UserController;
use App\Models\Article;
use App\Models\Category;

Route::get('/robots.txt', function () {
    $content = "";
    if (! app()->environment('production')) {
        // Block everything in local / staging / testing
        $content = "User-agent: *\nDisallow: /";
    } else {
        // Production rules – customize as you like
        $content = <<<ROBOTS
User-agent: *
Disallow:

ROBOTS;
    }

    return response($content, 200, [
        'Content-Type' => 'text/plain', 
    ]);
});

Route::get('/', function () {
    // Show popular articles (most recent 6)
    $articles = Article::published()->with('categories')->latest()->take(6)->get();

    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'articles' => $articles,
    ]);
})->name('home');

Route::get('/blog', function (Request $request) {
    $query = Article::published()->with('categories');

    // Filter by category
    if ($request->category) {
        $query->whereHas('categories', function ($q) use ($request) {
            $q->where('title', $request->category);
        });
    }

    // Filter by search
    if ($request->search) {
        $query->where(function ($q) use ($request) {
            $q->where('title', 'like', "%{$request->search}%")
                ->orWhere('body', 'like', "%{$request->search}%");
        });
    }

    // Sort articles
    $sort = $request->sort ?? 'latest';
    switch ($sort) {
        case 'popular':
            $query->orderBy('total_views', 'desc');
            break;
        case 'liked':
            $query->orderBy('likes', 'desc');
            break;
        case 'latest':
        default:
            $query->latest();
            break;
    }

    $articles = $query->get();
    $categories = Category::all();

    return Inertia::render('Blog', [
        'articles' => $articles,
        'categories' => $categories,
        'filters' => $request->only(['category', 'search', 'sort']),
    ]);
})->name('blog');

Route::get('/what-is-redblock', function () {
    return Inertia::render('WhatIsRedblock');
})->name('what-is-redblock');

Route::get('/faq', function () {
    return Inertia::render('FAQ');
})->name('faq');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');


Route::get('/blog/{article:slug}', [ArticleController::class, 'show'])->name('articles.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    Route::resource('articles', ArticleController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('users', UserController::class)->only(['index', 'destroy']);
    Route::patch('users/{user}/toggle-status', [UserController::class, 'toggleStatus'])->name('users.toggle-status');
    Route::patch('users/{user}/toggle-maintainer', [UserController::class, 'toggleMaintainer'])->name('users.toggle-maintainer');
    Route::get('comments', [CommentController::class, 'index'])->name('comments.index');

    Route::post('articles/{article}/comments', [CommentController::class, 'store'])->name('articles.comments.store');
    Route::put('comments/{comment}', [CommentController::class, 'update'])->name('comments.update');
    Route::delete('comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');

    // Media upload
    Route::post('media/upload', [MediaController::class, 'upload'])->name('media.upload');
});

require __DIR__ . '/settings.php';
