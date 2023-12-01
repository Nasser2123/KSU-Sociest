<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Supervisor;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class SupervisorController extends Controller
{
    use HttpResponses;
    public function index(): JsonResponse
    {
        $supervisor = Supervisor::All();
        $supervisorId = $supervisor->pluck('id')->toArray();
        $supervisors = DB::table('users')
            ->whereIn('id', $supervisorId)
            ->get();
        return $this->success($supervisors ,'All supervisor');
    }

    public function removeSupervisor(User $user):JsonResponse
    {
        $supervisor = $user->supervisor()->get();
        $user->removeRole('Supervisor');

        $student = Student::withTrashed()->find($user['id']);
        $student->restore();
        $student->department_name = $supervisor[0]->department_name ;
        $student->department_id = $supervisor[0]->department_id ;
        $student->save();

        $user->assignRole("Student");
        $user->supervisor()->delete();
        return $this->success( $student,'All ');

    }


}
