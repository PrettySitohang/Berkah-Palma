<?php

namespace App\Http\Controllers;

use App\Models\Staf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $loginValue = $validated['email'];

        $query = Staf::query();

        if (filter_var($loginValue, FILTER_VALIDATE_EMAIL)) {
            $staf = $query->where('email', $loginValue)->first();
        } else {
            $staf = $query->where('username', $loginValue)->first();
        }

        if (!$staf) {
            return response()->json(['message' => 'Email atau password tidak valid.'], 401);
        }

        if (!Hash::check($validated['password'], $staf->password)) {
            return response()->json(['message' => 'Email atau password tidak valid.'], 401);
        }

        if (property_exists($staf, 'status') && $staf->status === false) {
            return response()->json(['message' => 'Akun Anda tidak aktif.'], 403);
        }

        return response()->json([
            'message' => 'Login berhasil.',
            'role' => $staf->role,
            'name' => $staf->name,
            'token' => bin2hex(random_bytes(16)),
        ], 200);
    }
}
