<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some default categories
        $categories = [
            ['title' => 'Design', 'description' => 'Articles about product and visual design.'],
            ['title' => 'Technology', 'description' => 'Technical deep dives and engineering topics.'],
            ['title' => 'Innovation', 'description' => 'Thoughts on innovation and strategy.'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['title' => $category['title']],
                ['description' => $category['description']]
            );
        }

        // Create additional random categories
        Category::factory()->count(5)->create();
    }
}
