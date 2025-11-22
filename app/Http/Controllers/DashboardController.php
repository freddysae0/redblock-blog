<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use App\Models\User;
use App\Models\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Stats
        $stats = [
            'totalArticles' => Article::count(),
            'totalUsers' => User::count(),
            'totalComments' => Comment::count(),
            'totalViews' => Article::sum('total_views'),
        ];

        // Chart Data (Views per day for last 30 days)
        // Note: This query might need adjustment depending on database driver (SQLite vs MySQL/Postgres)
        // For SQLite (which is likely used here based on previous context), we use strftime
        $chartData = View::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as views'))
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Popular Articles
        $popularArticles = Article::orderByDesc('unique_views')
            ->take(5)
            ->get(['id', 'title', 'unique_views', 'total_views', 'slug']);

        // Recent Comments
        $recentComments = Comment::with(['user', 'article'])
            ->latest()
            ->take(5)
            ->get();

        // Recent Users
        $recentUsers = User::latest()
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'chartData' => $chartData,
            'popularArticles' => $popularArticles,
            'recentComments' => $recentComments,
            'recentUsers' => $recentUsers,
        ]);
    }
}
