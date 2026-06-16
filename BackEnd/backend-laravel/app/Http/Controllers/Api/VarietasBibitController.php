<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\VarietasBibit;

class VarietasBibitController extends Controller
{
    public function index()
    {
        return VarietasBibit::all();
    }
}
