<?php

use App\Http\Controllers\DemographicController;
use App\Http\Controllers\DemographicExportController;
use App\Http\Controllers\DemographicImportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Demographics routes
    Route::resource('demographics', DemographicController::class);
    Route::get('demographics-import', [DemographicImportController::class, 'create'])->name('demographics.import-form');
    Route::post('demographics-import', [DemographicImportController::class, 'store'])->name('demographics.import');
    Route::get('demographics-export', DemographicExportController::class)->name('demographics.export');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
