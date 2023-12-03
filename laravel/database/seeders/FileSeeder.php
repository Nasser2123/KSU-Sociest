<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Traits\UploadResource;
use Illuminate\Support\Facades\DB;

class FileSeeder extends Seeder
{
    use UploadResource;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('resources')->insert([
            'name' => "مدخل",
            'type' => "Book",
            'year' => "2018",
            "approved" => 1 ,
            "course_id" => 1,
            'path' => "resource/4/SWE486-BigData.pdf",
        ]);

        DB::table('resources')->insert([
            'name' => "مدخل",
            'type' => "Book",
            'year' => "2018",
            "approved" => 1 ,
            "course_id" => 1,
            'path' => "resource/4/SWE486-BigData.pdf",
        ]);

        DB::table('resources')->insert([
            'name' => "مدخل",
            'type' => "Book",
            'year' => "2018",
            "approved" => 1 ,
            "course_id" => 1,
            'path' => "resource/4/SWE486-BigData.pdf",
        ]);

        DB::table('resources')->insert([
            'name' => "مدخل",
            'type' => "Book",
            'year' => "2018",
            "approved" => 1 ,
            "course_id" => 1,
            'path' => "resource/4/SWE486-BigData.pdf",
        ]);

        DB::table('resources')->insert([
            'name' => "مدخل",
            'type' => "Book",
            'year' => "2018",
            "approved" => 1 ,
            "course_id" => 1,
            'path' => "resource/4/SWE486-BigData.pdf",
        ]);

        DB::table('resources')->insert([
            'name' => "مدخل",
            'type' => "Book",
            'year' => "2018",
            "approved" => 1 ,
            "course_id" => 1,
            'path' => "resource/4/SWE486-SOA- 1.pdf",
        ]);

        DB::table('resources')->insert([
            'name' => "مدخل",
            'type' => "Book",
            'year' => "2018",
            "approved" => 1 ,
            "course_id" => 1,
            'path' => "resource/4/SWE486-SOA- 1.pdf",
        ]);

        DB::table('resources')->insert([
            'name' => "مدخل",
            'type' => "Book",
            'year' => "2018",
            "approved" => 0,
            "course_id" => 1,
            'path' => "resource/4/SWE486-SOA- 1.pdf",
        ]);
    }
}
