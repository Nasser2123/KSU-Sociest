<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
class VerifyEmailController extends Controller
{
    public function verify($id)
    {
        $user = User::findOrFail($id);
        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            event(new Verified($user));
            return request()->wantsJson() ? new JsonResponse($user->email, 204) : redirect()->away('http://localhost:4200/login');
        }
        return request()->wantsJson() ? new JsonResponse($user->email, 204) : redirect()->away('http://localhost:4200/login');
    }

    public function resend():JsonResponse
    {
        request()->user()->sendEmailVerificationNotification();
        return $this->success(null , 'We send email to you again' );
    }
}
