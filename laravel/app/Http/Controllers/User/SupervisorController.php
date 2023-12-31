<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\StudentResource;
use App\Http\Resources\SupervisorResource;
use App\Models\Department;
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
        $supervisors = Supervisor::with('department')->orderBy('department_id')->get();
        if ($supervisors->isEmpty()){
            return $this->error(null ,'There is no supervisor', 404);
        }
        return $this->success(SupervisorResource::collection($supervisors) ,'All supervisors');
    }

    public function show(Department $department): JsonResponse
    {
        $supervisors = Supervisor::with('department')->where('department_id' , '=' , $department['id'])->get();
        if ($supervisors->isEmpty()){
            return $this->error(null ,'There is no supervisor', 404);
        }
        return $this->success(SupervisorResource::collection($supervisors) ,'All supervisor belong to '.$department['name']);
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

            return $this->success(new StudentResource($old_student),'There is no supervisor ');

    }


}
