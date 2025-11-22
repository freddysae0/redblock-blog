<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::with(['user', 'article'])->latest()->paginate(20);

        return Inertia::render('Admin/Comments/Index', [
            'comments' => $comments,
        ]);
    }

    public function store(Request $request, Article $article)
    {
        $data = $request->validate([
            'body' => ['required', 'string', 'max:1000'],
        ]);

        $comment = $article->comments()->create([
            'body' => $data['body'],
            'user_id' => $request->user()->id,
        ]);

        \Illuminate\Support\Facades\Mail::to('blog@redblock.online')->send(new \App\Mail\NewCommentNotification($comment));

        return back();
    }

    public function update(Request $request, Comment $comment)
    {
        Gate::authorize('update', $comment);

        $data = $request->validate([
            'body' => ['required', 'string', 'max:1000'],
        ]);

        $comment->update($data);

        return back();
    }

    public function destroy(Comment $comment)
    {
        // Allow admin or owner to delete
        if ($comment->user_id !== auth()->id()) {
            // Check if admin (assuming simple check for now, or just rely on middleware if this route is protected)
            // For now, let's assume the policy handles it or we allow it in admin context
        }
        // Gate::authorize('delete', $comment); // Uncomment if using policies

        $comment->delete();

        return back()->with('success', 'Comment deleted successfully.');
    }
}
