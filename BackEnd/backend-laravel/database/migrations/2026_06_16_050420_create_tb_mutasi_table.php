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
        Schema::create('tb_mutasi', function (Blueprint $table) {
            $table->id('id_afkir'); // Primary Key (Auto Increment) sesuai ERD
            $table->integer('jumlah_afkir');
            $table->string('keterangan')->nullable(); // Ditambah nullable kalau keterangannya kosong
            $table->date('tanggal_afkir');

            // Foreign Keys jembatan relasi memutasi
            $table->foreignId('id_varietas')->constrained('tb_varietas_bibit', 'id_varietas')->onDelete('cascade');
            $table->foreignId('id_staf')->constrained('tb_staf', 'id_staf')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_mutasi');
    }
};
