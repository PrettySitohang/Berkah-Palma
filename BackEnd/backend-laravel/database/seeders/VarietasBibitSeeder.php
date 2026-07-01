<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VarietasBibitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Memasukkan data master varietas bibit sawit ke tb_varietas_bibit
        // Menggunakan array agar kita bisa mengambil ID-nya untuk mengisi stok awal
        $varietas = [
            [
                'nama_varietas' => 'SAIN-1 Calabar',
                'umur_bulan'    => 3,
                'deskripsi'     => 'Varietas unggul dengan pertumbuhan meninggi yang lambat dan potensi rendemen minyak yang sangat tinggi.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'nama_varietas' => 'DxP PPKS 540',
                'umur_bulan'    => 6,
                'deskripsi'     => 'Produksi tandan buah segar (TBS) tinggi dengan adaptasi lingkungan yang sangat baik di berbagai jenis lahan.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'nama_varietas' => 'SP-1 (Sriwijaya 1)',
                'umur_bulan'    => 9,
                'deskripsi'     => 'Memiliki keunggulan pada rerata berat tandan yang besar dan tahan terhadap cekaman kekeringan.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'nama_varietas' => 'DxP Yangambi',
                'umur_bulan'    => 12,
                'deskripsi'     => 'Terkenal dengan kualitas minyak saringan (CPO) yang jernih dan persentase daging buah (mesokarp) yang tebal.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
        ];

        foreach ($varietas as $v) {
            // Ambil ID yang baru saja dimasukkan (id_varietas)
            $idVarietas = DB::table('tb_varietas_bibit')->insertGetId([
                'nama_varietas' => $v['nama_varietas'],
                'umur_bulan'    => $v['umur_bulan'],
                'deskripsi'     => $v['deskripsi'],
                'created_at'    => $v['created_at'],
                'updated_at'    => $v['updated_at'],
            ]);

            // 2. Otomatis mendaftarkan stok awal (0 batang) di tb_stok_bibit untuk tiap varietas
            DB::table('tb_stok_bibit')->insert([
                'id_varietas' => $idVarietas,
                'jumlah_stok' => 0, // Default 0, nanti ditambahkan oleh karyawan lewat form React
                'created_at'  => now(),
                'updated_at'  => now(),
            ]);
        }
    }
}