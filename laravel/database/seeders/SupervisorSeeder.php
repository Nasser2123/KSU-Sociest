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
            'email' => '11@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data1);
        $user->assignRole('Supervisor');
        Supervisor::create(['id' => $user->id ,'department' =>'SWE' , 'department_id' => 1]);

        $data2 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '22@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data2);
        $user->assignRole('Supervisor');
        Supervisor::create(['id' => $user->id ,'department' =>'CSC' , 'department_id' => 2]);

        $data3 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '33@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data3);
        $user->assignRole('Supervisor');
        Supervisor::create(['id' => $user->id ,'department' =>'IS' , 'department_id' => 3]);

        $data4 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '4@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data4);
        $user->assignRole('Supervisor');
        Supervisor::create(['id' => $user->id ,'department' =>'IS' , 'department_id' => 4]);
    }
}
