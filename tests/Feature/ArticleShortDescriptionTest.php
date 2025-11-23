<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleShortDescriptionTest extends TestCase
{
    use RefreshDatabase;

    public function test_short_description_can_be_stored()
    {
        $user = User::factory()->create(['is_mantainer' => true]);

        $response = $this->actingAs($user)->post(route('articles.store'), [
            'title' => 'Test Article',
            'slug' => 'test-article',
            'short_description' => 'This is a short description.',
            'body' => 'This is the body content.',
            'action' => 'draft',
        ]);

        $response->assertRedirect(route('articles.index'));
        $this->assertDatabaseHas('articles', [
            'title' => 'Test Article',
            'short_description' => 'This is a short description.',
        ]);
    }

    public function test_short_description_can_be_updated()
    {
        $user = User::factory()->create(['is_mantainer' => true]);
        $article = Article::factory()->create([
            'short_description' => 'Old description',
        ]);

        $response = $this->actingAs($user)->put(route('articles.update', $article), [
            'title' => $article->title,
            'slug' => $article->slug,
            'short_description' => 'New description',
            'body' => $article->body,
            'action' => 'draft',
        ]);

        $response->assertRedirect(route('articles.index'));
        $this->assertDatabaseHas('articles', [
            'id' => $article->id,
            'short_description' => 'New description',
        ]);
    }

    public function test_short_description_is_nullable()
    {
        $user = User::factory()->create(['is_mantainer' => true]);

        $response = $this->actingAs($user)->post(route('articles.store'), [
            'title' => 'Test Article',
            'slug' => 'test-article',
            'short_description' => null,
            'body' => 'This is the body content.',
            'action' => 'draft',
        ]);

        $response->assertRedirect(route('articles.index'));
        $this->assertDatabaseHas('articles', [
            'title' => 'Test Article',
            'short_description' => null,
        ]);
    }
}
