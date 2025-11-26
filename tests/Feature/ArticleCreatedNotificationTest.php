<?php

namespace Tests\Feature;

use App\Mail\ArticleCreatedNotification;
use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ArticleCreatedNotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_notification_is_queued_to_users_who_want_notifications_when_article_is_published(): void
    {
        Mail::fake();

        $maintainer = User::factory()->create([
            'is_mantainer' => true,
        ]);

        $subscriber = User::factory()->create([
            'wants_notifications' => true,
            'is_disabled' => false,
        ]);

        $nonSubscriber = User::factory()->create([
            'wants_notifications' => false,
        ]);

        $this->actingAs($maintainer)->post(route('articles.store'), [
            'title' => 'Test Article',
            'slug' => 'test-article',
            'short_description' => 'Short description',
            'body' => 'This is the body content.',
            'action' => 'publish',
        ]);

        Mail::assertQueued(ArticleCreatedNotification::class, function ($mail) use ($subscriber) {
            return $mail->hasTo($subscriber->email);
        });

        Mail::assertNotQueued(ArticleCreatedNotification::class, function ($mail) use ($nonSubscriber) {
            return $mail->hasTo($nonSubscriber->email);
        });
    }

    public function test_notification_is_not_queued_when_article_is_draft(): void
    {
        Mail::fake();

        $maintainer = User::factory()->create([
            'is_mantainer' => true,
        ]);

        $subscriber = User::factory()->create([
            'wants_notifications' => true,
            'is_disabled' => false,
        ]);

        $this->actingAs($maintainer)->post(route('articles.store'), [
            'title' => 'Draft Article',
            'slug' => 'draft-article',
            'short_description' => 'Short description',
            'body' => 'This is the body content.',
            'action' => 'draft',
        ]);

        Mail::assertNotQueued(ArticleCreatedNotification::class);
    }

    public function test_notifications_are_not_sent_twice_for_same_article(): void
    {
        Mail::fake();

        $maintainer = User::factory()->create([
            'is_mantainer' => true,
        ]);

        $subscriber = User::factory()->create([
            'wants_notifications' => true,
            'is_disabled' => false,
        ]);

        $category = Category::factory()->create();

        $this->actingAs($maintainer)->post(route('articles.store'), [
            'title' => 'Test Article',
            'slug' => 'test-article',
            'short_description' => 'Short description',
            'body' => 'This is the body content.',
            'category_ids' => [$category->id],
            'action' => 'publish',
        ]);

        Mail::assertQueued(ArticleCreatedNotification::class, 1);

        $article = Article::first();
        $this->assertTrue($article->notifications_sent);

        Mail::fake();

        $article->update(['published_at' => null]);
        $article->update(['published_at' => now()]);

        Mail::assertNothingQueued();
    }

    public function test_notification_includes_categories_when_present(): void
    {
        Mail::fake();

        $maintainer = User::factory()->create([
            'is_mantainer' => true,
        ]);

        $subscriber = User::factory()->create([
            'wants_notifications' => true,
            'is_disabled' => false,
        ]);

        $category1 = Category::factory()->create(['title' => 'Technology']);
        $category2 = Category::factory()->create(['title' => 'Gaming']);

        $this->actingAs($maintainer)->post(route('articles.store'), [
            'title' => 'Test Article with Categories',
            'slug' => 'test-article-categories',
            'short_description' => 'Short description about tech and gaming',
            'body' => 'This is the body content.',
            'category_ids' => [$category1->id, $category2->id],
            'action' => 'publish',
        ]);

        Mail::assertQueued(ArticleCreatedNotification::class, function ($mail) use ($subscriber) {
            $article = $mail->article;
            return $mail->hasTo($subscriber->email) 
                && $article->categories->count() === 2
                && $article->categories->pluck('title')->contains('Technology')
                && $article->categories->pluck('title')->contains('Gaming');
        });
    }
}
