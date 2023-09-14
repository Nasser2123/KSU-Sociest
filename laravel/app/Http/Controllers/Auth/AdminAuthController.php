<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminLoginRequest;
use App\Http\Requests\AdminRegisterRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\SendResetLinkRequest;
use App\Models\Admin;
use App\Services\AdminService;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;



class AdminAuthController extends Controller
{
    use HttpResponses ;

    public function register(AdminRegisterRequest $request, AdminService $adminService): JsonResponse
    {
        return $adminService->create($request);
    }

    public function login(AdminLoginRequest $request , AdminService $adminService):JsonResponse
    {
        return $adminService->check($request);

    }
    public function logout():JsonResponse
    {
        Auth::user()->currentAccessToken()->delete();
        return $this->success(null, 'Logout successfully');
    }

    public function changePassword(ChangePasswordRequest $request , Admin $admin  ,AdminService $adminService):JsonResponse
    {
        return $adminService->change($request ,$admin);
    }

    public function sendResetLink(SendResetLinkRequest $request , AdminService $adminService):JsonResponse
    {
        return $adminService->sendLink($request);
    }

    public function resetPassword(ResetPasswordRequest $request , AdminService $adminService):JsonResponse
    {
        return $adminService->resetPassword($request);
    }

}




