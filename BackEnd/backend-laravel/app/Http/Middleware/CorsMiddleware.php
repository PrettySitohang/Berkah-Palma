<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    public function handle($request, Closure $next)
    {
        // Ganti dengan URL domain React kamu
        $allowedOrigin = 'http://localhost:5173'; 

        // Jika request berupa OPTIONS (Preflight), langsung beri respons sukses dengan header
        if ($request->isMethod('OPTIONS')) {
            return response('', 204)
                ->header('Access-Control-Allow-Origin', $allowedOrigin)
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
                ->header('Access-Control-Allow-Credentials', 'true');
        }

        // Untuk request biasa (GET, POST, dll), teruskan dan tempelkan headernya
        $response = $next($request);
        
        // Memastikan objek respons mendukung method header (mengatasi beberapa tipe respons Laravel)
        if (method_exists($response, 'header')) {
            $response->header('Access-Control-Allow-Origin', $allowedOrigin)
                     ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                     ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
                     ->header('Access-Control-Allow-Credentials', 'true');
        }

        return $response;
    }
}
