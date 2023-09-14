<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            'first_name' => 'Nasser',
            'last_name' => 'Nafe',
            'email' => '1@student.ksu.edu.sa',
            'email_verified_at' => now(),
            'password' => '123',
        ];
        $user = User::create($data);
        $user->assignRole('Admin');
        Admin::create(['id' => $user->id]);



    }
}
