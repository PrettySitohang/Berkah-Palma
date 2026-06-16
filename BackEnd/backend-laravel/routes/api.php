// routes/api.php
<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VarietasBibitController;


Route::get('/varietas-bibit', [VarietasBibitController::class, 'index']);