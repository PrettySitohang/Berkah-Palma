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
     * Menampilkan daftar varietas beserta stoknya (Untuk Dropdown di React)
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
     * Menambahkan jumlah stok fisik untuk varietas yang sudah terdaftar
     */
    public function tambahStokFisik(Request $request)
    {
        // 1. Validasi input: pastikan id_varietas terdaftar dan jumlah_stok minimal 1
        $request->validate([
            'id_varietas' => 'required|exists:tb_varietas_bibit,id_varietas',
            'jumlah_stok' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();

        try {
            // 2. Cari data stok berdasarkan id_varietas di tabel tb_stok_bibit
            $stokBibit = StokBibit::where('id_varietas', $request->id_varietas)->first();

            if ($stokBibit) {
                // Jika data stok sudah ada, tambahkan jumlahnya dengan increment
                $stokBibit->increment('jumlah_stok', $request->jumlah_stok);
            } else {
                // Antisipasi jika varietas ada tetapi baris stok belum dibuat
                StokBibit::create([
                    'id_varietas' => $request->id_varietas,
                    'jumlah_stok' => $request->jumlah_stok,
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Stok fisik bibit berhasil ditambahkan ke dalam sistem!',
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui stok di database.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Membuat jenis varietas baru dari nol
     */
    public function storeNewVarietas(Request $request)
    {
        $request->validate([
            'nama_varietas' => 'required|string|max:255',
            'umur_bulan'    => 'required|integer|min:0',
            'deskripsi'     => 'nullable|string',
            'jumlah_stok'   => 'required|integer|min:0',
        ]);

        DB::beginTransaction();

        try {
            $varietas = VarietasBibit::create([
                'nama_varietas' => $request->nama_varietas,
                'umur_bulan'    => $request->umur_bulan,
                'deskripsi'     => $request->deskripsi,
            ]);

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
     * Memperbarui karakteristik data varietas
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
     * Menghapus varietas bibit beserta relasi stoknya
     */
    public function destroy($id)
    {
        $varietas = VarietasBibit::find($id);

        if (!$varietas) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan'], 404);
        }

        $varietas->delete();

        return response()->json([
            'success' => true,
            'message' => 'Varietas bibit berhasil dihapus dari sistem'
        ], 200);
    }
}