<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php', 
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // 1. Mengaktifkan Session, Cookie, dan Sanctum untuk API
        $middleware->statefulApi();

        // 2. Memaksa middleware Session agar benar-benar masuk ke rute API
        $middleware->api(append: [
            \Illuminate\Session\Middleware\StartSession::class,
        ]);

        // 3. Mengecualikan pengecekan CSRF untuk rute API
        $middleware->validateCsrfTokens(except: [
            'api/*', 
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();