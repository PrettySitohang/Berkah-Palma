<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StafSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('tb_staf')->insert([
            // 1 Data Admin Utama
            [
                'nama_staf'  => 'Yehezkiel',
                'username'   => 'yehezkiel_admin',
                'email'      => 'yehezkiel@berkahpalma.com',
                'password'   => Hash::make('passwordadmin123'),
                'role'       => 'Admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // 5 Data Karyawan
            [
                'nama_staf'  => 'Budi Santoso',
                'username'   => 'budi_karyawan',
                'email'      => 'budi@berkahpalma.com',
                'password'   => Hash::make('passwordkaryawan123'),
                'role'       => 'Karyawan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_staf'  => 'Siti Aminah',
                'username'   => 'siti_karyawan',
                'email'      => 'siti@berkahpalma.com',
                'password'   => Hash::make('passwordkaryawan123'),
                'role'       => 'Karyawan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_staf'  => 'Andi Wijaya',
                'username'   => 'andi_karyawan',
                'email'      => 'andi@berkahpalma.com',
                'password'   => Hash::make('passwordkaryawan123'),
                'role'       => 'Karyawan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_staf'  => 'Dewi Lestari',
                'username'   => 'dewi_karyawan',
                'email'      => 'dewi@berkahpalma.com',
                'password'   => Hash::make('passwordkaryawan123'),
                'role'       => 'Karyawan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_staf'  => 'Eko Prasetyo',
                'username'   => 'eko_karyawan',
                'email'      => 'eko@berkahpalma.com',
                'password'   => Hash::make('passwordkaryawan123'),
                'role'       => 'Karyawan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}