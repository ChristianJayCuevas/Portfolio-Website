<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::get('/projects', function () {
    return Inertia::render('Projects');
})->name('projects');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

