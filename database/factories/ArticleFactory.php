<?php

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Article>
 */
class ArticleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = Article::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(6),
            'slug' => $this->faker->slug(),
            'body' => $this->faker->paragraphs(3, true),
            'media_file' => 'https://picsum.photos/500/300',
            'time_to_read' => $this->faker->numberBetween(1, 10),
            'total_views' => 0,
            'unique_views' => 0,
            'likes' => 0,
        ];
    }
}
