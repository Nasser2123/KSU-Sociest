<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ResourceController;

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
        // for send email
        Route::post('forgot-password', 'sendResetLink')->name('email');

        // for change password
        Route::get('reset-password/{token}', 'resetPassword')->name('reset');
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
        Route::post('resource/{resource}', [ResourceController::class , 'approve']);
        Route::post('department/{department}/resource/{resource}', [ResourceController::class , 'reject']);
    });

    Route::apiResource('course/{course}/resource', ResourceController::class);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('user/{user}/change-password', [AuthController::class, 'changePassword']);
});



Route::apiResource('department', DepartmentController::class)->only('index', 'show');
Route::apiResource('department/{department}/course', CourseController::class)->only('index', 'show');
Route::get('courses', [CourseController::class , 'all']);

Route::get('department/{department}/resource', [ResourceController::class , 'all']);
