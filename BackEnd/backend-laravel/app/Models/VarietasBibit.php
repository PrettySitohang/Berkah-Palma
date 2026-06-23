<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VarietasBibit extends Model
{
    use HasFactory;

    protected $table = 'tb_varietas_bibit';
    protected $primaryKey = 'id_varietas';
    
    protected $fillable = [
        'nama_varietas',
        'umur_bulan',
        'deskripsi'
    ];

    // Relasi ke Stok Bibit (Satu varietas punya satu baris catatan stok)
    public function stok()
    {
        return $this->hasOne(StokBibit::class, 'id_varietas', 'id_varietas');
    }
}