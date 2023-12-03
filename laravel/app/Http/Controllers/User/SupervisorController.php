<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\StudentResource;
use App\Http\Resources\SupervisorResource;
use App\Models\Student;
use App\Models\Supervisor;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;

class SupervisorController extends Controller
{
    use HttpResponses;
    public function index(): JsonResponse
    {
        $supervisors = Supervisor::with('department')->get();
        if ($supervisors->isEmpty()){
            return $this->error(null ,'There is no student in this ', 404);
        }
        return $this->success(SupervisorResource::collection($supervisors) ,'All supervisor belong to ');
    }

    public function removeSupervisor(User $user):JsonResponse
    {
        $supervisor = $user->supervisor()->get();
        if($supervisor->isEmpty()){
            return $this->error(null ,'There is no supervisor', 404);
        }


        $old_student = Student::withTrashed()->find($user['id']);
        $old_student->restore();
            $user->removeRole('Supervisor');
            $user->assignRole("Student");
            $user->supervisor()->delete();

            return $this->success(new StudentResource($old_student),'All ');

    }


}
