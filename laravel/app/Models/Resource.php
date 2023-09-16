<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = ['slag','name' ,'type','year' , 'course_id' ,'path'];


    public function course()
    {
        return $this->belongsTo(Course::class ,'course_id' , 'id');
    }
}

