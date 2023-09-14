<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;


class SupervisorDepartment
{
    public static function isSupervisor($department)
    {
        return ($department->id) === (Auth::user()->supervisor()->first()->department_id);
    }
}
