<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
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
            'email' => '111@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data1);
        $user->assignRole('Student');
        Student::create(['id' => $user->id  ,'department_name' => 'SWE' , 'department_id' => 1]);

        $data11 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '112@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data11);
        $user->assignRole('Student');
        Student::create(['id' => $user->id  ,'department_name' => 'SWE' , 'department_id' => 1]);


        $data2 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '222@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data2);
        $user->assignRole('Student');
        Student::create(['id' => $user->id ,'department_name' => 'CSC' , 'department_id' => 2]);

        $data22 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '223@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data22);
        $user->assignRole('Student');
        Student::create(['id' => $user->id ,'department_name' => 'CSC' , 'department_id' => 2]);

        $data3 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '333@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data3);
        $user->assignRole('Student');
        Student::create(['id' => $user->id ,'department_name' => 'CEN' , 'department_id' => 3]);

        $data33 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '334@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data33);
        $user->assignRole('Student');
        Student::create(['id' => $user->id ,'department_name' => 'CEN' , 'department_id' => 3]);


        $data4 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '444@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data4);
        $user->assignRole('Student');
        Student::create(['id' => $user->id ,'department_name' => 'IS' ,'department_id' => 4]);

        $data44 = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '445@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data44);
        $user->assignRole('Student');
        Student::create(['id' => $user->id ,'department_name' => 'IS' ,'department_id' => 4]);
    }
}
