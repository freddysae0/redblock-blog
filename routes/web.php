<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserController;
use App\Models\Article;

Route::get('/', function () {
    $articles = Article::with('categories')->latest()->take(6)->get();

    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'articles' => $articles,
    ]);
})->name('home');

Route::get('/blog/{article:slug}', [ArticleController::class, 'show'])->name('articles.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    Route::resource('articles', ArticleController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('users', UserController::class)->only(['index', 'destroy']);
    Route::patch('users/{user}/toggle-status', [UserController::class, 'toggleStatus'])->name('users.toggle-status');
    Route::get('comments', [CommentController::class, 'index'])->name('comments.index');

    Route::post('articles/{article}/comments', [CommentController::class, 'store'])->name('articles.comments.store');
    Route::put('comments/{comment}', [CommentController::class, 'update'])->name('comments.update');
    Route::delete('comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
});

require __DIR__ . '/settings.php';
