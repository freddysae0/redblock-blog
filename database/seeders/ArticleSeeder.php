<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();

        if ($categories->isEmpty()) {
            $this->call(CategorySeeder::class);
            $categories = Category::all();
        }

        Article::factory()
            ->count(20)
            ->create()
            ->each(function (Article $article) use ($categories): void {
                $categoryIds = $categories
                    ->random(random_int(1, min(3, $categories->count())))
                    ->pluck('id')
                    ->all();

                $article->categories()->sync($categoryIds);
            });
    }
}
