<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PenjualanController extends Controller
{
    public function index(Request $request)
    {
        try {
            // 1. Ambil parameter dari query string frontend
            $status = $request->query('status'); // Contoh: Pending, Diproses, Selesai, Batal
            $search = $request->query('search'); // Contoh: nama pelanggan atau ID
            $perPage = $request->query('per_page', 10); // Default 10 data per halaman

            // 2. Bangun Query Builder dengan JOIN ke tabel detail dan varietas bibit
            $query = DB::table('tb_penjualan') 
                ->join('tb_detail_penjualan', 'tb_penjualan.id_penjualan', '=', 'tb_detail_penjualan.id_penjualan')
                ->join('tb_varietas_bibit', 'tb_detail_penjualan.id_varietas', '=', 'tb_varietas_bibit.id_varietas') 
                ->select(
                    'tb_penjualan.id_penjualan',
                    'tb_penjualan.tanggal_transaksi',
                    'tb_penjualan.nama_pelanggan',
                    'tb_penjualan.no_hp',
                    'tb_penjualan.jenis_pembelian',
                    'tb_penjualan.status',
                    'tb_detail_penjualan.jumlah as jumlah_item',
                    'tb_varietas_bibit.nama_varietas'
                )
                ->orderBy('tb_penjualan.created_at', 'desc');

            // 3. Kondisional Filter Status (Server-Side)
            if (!empty($status)) {
                $query->where('tb_penjualan.status', $status);
            }

            // 4. Kondisional Filter Search (Server-Side)
            if (!empty($search)) {
                $query->where(function ($q) use ($search) {
                    $q->where('tb_penjualan.nama_pelanggan', 'like', '%' . $search . '%')
                      ->orWhere('tb_penjualan.id_penjualan', 'like', '%' . $search . '%');
                });
            }

            // 5. Eksekusi menggunakan Paginate bawaan Laravel
            $paginatedData = $query->paginate($perPage);

            // 6. Kembalikan response terstruktur beserta metadata pagination
            return response()->json([
                'success' => true,
                'message' => 'Data penjualan berhasil difilter dan dimuat',
                'data' => $paginatedData->items(), // Mengambil array datanya saja
                'pagination' => [
                    'current_page' => $paginatedData->currentPage(),
                    'last_page'    => $paginatedData->lastPage(),
                    'per_page'     => $paginatedData->perPage(),
                    'total'        => $paginatedData->total(),
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data penjualan: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        try {
            $status = $request->input('status');

            if (empty($status)) {
                return response()->json(["success" => false, "message" => "Missing status value"], 422);
            }

            $updated = DB::table('tb_penjualan')
                ->where('id_penjualan', $id)
                ->update(['status' => $status]);

            if (!$updated) {
                return response()->json(["success" => false, "message" => "Invoice not found or status unchanged"], 404);
            }

            $penjualan = DB::table('tb_penjualan')->where('id_penjualan', $id)->first();

            return response()->json(["success" => true, "message" => "Status updated", "data" => $penjualan], 200);
        } catch (\Exception $e) {
            return response()->json(["success" => false, "message" => "Failed to update status: " . $e->getMessage()], 500);
        }
    }
}