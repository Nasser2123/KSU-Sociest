<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\CourseController;

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

Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');

    Route::group(['as' => 'password.', 'middleware' => 'guest'], function () {
        Route::post('forgot-password', 'sendResetLink')->name('email');
        Route::post('reset-password', 'resetPassword')->name('reset');
    });
});
Route::controller(VerifyEmailController::class)->group(function () {
    Route::group(['as' => 'verification.', 'prefix' => 'email'], function () {

        Route::get('/verify/{id}/{hash}', 'verify')
            ->middleware(['signed'])->name('verify');
        Route::post('/verification-notification', 'resend')
            ->name('send');
    });
});

//------------------------------------------------------------------------------------------------------------
Route::group(['middleware' => 'auth:sanctum', 'verified'], function () {

    Route::group(['middleware' => 'role:Admin'], function () {
        Route::apiResource('department', DepartmentController::class)->only('destroy', 'update', 'store');
    });

    Route::group(['middleware' => 'role:Supervisor'], function () {
        Route::apiResource('department/{department}/course', CourseController::class)->only('destroy', 'update', 'store');
    });


    Route::apiResource('department/{department}/course', CourseController::class)->only('index', 'show');
    Route::apiResource('department', DepartmentController::class)->only('index', 'show');
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('user/{user}/change-password', [AuthController::class, 'changePassword']);
});

