<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; 
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; 

class Staf extends Authenticatable 
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'tb_staf';
    protected $primaryKey = 'id_staf';

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

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }
}