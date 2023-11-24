<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(array|false[]|string[] $array_merge)
 */
class Resource extends Model
{
    use HasFactory;

    protected $fillable = ['name' ,'type','year' , 'course_id' ,'path'];


    public function course()
    {
        return $this->belongsTo(Course::class ,'course_id' , 'id');
    }
}

