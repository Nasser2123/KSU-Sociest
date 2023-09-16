<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\DepartmentRequest;
use App\Http\Requests\UpdateDepartment;
use App\Http\Resources\DepartmentResource;
use App\Models\Department;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Helpers\UserRole;
class DepartmentController extends Controller
{

    public function index():JsonResponse
    {
        return $this->success(DepartmentResource::collection(Department::all()), 'This is all Department');

    }

    public function store(DepartmentRequest $request):JsonResponse
    {
        if (UserRole::isAdmin()) {
            $department = Department::create(array_merge($request->all(), ['admin_id' => Auth::id()]));
            return $this->success(new DepartmentResource($department), 'We save the Department');
        }
        return $this->error(null, 'You do not have the Auth to create a department');
    }

    public function show(Department $department):JsonResponse
    {
        return $this->success(new DepartmentResource($department) , 'This is specific ' .$department->name);
    }

    public function update(UpdateDepartment $request, Department $department):JsonResponse
    {
        if (UserRole::isAdmin()) {
            $department->update(array_merge($request->all(), ['admin_id' => Auth::id()]));
            return $this->success(new DepartmentResource($department), 'We update the '.$department->name);
        }
        return $this->error(null, 'You do not have the Auth to update the department');
    }

    public function destroy(Department $department):JsonResponse
    {
        if(UserRole::isAdmin()) {
            $department->delete();
            return $this->success(null, 'We delete the department');
        }
        return $this->error(null, 'You do not have the Auth to delete the department');

    }
}
