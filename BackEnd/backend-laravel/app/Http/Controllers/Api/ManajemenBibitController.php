<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\VarietasBibit;
use App\Models\StokBibit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ManajemenBibitController extends Controller
{
    /**
     * Display a listing of the resource (V10 Halaman Manajemen Bibit)
     */
    public function index()
    {
        // Mengambil semua data varietas beserta sisa stok fisiknya
        $bibit = VarietasBibit::with('stok')->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar varietas bibit berhasil diambil',
            'data' => $bibit
        ], 200);
    }

    /**
     * Store a newly created varietas and synchronize initial stock quantity
     */
    public function storeNewVarietas(Request $request)
    {
        // 1. Validasi Input sesuai kriteria database
        $request->validate([
            'nama_varietas' => 'required|string|max:255',
            'umur_bulan'    => 'required|integer|min:0',
            'deskripsi'     => 'nullable|string',
            'jumlah_stok'   => 'required|integer|min:0', // Input stok awal wajib diisi
        ]);

        // 2. Gunakan Database Transaction agar jika salah satu gagal, semua dibatalkan (Aman)
        DB::beginTransaction();

        try {
            // Simpan karakteristik botani ke tb_varietas_bibit
            $varietas = VarietasBibit::create([
                'nama_varietas' => $request->nama_varietas,
                'umur_bulan'    => $request->umur_bulan,
                'deskripsi'     => $request->deskripsi,
            ]);

            // Sinkronisasi awal kuantitas barang saat jenis varietas baru dirilis ke tb_stok_bibit
            StokBibit::create([
                'id_varietas' => $varietas->id_varietas,
                'jumlah_stok' => $request->jumlah_stok,
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Varietas baru dan stok awal berhasil dirilis!',
                'data'    => $varietas->load('stok')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan data varietas bibit',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $varietas = VarietasBibit::find($id);

        if (!$varietas) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan'], 404);
        }

        $request->validate([
            'nama_varietas' => 'required|string|max:255',
            'umur_bulan'    => 'required|integer|min:0',
            'deskripsi'     => 'nullable|string',
        ]);

        $varietas->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Karakteristik varietas berhasil diperbarui',
            'data'    => $varietas
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $varietas = VarietasBibit::find($id);

        if (!$varietas) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan'], 404);
        }

        // tb_stok_bibit akan otomatis terhapus karena 'onDelete_cascade' di migration
        $varietas->delete();

        return response()->json([
            'success' => true,
            'message' => 'Varietas bibit berhasil dihapus dari sistem'
        ], 200);
    }
}