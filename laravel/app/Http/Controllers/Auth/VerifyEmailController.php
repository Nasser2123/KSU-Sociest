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
            return request()->wantsJson() ? new JsonResponse('', 204) : redirect()->away('http://127.0.0.1:8000/');
        }
        return request()->wantsJson() ? new JsonResponse('', 204) : redirect()->away('http://127.0.0.1:8000/');
    }

    public function resend():JsonResponse
    {
        request()->user()->sendEmailVerificationNotification();
        return $this->success(null , 'We send email to you again' );
    }
}
