<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Auth\Events\Verified;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;

class AdminVerifyEmailController extends Controller
{
    use HttpResponses;
    public function verify($id)
    {
        $admin = Admin::findOrFail($id);
        if (!$admin->hasVerifiedEmail()) {
            $admin->markEmailAsVerified();
            event(new Verified($admin));
            return request()->wantsJson() ? new JsonResponse('', 204) : redirect()->away('http://localhost:4200/');
        }
        return request()->wantsJson()? new JsonResponse('', 204): redirect()->away('http://localhost:4200/');

    }

    public function resend():JsonResponse
    {
        request()->user()->sendEmailVerificationNotification();
        return $this->success(null , 'We send email to you again' );
    }
}
