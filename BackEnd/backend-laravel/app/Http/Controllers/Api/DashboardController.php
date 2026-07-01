<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $totalStok = DB::table('tb_stok_bibit')->sum('jumlah_stok');

            // 2. Ambil rincian stok per varietas (Memperbaiki typo leftJoin kolom id_varietas)
            $rincianVarietas = DB::table('tb_varietas_bibit')
                ->leftJoin('tb_stok_bibit', 'tb_varietas_bibit.id_varietas', '=', 'tb_stok_bibit.id_varietas')
                ->select(
                    'tb_varietas_bibit.id_varietas',
                    'tb_varietas_bibit.nama_varietas',
                    'tb_varietas_bibit.umur_bulan',
                    DB::raw('IFNULL(tb_stok_bibit.jumlah_stok, 0) as stok')
                )
                ->get();

            // 3. Return response JSON ke React
            return response()->json([
                'success' => true,
                'message' => 'Data dashboard berhasil diambil.',
                'data' => [
                    'total_stok' => (int) $totalStok,
                    'rincian_varietas' => $rincianVarietas
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data dashboard.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}