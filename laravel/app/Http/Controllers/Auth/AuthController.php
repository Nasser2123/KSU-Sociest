<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\SendResetLinkRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{

    public function register(RegisterRequest $request, UserService $userService): JsonResponse
    {
        return $userService->create($request);
    }

    public function login(LoginRequest $request , UserService $userService):JsonResponse
    {
        return $userService->check($request);

    }
    public function logout():JsonResponse
    {
        Auth::user()->currentAccessToken()->delete();
        return $this->success(null, 'Logout successfully');
    }

    public function changePassword(ChangePasswordRequest $request , User $user ,UserService $userService):JsonResponse
    {
        return $userService->change($request ,$user);
    }

    public function sendResetLink(SendResetLinkRequest $request , UserService $userService):JsonResponse
    {
        return $userService->sendLink($request);
    }

    public function resetPassword(ResetPasswordRequest $request , UserService $userService):JsonResponse
    {
        return $userService->resetPassword($request);
    }

}




