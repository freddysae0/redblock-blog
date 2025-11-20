<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, Article $article)
    {
        $data = $request->validate([
            'text' => ['required', 'string'],
        ]);

        $comment = Comment::create([
            'author_id' => Auth::id(),
            'article_id' => $article->id,
            'text' => $data['text'],
        ]);

        return response()->json($comment, 201);
    }

    public function update(Request $request, Comment $comment)
    {
        $data = $request->validate([
            'text' => ['required', 'string'],
        ]);

        $comment->update($data);

        return response()->json($comment);
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();

        return response()->noContent();
    }
}
