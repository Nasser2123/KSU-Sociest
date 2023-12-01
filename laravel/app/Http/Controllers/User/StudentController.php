<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddSupervisorRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use App\Models\Supervisor;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    use HttpResponses ;

    public function index():JsonResponse
    {
        $students = Student::All();
        $studentsId = $students->pluck('id')->toArray();
        $users = DB::table('users')
            ->whereIn('id', $studentsId)
            ->get();

        return $this->success(($users) ,'All Student');
    }

    public function update(User $user ,UpdateStudentRequest $request): JsonResponse
    {
        $student = Student::find($user['id']);
        $student->department_name = $request['department_name'];
        $student->department_id = $request['department_id'];
        $student->save();
        return $this->success( StudentResource::collection($student->user()->get()),'The student has updated');
    }

    public function addSupervisor(User $user ,AddSupervisorRequest $request): JsonResponse
    {
        $roles = $user->removeRole('Student');
        $supervisor =Supervisor::create([
            'id' => $roles['id'] ,
            'department_name' => $request['department_name'],
            'department_id' => $request['department_id']
        ]);

        $user->assignRole("Supervisor");
        $user->student()->delete();

        return $this->success($supervisor ,'All ');

    }
}
