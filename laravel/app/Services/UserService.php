<?php
namespace App\Services;

use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\SendResetLinkRequest;
use App\Http\Resources\UserResource;
use App\Models\Student;
use App\Models\Supervisor;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

class  UserService
{
    use HttpResponses;
    public function create($request):JsonResponse
    {
        $user = User::create($request->all());
        event(new Registered($user));
        $user->assignRole('Student');
        Student::create(array_merge($request->all(), ['id' => $user->id]));
//        $user->assignRole('Supervisor');
//        Supervisor::create(['id' => $user->id ,'department' =>'IS' , 'department_id' => 2]);

        return $this->success(new UserResource($user) , 'Please verify your email');
    }

    public function check($request):JsonResponse
    {
        $validated = $request->validated();
        $user = User::with(['student', 'admin', 'supervisor'])->firstWhere('email', $request['email']);
        if (Auth::guard('web')->once($validated)) {
            if (is_null($user->email_verified_at)) {
                $user->sendEmailVerificationNotification();
                return $this->error(null, 'Please verify your email', 401);
            }
            return $this->success([
                'user' => new UserResource($user),
                'token' => $user->createToken($user->email)->plainTextToken,
            ] , 'Welcome to KSU Society');
        }else{
            return $this->error(null, 'The email or password you typed is incorrect. Please try again', 403);
        }
    }

    public function change($request , $user):JsonResponse
    {
        if (Auth::id() !== $user['id']) {
            return $this->error(null, 'You do not have authority to change', 403);
        }
        $user->update(['password' => ($request['password'])]);
        return $this->success(new UserResource($user), 'We change your password successful');

    }

    public function sendLink(SendResetLinkRequest $request):JsonResponse
    {
        $status = Password::sendResetLink($request->all());
        if($status === Password::RESET_LINK_SENT){
            return $this->success($status, 'We send a link to reset your password successful');
        }else{
            return $this->error($status, 'Filed to send a link to your email', 403);
        }
    }

    public function resetPassword(ResetPasswordRequest $request):JsonResponse
    {
        $status = Password::reset($request->all(),
            function (User $user, string $password) {
                $user->update(['password' => $password , 'remember_token' => null]);
                event(new PasswordReset($user));
            }
        );
        if($status === Password::PASSWORD_RESET){
            return $this->success($status, 'We reset your password successful');
        }else{
            return $this->error($status, 'Filed to reset your password', 404);
        }
    }
}
