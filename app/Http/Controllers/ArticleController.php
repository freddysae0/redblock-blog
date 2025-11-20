<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with('categories')->latest()->paginate(10);

        return response()->json($articles);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'media_url' => ['nullable', 'string', 'max:255'],
            'category_ids' => ['array'],
            'category_ids.*' => ['integer', 'exists:categories,id'],
        ]);

        $article = Article::create([
            'title' => $data['title'],
            'body' => $data['body'],
            'media_url' => $data['media_url'] ?? null,
        ]);

        if (!empty($data['category_ids'])) {
            $article->categories()->sync($data['category_ids']);
        }

        return response()->json($article->load('categories'), 201);
    }

    public function show(Article $article)
    {
        return response()->json($article->load(['categories', 'comments']));
    }

    public function update(Request $request, Article $article)
    {
        $data = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'body' => ['sometimes', 'string'],
            'media_url' => ['nullable', 'string', 'max:255'],
            'category_ids' => ['sometimes', 'array'],
            'category_ids.*' => ['integer', 'exists:categories,id'],
        ]);

        $article->update($data);

        if (array_key_exists('category_ids', $data)) {
            $article->categories()->sync($data['category_ids'] ?? []);
        }

        return response()->json($article->load('categories'));
    }

    public function destroy(Article $article)
    {
        $article->delete();

        return response()->noContent();
    }
}
