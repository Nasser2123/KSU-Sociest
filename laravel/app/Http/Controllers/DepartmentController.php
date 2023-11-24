<?php

namespace App\Http\Controllers;

use App\Helpers\UserRole;
use App\Http\Requests\Department\DepartmentRequest;
use App\Http\Requests\Department\UpdateDepartment;
use App\Http\Resources\CoursesResource;
use App\Http\Resources\DepartmentResource;
use App\Models\Department;
use App\Services\DepartmentService;
use Illuminate\Http\JsonResponse;

class DepartmentController extends Controller
{

    public function index():JsonResponse
    {
        return $this->success(DepartmentResource::collection(Department::all()), 'This is all Department');
    }

    public function store(DepartmentRequest $request , DepartmentService $departmentService): JsonResponse
    {
        if (UserRole::isAdmin()) {
            return $departmentService->store($request);
        }
        return $this->error(null, 'You do not have the Auth to create a department', 401);
    }

    public function show(Department $department):JsonResponse
    {
        return $this->success([
            'department' => new DepartmentResource($department),
                'courses' => CoursesResource::collection($department->course()->get())
            ]
            , 'This is specific ' .$department->name);
    }

    public function update(UpdateDepartment $request, Department $department , DepartmentService $departmentService):JsonResponse
    {
        if (UserRole::isAdmin()) {
         return $departmentService->update($department , $request);
        }
        return $this->error(null, 'You do not have the Auth to update the department' , 401);
    }

    public function destroy(Department $department , DepartmentService $departmentService):JsonResponse
    {
        if(UserRole::isAdmin()) {
           return $departmentService->destroy($department);
        }
        return $this->error(null, 'You do not have the Auth to delete the department' , 401);

    }
}
