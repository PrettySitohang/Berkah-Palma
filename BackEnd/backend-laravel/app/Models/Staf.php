<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staf extends Model
{
    use HasFactory;

    // Menentukan kolom mana saja yang boleh diisi massal
    protected $fillable = [
        'name',
        'username',
        'initials',
        'color',
        'role',
        'status'
    ];
}