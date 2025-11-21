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
        $categories = collect([
            ['title' => 'Design', 'description' => 'Articles about product and visual design.'],
            ['title' => 'Technology', 'description' => 'Technical deep dives and engineering topics.'],
            ['title' => 'Innovation', 'description' => 'Thoughts on innovation and strategy.'],
        ])->map(function (array $attributes) {
            return Category::firstOrCreate(
                ['title' => $attributes['title']],
                ['description' => $attributes['description']],
            );
        });

        /** @var \Illuminate\Support\Collection<int, Category> $categories */

        Article::factory()
            ->count(20)
            ->create()
            ->each(function (Article $article) use ($categories): void {
                $categoryIds = $categories
                    ->random(random_int(1, $categories->count()))
                    ->pluck('id')
                    ->all();

                $article->categories()->sync($categoryIds);
            });
    }
}
