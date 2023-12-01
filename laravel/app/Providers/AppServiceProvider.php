<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('matching_department', function ($attribute, $value, $parameters, $validator) {
            // $parameters[0] contains the department_name
            $departmentName = $parameters[0];

            // Check if the given department_id corresponds to the provided department_name
            return DB::table('departments')->where('id', $value)->where('name', $departmentName)->exists();
        });
    }
}
