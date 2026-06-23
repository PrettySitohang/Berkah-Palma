<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StokBibit extends Model
{
    use HasFactory;

    protected $table = 'tb_stok_bibit';
    protected $primaryKey = 'id_stok';

    protected $fillable = [
        'id_varietas',
        'jumlah_stok'
    ];

    public function varietas()
    {
        return $this->belongsTo(VarietasBibit::class, 'id_varietas', 'id_varietas');
    }
}