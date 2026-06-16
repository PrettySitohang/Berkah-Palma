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
        Schema::create('tb_penjualan', function (Blueprint $table) {
            $table->id('id_penjualan'); // Primary Key (Auto Increment)
            $table->date('tanggal_transaksi'); // Di ERD: tsnggslz-transaksi (typo diganti tanggal)
            $table->string('nama_pelangan');   // Sesuai ERD (nama_pelangan)
            $table->string('no_p');            // Nomor telepon/HP pelanggan
            $table->string('jenis_pembelian');
            $table->string('status');
            $table->text('alamat');

            // Foreign Key staf yang memproses penjualan ini
            $table->foreignId('id_staf')->constrained('tb_staf', 'id_staf')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_penjualan');
    }
};
