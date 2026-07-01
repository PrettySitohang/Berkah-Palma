<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staf extends Model
{
    use HasFactory;

    protected $table = 'tb_staf';
    protected $primaryKey = 'id_staf';

    // Menentukan kolom mana saja yang boleh diisi massal
    protected $fillable = [
        'name',
        'nama_staf',
        'username',
        'email',
        'password',
        'initials',
        'color',
        'role',
        'status'
    ];
}