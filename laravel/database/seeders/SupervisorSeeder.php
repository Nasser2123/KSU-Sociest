<?php

namespace Database\Seeders;

use App\Models\Supervisor;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupervisorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data1 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '10@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data1);
        $user->assignRole('Supervisor');
        Supervisor::create(['id' => $user->id  ,'department_name' => 'SWE' , 'department_id' => 1]);

        $data11 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '11@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data11);
        $user->assignRole('Supervisor');
        Supervisor::create(['id' => $user->id  ,'department_name' => 'SWE' , 'department_id' => 1]);


        $data2 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '20@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data2);
        $user->assignRole('Supervisor');
        Supervisor::create(['id' => $user->id ,'department_name' => 'CSC' , 'department_id' => 2]);

        $data22 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '21@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data22);
        $user->assignRole('Supervisor');
        Supervisor::create(['id' => $user->id ,'department_name' => 'CSC' , 'department_id' => 2]);

        $data3 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '30@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data3);
        $user->assignRole('Supervisor');
        Supervisor::create(['id' => $user->id ,'department_name' => 'CEN' , 'department_id' => 3]);

        $data33 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '31@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data33);
        $user->assignRole('Supervisor');
        Supervisor::create(['id' => $user->id ,'department_name' => 'CEN' , 'department_id' => 3]);


        $data4 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '40@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data4);
        $user->assignRole('Supervisor');
        Supervisor::create(['id' => $user->id ,'department_name' => 'IS' ,'department_id' => 4]);

        $data44 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '41@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data44);
        $user->assignRole('Supervisor');
        Supervisor::create(['id' => $user->id ,'department_name' => 'IS' ,'department_id' => 4]);
    }
}
