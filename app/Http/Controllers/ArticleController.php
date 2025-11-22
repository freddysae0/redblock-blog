<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with('categories')->latest()->paginate(10);

        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Articles/Create', [
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:articles,slug'],
            'body' => ['required', 'string'],
            'media_url' => ['nullable', 'string', 'max:255'],
            'category_ids' => ['array'],
            'category_ids.*' => ['integer', 'exists:categories,id'],
        ]);

        $article = Article::create([
            'title' => $data['title'],
            'slug' => $data['slug'],
            'body' => $data['body'],
            'media_url' => $data['media_url'] ?? null,
        ]);

        if (!empty($data['category_ids'])) {
            $article->categories()->sync($data['category_ids']);
        }

        return redirect()->route('articles.index')->with('success', 'Article created successfully.');
    }

    public function show(Article $article)
    {
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
        return Inertia::render('Admin/Articles/Edit', [
            'article' => $article->load('categories'),
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $data = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'slug' => ['sometimes', 'string', 'max:255', 'unique:articles,slug,' . $article->id],
            'body' => ['sometimes', 'string'],
            'media_url' => ['nullable', 'string', 'max:255'],
            'category_ids' => ['sometimes', 'array'],
            'category_ids.*' => ['integer', 'exists:categories,id'],
        ]);

        $article->update($data);

        if (array_key_exists('category_ids', $data)) {
            $article->categories()->sync($data['category_ids'] ?? []);
        }

        return redirect()->route('articles.index')->with('success', 'Article updated successfully.');
    }

    public function destroy(Article $article)
    {
        $article->delete();

        return redirect()->route('articles.index')->with('success', 'Article deleted successfully.');
    }
}
