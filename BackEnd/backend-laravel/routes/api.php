<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\StafController;

use App\Http\Controllers\API\VarietasBibitController;
use App\Http\Controllers\API\ManajemenBibitController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\Api\PenjualanController;

Route::post('/login', [AuthController::class, 'login']);

Route::get('/varietas-bibit', [VarietasBibitController::class, 'index']);

Route::get('/bibit', [ManajemenBibitController::class, 'index']);
Route::post('/bibit', [ManajemenBibitController::class, 'storeNewVarietas']);
Route::put('/bibit/{id}', [ManajemenBibitController::class, 'update']);
Route::delete('/bibit/{id}', [ManajemenBibitController::class, 'destroy']);
Route::post('/bibit/tambah-stok', [ManajemenBibitController::class, 'tambahStokFisik']);

Route::get('/staf', [StafController::class, 'index']);
Route::post('/staf', [StafController::class, 'store']);
Route::patch('/staf/toggle/{id}', [StafController::class, 'toggleStatus']);
Route::delete('/staf/{id}', [StafController::class, 'destroy']);

Route::get('/dashboard', [DashboardController::class, 'index']);

Route::get('/penjualan', [PenjualanController::class, 'index']);
Route::put('/penjualan/{id}/status', [PenjualanController::class, 'updateStatus']);

Route::middleware('auth:web')->group(function () {

    Route::get('/profile', [StafController::class, 'getProfile']);

    Route::post('/logout', [AuthController::class, 'logout']);

});