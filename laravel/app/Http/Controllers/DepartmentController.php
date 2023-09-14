<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\DepartmentRequest;
use App\Http\Requests\UpdateDepartment;
use App\Http\Resources\DepartmentResource;
use App\Models\Department;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
class DepartmentController extends Controller
{

    public function index():JsonResponse
    {
        return $this->success(DepartmentResource::collection(Department::all()), 'This is all Department');

    }

    public function store(DepartmentRequest $request):JsonResponse
    {
        $department= Department::create(array_merge($request->all(), ['admin_id' => Auth::id()]));
        return $this->success(new DepartmentResource($department) , 'We save the Department');
    }

    public function show(Department $department):JsonResponse
    {
        return $this->success(new DepartmentResource($department) , 'This is specific Department');
    }

    public function update(UpdateDepartment $request, Department $department):JsonResponse
    {
        $department->update(array_merge($request->all(), ['admin_id' => Auth::id()]));
        return $this->success(new DepartmentResource($department) , 'We update the department');
    }

    public function destroy(Department $department):JsonResponse
    {
        $department->delete();
        return $this->success(null , 'We delete the department');
    }
}
