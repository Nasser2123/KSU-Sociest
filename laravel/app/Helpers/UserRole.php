<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;


class UserRole
{
    public static function isAdmin(): bool
    {
        return Auth::check() && Auth::user()->hasRole('Admin');
    }
    public static function isStudent(): bool
    {
        return Auth::check() && Auth::user()->hasRole('Student');
    }

    public static function isSupervisor(): bool
    {
        return Auth::check() && Auth::user()->hasRole('Supervisor');
    }
}
