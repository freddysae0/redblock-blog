<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => [
                'required',
                'file',
                'mimes:jpg,jpeg,png,gif,webp,mp4,webm',
                'max:51200', // 50MB max
            ],
        ]);

        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();
        $filename = time() . '_' . uniqid() . '.' . $extension;

        // Store in public/media directory
        $file->storeAs('media', $filename, 'public');

        return response()->json([
            'filename' => $filename,
            'url' => asset('storage/media/' . $filename),
        ]);
    }
}
