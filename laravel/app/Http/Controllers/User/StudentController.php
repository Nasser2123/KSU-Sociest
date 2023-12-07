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

class StudentController extends Controller
{
    use HttpResponses ;

    public function index():JsonResponse
    {
        $students = Student::with('department')->orderBy('department_id')->get();
        if ($students->isEmpty()){
            return $this->error(null ,'There is no student in this ', 404);
        }
        return $this->success(StudentResource::collection($students) ,'All Student');
    }

    public function show(Department $department):JsonResponse
    {
        $students = Student::with('department')->where('department_id' , '=' , $department['id'])->get();
        if ($students->isEmpty()){
            return $this->error(null ,'There is no student in this '.$department->name , 404);
        }
        return $this->success(StudentResource::collection($students) ,'All Student belong to '. $department->name);
    }

    public function addSupervisor(User $user): JsonResponse
    {
        $student = $user->student()->get();
        if($student->isEmpty()){
            return $this->error(null ,'There is no student with this id', 404);
        }

        $old_supervisor = Supervisor::withTrashed()->find($user['id']);

        if(!(is_null($old_supervisor))){
            $old_supervisor->restore();
            $user->removeRole('Student');
            $user->assignRole("Supervisor");
            $user->student()->delete();
            return $this->success(new SupervisorResource($old_supervisor) ,"done");
        }

        $supervisor =Supervisor::create([
            'id' => $user['id'] ,
            'department_name' => $user['student']->department_name,
            'department_id' => $user['student']->department_id
        ]);
        $user->removeRole('Student');
        $user->assignRole("Supervisor");
        $user->student()->delete();

        return $this->success(new SupervisorResource($supervisor) ,"done");


    }
}
