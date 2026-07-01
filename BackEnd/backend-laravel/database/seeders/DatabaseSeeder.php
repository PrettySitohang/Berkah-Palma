<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            StafSeeder::class,
            VarietasBibitSeeder::class, 
            
            PenjualanSeeder::class,      
            DetailPenjualanSeeder::class, 
        ]);
    }
}