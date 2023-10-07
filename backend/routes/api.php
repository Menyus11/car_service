<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [UserController::class, 'register']);

Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->get('/logout', [UserController::class, 'logout']); 

Route::middleware('auth:sanctum')->post('/profileupdate', [UserController::class, 'profileupdate']);

Route::middleware('auth:sanctum')->post('/newcar', [VehicleController::class, 'newcar']);

Route::middleware('auth:sanctum')->get('/getcars', [VehicleController::class, 'getcars']);

Route::middleware('auth:sanctum')->post('/deletecar', [VehicleController::class, 'deletecar']);

Route::middleware('auth:sanctum')->post('/selectcar', [VehicleController::class, 'selectcar']);

Route::middleware('auth:sanctum')->post('/updatecar', [VehicleController::class, 'updatecar']);

Route::middleware('auth:sanctum')->post('/newtask', [TaskController::class, 'newtask']);



