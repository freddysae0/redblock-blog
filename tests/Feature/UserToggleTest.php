<?php

use App\Models\User;

test('user can toggle maintainer status of another user', function () {
    $admin = User::factory()->create();
    $user = User::factory()->create(['is_mantainer' => false]);

    $this->actingAs($admin)
        ->patch(route('users.toggle-maintainer', $user))
        ->assertRedirect();

    expect($user->fresh()->is_mantainer)->toBeTrue();

    $this->actingAs($admin)
        ->patch(route('users.toggle-maintainer', $user))
        ->assertRedirect();

    expect($user->fresh()->is_mantainer)->toBeFalse();
});

test('user cannot toggle their own maintainer status', function () {
    $user = User::factory()->create(['is_mantainer' => true]);

    $this->actingAs($user)
        ->patch(route('users.toggle-maintainer', $user))
        ->assertSessionHas('error');

    expect($user->fresh()->is_mantainer)->toBeTrue();
});
