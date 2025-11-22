<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure we have users and articles
        if (User::count() === 0) {
            User::factory(10)->create();
        }

        if (Article::count() === 0) {
            // If no articles, we can't attach comments to existing ones easily without creating them.
            // But ArticleSeeder should have run.
            // Let's just create some articles if none exist, though ArticleSeeder should be preferred.
            Article::factory(10)->create();
        }

        $users = User::all();
        $articles = Article::all();

        // Create random comments for existing articles
        foreach ($articles as $article) {
            // 0 to 5 comments per article
            $commentCount = random_int(0, 5);

            if ($commentCount > 0) {
                Comment::factory($commentCount)->create([
                    'article_id' => $article->id,
                    'user_id' => fn() => $users->random()->id,
                ]);
            }
        }
    }
}
