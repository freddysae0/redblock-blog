<?php

use App\Models\User;
use App\Models\Article;
use App\Models\Category;

test('non-maintainer sees coming soon on dashboard', function () {
    $user = User::factory()->create(['is_mantainer' => false]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('dashboard')
                ->where('isMaintainer', false)
                ->missing('stats')
        );
});

test('maintainer sees full dashboard', function () {
    $user = User::factory()->create(['is_mantainer' => true]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('dashboard')
                ->where('isMaintainer', true)
                ->has('stats')
        );
});

test('non-maintainer cannot access admin actions', function () {
    $user = User::factory()->create(['is_mantainer' => false]);
    $article = Article::factory()->create();
    $category = Category::factory()->create();

    $this->actingAs($user);

    // Articles
    $this->get(route('articles.index'))->assertForbidden();
    $this->get(route('articles.create'))->assertForbidden();
    $this->post(route('articles.store'), [])->assertForbidden();
    $this->get(route('articles.edit', $article))->assertForbidden();
    $this->put(route('articles.update', $article), [])->assertForbidden();
    $this->delete(route('articles.destroy', $article))->assertForbidden();

    // Categories
    $this->get(route('categories.index'))->assertForbidden();
    $this->get(route('categories.create'))->assertForbidden();
    $this->post(route('categories.store'), [])->assertForbidden();
    $this->get(route('categories.edit', $category))->assertForbidden();
    $this->put(route('categories.update', $category), [])->assertForbidden();
    $this->delete(route('categories.destroy', $category))->assertForbidden();

    // Users
    $otherUser = User::factory()->create();
    $this->get(route('users.index'))->assertForbidden();
    $this->patch(route('users.toggle-maintainer', $otherUser))->assertForbidden();
    $this->patch(route('users.toggle-status', $otherUser))->assertForbidden();
    $this->delete(route('users.destroy', $otherUser))->assertForbidden();

    // Comments
    $this->get(route('comments.index'))->assertForbidden();
});

test('maintainer can access admin actions', function () {
    $user = User::factory()->create(['is_mantainer' => true]);
    $article = Article::factory()->create();
    $category = Category::factory()->create();

    $this->actingAs($user);

    // Just checking access, not full functionality (covered by other tests)
    $this->get(route('articles.index'))->assertOk();
    $this->get(route('articles.create'))->assertOk();
    $this->get(route('categories.index'))->assertOk();
    $this->get(route('categories.create'))->assertOk();
    $this->get(route('users.index'))->assertOk();
    $this->get(route('comments.index'))->assertOk();
});
