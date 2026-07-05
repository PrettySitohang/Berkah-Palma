<?php

namespace App\Http\Controllers;

use App\Models\Staf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $loginValue = $validated['email'];

        if (filter_var($loginValue, FILTER_VALIDATE_EMAIL)) {
            $staf = Staf::where('email', $loginValue)->first();
        } else {
            $staf = Staf::where('username', $loginValue)->first();
        }

        if (!$staf) {
            return response()->json([
                'success' => false,
                'message' => 'Email/Username atau Password tidak valid.'
            ], 401);
        }

        if (!Hash::check($validated['password'], $staf->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Email/Username atau Password tidak valid.'
            ], 401);
        }

        Auth::login($staf);

        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil.',

            'data' => [
                'id_staf'    => $staf->id_staf,
                'nama_staf'  => $staf->nama_staf,
                'username'   => $staf->username,
                'email'      => $staf->email,
                'role'       => $staf->role,
            ]
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil.'
        ]);
    }
}