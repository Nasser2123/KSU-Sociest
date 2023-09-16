<?php
namespace App\Services;

use App\Http\Resources\DepartmentResource;
use App\Http\Resources\UserResource;
use App\Models\Department;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;


class DepartmentService
{
    use HttpResponses;

    public function create($request , $adminId)
    {

    }



}
