<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DetailPenjualanSeeder extends Seeder
{
    public function run(): void
    {
        $detailPenjualan = [
    ['INV-001', 1, 150],
    ['INV-002', 2, 80],
    ['INV-003', 3, 1000],
    ['INV-004', 1, 50],
    ['INV-005', 2, 220],
    ['INV-006', 3, 350],
    ['INV-007', 1, 400],
    ['INV-008', 2, 120],
    ['INV-009', 3, 90],
    ['INV-010', 1, 300],
    ['INV-011', 2, 175],
    ['INV-012', 3, 250],
    ['INV-013', 1, 500],
    ['INV-014', 2, 85],
    ['INV-015', 3, 600],
    ['INV-016', 1, 140],
    ['INV-017', 2, 210],
    ['INV-018', 3, 450],
    ['INV-019', 1, 320],
    ['INV-020', 2, 110],
    ['INV-021', 3, 180],
    ['INV-022', 1, 95],
    ['INV-023', 2, 270],
    ['INV-024', 3, 130],
    ['INV-025', 1, 500],
    ['INV-026', 2, 350],
    ['INV-027', 3, 120],
    ['INV-028', 1, 800],
    ['INV-029', 2, 150],
    ['INV-030', 3, 240],
    ['INV-031', 1, 310],
    ['INV-032', 2, 420],
    ['INV-033', 3, 95],
    ['INV-034', 1, 1100],
    ['INV-035', 2, 130],
    ['INV-036', 3, 1500],
    ['INV-037', 1, 200],
    ['INV-038', 2, 340],
    ['INV-039', 3, 160],
    ['INV-040', 1, 2500],
    ['INV-041', 2, 180],
    ['INV-042', 3, 3000],
    ['INV-043', 1, 410],
    ['INV-044', 2, 5000],
    ['INV-045', 3, 230],
    ['INV-046', 1, 650],
    ['INV-047', 2, 140],
    ['INV-048', 3, 720],
    ['INV-049', 1, 290],
    ['INV-050', 2, 520],
    ['INV-051', 3, 380],
    ['INV-052', 1, 110],
    ['INV-053', 2, 460],
    ['INV-054', 3, 190],
    ['INV-055', 1, 850],
    ['INV-056', 2, 240],
    ['INV-057', 3, 1350],
    ['INV-058', 1, 340],
    ['INV-059', 2, 400],
    ['INV-060', 3, 150],
    ['INV-061', 1, 980],
    ['INV-062', 2, 210],
    ['INV-063', 3, 2100],
    ['INV-064', 1, 560],
    ['INV-065', 2, 1250],
    ['INV-066', 3, 620],
    ['INV-067', 1, 130],
    ['INV-068', 2, 430],
    ['INV-069', 3, 4000],
    ['INV-070', 1, 710],
    ['INV-071', 2, 380],
    ['INV-072', 3, 170],
    ['INV-073', 1, 540],
    ['INV-074', 2, 290],
    ['INV-075', 3, 1150],
    ['INV-076', 1, 260],
    ['INV-077', 2, 880],
    ['INV-078', 3, 920],
    ['INV-079', 1, 640],
    ['INV-080', 2, 480],
    ['INV-081', 3, 310],
    ['INV-082', 1, 430],
    ['INV-083', 2, 200],
    ['INV-084', 3, 160],
    ['INV-085', 1, 770],
    ['INV-086', 2, 1400],
    ['INV-087', 3, 350],
    ['INV-088', 1, 2200],
    ['INV-089', 2, 580],
    ['INV-090', 3, 270],
    ['INV-091', 1, 1100],
    ['INV-092', 2, 490],
    ['INV-093', 3, 1600],
    ['INV-094', 1, 140],
    ['INV-095', 2, 1950],
    ['INV-096', 3, 330],
    ['INV-097', 1, 420],
    ['INV-098', 2, 280],
    ['INV-099', 3, 850],
    ['INV-100', 1, 600]
];

foreach ($detailPenjualan as $data) {
    DB::table('tb_detail_penjualan')->insert([
        'id_penjualan' => $data[0],
        'id_varietas'  => $data[1],
        'jumlah'       => $data[2],
        'created_at'   => now(),
        'updated_at'   => now(),
    ]);
}foreach ($detailPenjualan as $data) {
            DB::table('tb_detail_penjualan')->insert([
                'id_penjualan' => $data[0], // Mengikat kode Invoice string
                'id_varietas'  => $data[1], // ID Varietas statis (1, 2, atau 3)
                'jumlah'       => $data[2], // Qty jumlah pokok
                'created_at'   => now(),
                'updated_at'   => now(),
            ]);
        }
    }
}