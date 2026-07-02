<?php

namespace App\Http\Controllers;

use App\Models\Staf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StafController extends Controller
{
    public function index()
    {
        try {
            $staf = Staf::latest()->get();
            return response()->json($staf, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengambil data', 'error' => $e->getMessage()], 500);
        }
    }

    // 2. STORE DATA (Tambah Staf Baru)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_staff' => 'required|string|max:255',
            'username' => 'required|string|unique:tb_staf,username',
            'password' => 'required|string|min:6',
            'role' => 'required|string',
        ]);

        try {
            // Hash password sebelum disimpan ke database
            $validated['password'] = Hash::make($validated['password']);
            $validated['status'] = true;

            $staf = Staf::create($validated);
            return response()->json(['message' => 'Staf baru berhasil ditambahkan!', 'data' => $staf], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal menambah staf', 'error' => $e->getMessage()], 500);
        }
    }

    // 3. TOGGLE STATUS (Mengubah status Aktif/Nonaktif)
    public function toggleStatus($id)
    {
        try {
            $staf = Staf::find($id);

            if (!$staf) {
                return response()->json(['message' => 'Data staf tidak ditemukan!'], 404);
            }

            // Balikkan nilai boolean status (true jadi false, vice versa)
            $staf->status = !$staf->status;
            $staf->save();

            return response()->json(['message' => 'Status staf berhasil diperbarui', 'data' => $staf], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengubah status', 'error' => $e->getMessage()], 500);
        }
    }

    // 4. DESTROY DATA (Hapus Staf)
    public function destroy($id)
    {
        try {
            $staf = Staf::find($id);

            if (!$staf) {
                return response()->json(['message' => 'Data staf tidak ditemukan!'], 404);
            }

            $staf->delete();

            return response()->json([
                'message' => 'Akun staf berhasil dihapus permanen!'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menghapus data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getProfile(Request $request)
    {
        $staf = $request->user();

        if (!$staf) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        return response()->json([
            'id_staff'   => $staf->id_staff,
            'nama_staff' => $staf->nama_staff,
            'username'   => $staf->username,
            'email'      => $staf->email,
            'role'       => $staf->role,
        ]);
    }
}