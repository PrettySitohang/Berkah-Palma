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
        Schema::create('tb_detail_penjualan', function (Blueprint $table) {
            $table->id('id_detail'); // Primary Key (Auto Increment) dari relasi memuat
            $table->integer('jumlah');

            $table->string('id_penjualan', 20);

            // Menghubungkan ke Penjualan dan Varietas
           $table->foreign('id_penjualan')
              ->references('id_penjualan')
              ->on('tb_penjualan')
              ->onDelete('cascade');
            $table->foreignId('id_varietas')->constrained('tb_varietas_bibit', 'id_varietas')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_detail_penjualan');
    }
};
