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
        // Primary Key berupa kode nota VARCHAR(20)
        $table->string('id_penjualan', 20)->primary(); 
        
        $table->date('tanggal_transaksi'); 
        $table->string('nama_pelanggan'); // Disinkronkan agar tidak typo
        $table->string('no_hp');          // Disinkronkan dengan UI React
        
        // Menggunakan tipe data ENUM sesuai dokumen rancangan
        $table->enum('jenis_pembelian', ['Online', 'Offline']);
        $table->enum('status', ['Pending', 'Diproses', 'Selesai', 'Batal']);
        
        $table->text('alamat');

        // Foreign Key ke staf pemroses
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
