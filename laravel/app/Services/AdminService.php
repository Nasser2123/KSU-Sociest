<?php
namespace App\Services;

use App\Http\Resources\AdminResource;
use App\Models\Admin;
use App\Traits\HttpResponses;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class AdminService
{
    use HttpResponses;
    public function create($request):JsonResponse
    {
        $admin = Admin::create($request->all());
        event(new Registered($admin));
        return $this->success(new AdminResource($admin), 'Sign Up successfully');
    }

    public function check($request):JsonResponse
    {
        $admin = Admin::where('email', $request['email'])->first();
        if(Hash::check($request->password, $admin->password)) {
            if (is_null($admin->email_verified_at)) {
                $admin->sendEmailVerificationNotification();
                return $this->error(new AdminResource($admin), 'Please verify your email', 401);
            }
            return $this->success([
                'user' => new AdminResource($admin),
                'token' => $admin->createToken('admin')->plainTextToken,
            ] , 'Welcome to KSU Society');
        }else{
            return $this->error(null, 'The email or password you typed is incorrect. Please try again', 403);
        }
    }

    public function change($request , $admin):JsonResponse
    {
        if (Auth::id() !== $admin['id']) {
            return $this->error(null, 'You do not have authority to change', 403);
        }
        $admin->update(['password' => ($request['password'])]);
        return $this->success(new AdminResource($admin), 'We change your password successful');

    }

    public function sendLink($request):JsonResponse
    {
        $status = Password::sendResetLink($request->only('email'));
        if($status === Password::RESET_LINK_SENT){
            return $this->success($status, 'We send a link to reset your password successful');
        }else{
            return $this->error($status, 'Filed to send a link to your email', 403);
        }
    }

    public function resetPassword($request):JsonResponse
    {
        $status = Password::reset($request->only('email', 'password', 'password_confirmation', 'token'),
            function (Admin $admin, string $password) {
                $admin->forceFill([
                    'password' => $password,
                ])->setRememberToken(value: Str::random(60));

                $admin->save();

                event(new PasswordReset($admin));
            }
        );
        if($status === Password::PASSWORD_RESET){
            return $this->success($status, 'We reset your password successful');
        }else{
            return $this->error($status, 'Filed to reset your password', 404);
        }
    }
}
