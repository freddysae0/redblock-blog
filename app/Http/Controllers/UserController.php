<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        abort_unless(auth()->user()->is_mantainer, 403);

        $users = User::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search']),
        ]);
    }

    public function destroy(User $user)
    {
        abort_unless(auth()->user()->is_mantainer, 403);

        // Prevent deleting self
        if (auth()->id() === $user->id) {
            return redirect()->back()->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }

    public function toggleStatus(User $user)
    {
        abort_unless(auth()->user()->is_mantainer, 403);

        if (auth()->id() === $user->id) {
            return back()->with('error', 'You cannot disable yourself.');
        }

        $user->update([
            'is_disabled' => !$user->is_disabled,
        ]);

        return back();
    }

    public function toggleMaintainer(User $user)
    {
        abort_unless(auth()->user()->is_mantainer, 403);

        if (auth()->id() === $user->id) {
            return back()->with('error', 'You cannot change your own maintainer status.');
        }

        $user->update([
            'is_mantainer' => !$user->is_mantainer,
        ]);

        return back()->with('success', 'Maintainer status updated successfully.');
    }
}
