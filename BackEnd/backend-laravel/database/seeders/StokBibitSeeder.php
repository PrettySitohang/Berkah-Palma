<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StokBibitSeeder extends Seeder
{
    public function run(): void
    {
        $stok = [
            [
                'id_varietas' => 1, // SAIN-1 Calabar
                'jumlah_stok' => 1500,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'id_varietas' => 2, // SAIN-2 Ekona
                'jumlah_stok' => 1200,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'id_varietas' => 3, // Dami Mas
                'jumlah_stok' => 2500,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'id_varietas' => 4, // Topaz 3 seri 4
                'jumlah_stok' => 1800,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ];

        // Memasukkan data ke tabel tb_stok_bibit
        DB::table('tb_stok_bibit')->insert($stok);
    }
}