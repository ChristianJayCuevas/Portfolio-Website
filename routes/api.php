<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// API Routes
Route::middleware('api')->group(function () {
    Route::get('/excel-data', [App\Http\Controllers\MsGraphController::class, 'getUsedRange']);
});