<?php

use App\Http\Controllers\ProfileController;
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
}
)->name('qubedashboard');

// Route::get('/projects', function () {
//     return Inertia::render('Projects');
// })->name('projects');

// Route::get('/contact', function () {
//     return Inertia::render('Contact');
// })->name('contact');

