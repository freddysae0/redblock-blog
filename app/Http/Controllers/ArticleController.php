<?php

namespace App\Http\Controllers;

use App\Mail\ArticleCreatedNotification;
use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        abort_unless(auth()->user()->is_mantainer, 403);

        $articles = Article::with('categories')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('body', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        abort_unless(auth()->user()->is_mantainer, 403);

        return Inertia::render('Admin/Articles/Create', [
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        abort_unless(auth()->user()->is_mantainer, 403);

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:articles,slug'],
            'short_description' => ['nullable', 'string', 'max:500'],
            'body' => ['required', 'string'],
            'media_file' => ['nullable', 'string', 'max:255'],
            'category_ids' => ['array'],
            'category_ids.*' => ['integer', 'exists:categories,id'],
            'action' => ['required', 'string', 'in:draft,publish'],
        ]);

        $article = Article::create([
            'title' => $data['title'],
            'slug' => $data['slug'],
            'short_description' => $data['short_description'] ?? null,
            'body' => $data['body'],
            'media_file' => $data['media_file'] ?? null,
            'published_at' => $data['action'] === 'publish' ? now() : null,
        ]);

        if (!empty($data['category_ids'])) {
            $article->categories()->sync($data['category_ids']);
        }

        if ($article->published_at && ! $article->notifications_sent) {
            $article->load('categories');
            
            User::where('wants_notifications', true)
                ->where('is_disabled', false)
                ->where('id', '!=', auth()->id())
                ->chunkById(100, function ($users) use ($article) {
                    foreach ($users as $user) {
                        Mail::to($user)->queue(new ArticleCreatedNotification($article));
                    }
                });

            $article->notifications_sent = true;
            $article->save();
        }

        return redirect()->route('articles.index')->with('success', 'Article created successfully.');
    }

    public function show(Article $article)
    {
        if (!$article->published_at && (!auth()->check() || !auth()->user()->is_mantainer)) {
            abort(404);
        }

        $article->increment('total_views');

        if (auth()->check()) {
            $viewExists = $article->views()
                ->where('user_id', auth()->id())
                ->exists();

            if (!$viewExists) {
                $article->views()->create([
                    'user_id' => auth()->id(),
                ]);
                $article->increment('unique_views');
            }
        }

        return Inertia::render('Article/Show', [
            'article' => $article->load('categories', 'comments.user'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function edit(Article $article)
    {
        abort_unless(auth()->user()->is_mantainer, 403);

        return Inertia::render('Admin/Articles/Edit', [
            'article' => $article->load('categories'),
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, Article $article)
    {
        abort_unless(auth()->user()->is_mantainer, 403);

        $data = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'slug' => ['sometimes', 'string', 'max:255', 'unique:articles,slug,' . $article->id],
            'short_description' => ['nullable', 'string', 'max:500'],
            'body' => ['sometimes', 'string'],
            'media_file' => ['nullable', 'string', 'max:255'],
            'category_ids' => ['sometimes', 'array'],
            'category_ids.*' => ['integer', 'exists:categories,id'],
            'action' => ['nullable', 'string', 'in:draft,publish'],
        ]);

        if (isset($data['action'])) {
            $data['published_at'] = $data['action'] === 'publish' ? now() : null;
        }

        $article->update($data);

        if (array_key_exists('category_ids', $data)) {
            $article->categories()->sync($data['category_ids'] ?? []);
        }

        return redirect()->route('articles.index')->with('success', 'Article updated successfully.');
    }

    public function destroy(Article $article)
    {
        abort_unless(auth()->user()->is_mantainer, 403);

        $article->delete();

        return redirect()->route('articles.index')->with('success', 'Article deleted successfully.');
    }
}
