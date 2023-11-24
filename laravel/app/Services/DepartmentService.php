<?php
namespace App\Services;

use App\Http\Resources\DepartmentResource;
use App\Models\Department;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;


class DepartmentService
{
    use HttpResponses;

    public function store($request):JsonResponse
    {
        $department = Department::create(array_merge($request->all(), ['admin_id' => Auth::id()]));
        return $this->success(new DepartmentResource($department), 'We save the Department');
    }

    public function update($department , $request): JsonResponse
    {
        $department->update(array_merge($request->all(), ['admin_id' => Auth::id()]));
        return $this->success(new DepartmentResource($department), 'We update the '.$department->name);
    }


    public function destroy($department): JsonResponse
    {
        $department->delete();
        return $this->success(null, 'We delete the department');
    }


}
