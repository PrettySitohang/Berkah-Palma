<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class MutasiSeeder extends Seeder
{
    public function run(): void
    {
        $mutasiAfkir = [
            [
                'jumlah_afkir'  => 12,
                'keterangan'    => 'Bibit terserang penyakit busuk pupus (Chrysonilia)',
                'tanggal_afkir' => '2026-06-10',
                'id_varietas'   => 1, // SAIN-1 Calabar
                'id_staf'       => 1,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'jumlah_afkir'  => 8,
                'keterangan'    => 'Bibit kerdil (stunted) tidak memenuhi standar kualitas',
                'tanggal_afkir' => '2026-06-15',
                'id_varietas'   => 2, // SAIN-2 Ekona
                'id_staf'       => 2,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'jumlah_afkir'  => 25,
                'keterangan'    => 'Kerusakan akibat serangan hama tikus/babi hutan',
                'tanggal_afkir' => '2026-06-18',
                'id_varietas'   => 3, // Dami Mas
                'id_staf'       => 1,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'jumlah_afkir'  => 5,
                'keterangan'    => 'Daun menguning terkena penyakit hawar daun (Curvularia)',
                'tanggal_afkir' => '2026-06-25',
                'id_varietas'   => 4, // Topaz 3 seri 4
                'id_staf'       => 3,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
        ];

        // Memasukkan data ke tabel tb_mutasi
        DB::table('tb_mutasi')->insert($mutasiAfkir);
    }
}