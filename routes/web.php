<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MsGraphController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::get('/pokemon', function () {
    return Inertia::render('PokemonHome');
})->name('pokemon');

Route::get('/pokemon/{id}', function ($id) {
    // Pass the Pokemon ID to the Vue page as a prop
    return Inertia::render('PokemonPage', [
        'pokemonId' => $id  // Pass the ID as a prop
    ]);
})->name('pokemon.page');

Route::get('/qubedashboard', function() {
    return Inertia::render('QubeDashboard');
})->name('qubedashboard');

// Microsoft Graph routes
Route::get('/qubedashboard/login', [MsGraphController::class, 'redirectToMicrosoft']);
Route::get('/msgraph/callback', [MsGraphController::class, 'handleCallback']);
Route::get('/api/excel-data', [MsGraphController::class, 'getUsedRange']);

// Route for Excel data API removed as it's already defined in api.php
// Route::get('/api/excel-data', [MsGraphController::class, 'getUsedRange']);

// Route::get('/projects', function () {
//     return Inertia::render('Projects');
// })->name('projects');

// Route::get('/contact', function () {
//     return Inertia::render('Contact');
// })->name('contact');

