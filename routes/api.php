<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\V1\CompanyController;
use App\Http\Controllers\Api\V1\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function() {
    Route::post('login' , 'login');
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::group(['prefix' => 'v1'], function() {
        Route::apiResource('companies', CompanyController::class);
        Route::apiResource('employees', EmployeeController::class);
       
    });
});