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
        Schema::create('tb_varietas_bibit', function (Blueprint $table) {
            $table->id('id_varietas'); // Primary Key (Auto Increment)
            $table->string('nama_varietas');
            $table->integer('umur_bulan');
            $table->text('deskripsi')->nullable(); // Pakai text karena deskripsi biasanya panjang
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_varietas_bibit');
    }
};
