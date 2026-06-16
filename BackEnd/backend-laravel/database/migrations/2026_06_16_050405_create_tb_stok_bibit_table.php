<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_stok_bibit', function (Blueprint $table) {
            $table->id('id_stok'); // Primary Key (Auto Increment)
            $table->integer('jumlah_stok');

            // Foreign Key ke tabel varietas bibit
            $table->foreignId('id_varietas')->constrained('tb_varietas_bibit', 'id_varietas')->onDelete('cascade');

            $table->timestamps(); // update_at dari ERD sudah otomatis ter-cover di sini
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_stok_bibit');
    }
};
