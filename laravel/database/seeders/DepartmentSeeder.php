<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $departments = [
            [
            'name' => 'SWE',
            'description' => 'The software development project brief is a relatively concise document that aims to outline the main idea and the vision behind the project',
            'level' => '8',
            'admin_id' => '1'
        ],
            [
            'name' => 'CSC',
            'description' => 'The software development project brief is a relatively concise document that aims to outline the main idea and the vision behind the project',
            'level' => '8',
            'admin_id' => '1'
        ],
            [
                'name' => 'CEN',
                'description' => 'The software development project brief is a relatively concise document that aims to outline the main idea and the vision behind the project',
                'level' => '8',
                'admin_id' => '1'
            ],
            [
            'name' => 'IS',
            'description' => 'The software development project brief is a relatively concise document that aims to outline the main idea and the vision behind the project',
            'level' => '10',
            'admin_id' => '1'
            ]
        ];

        foreach ($departments as $department) {
            Department::create($department);
        }
    }

}
