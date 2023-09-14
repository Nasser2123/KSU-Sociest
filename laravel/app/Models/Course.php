<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @method static create(array|int[]|null[]|string[] $array_merge)
 */
class Course extends Model
{
    use HasFactory;
    protected $fillable = ['name' ,'slag', 'description' ,'hours' ,'prequisite','status','level' , 'supervisor_id'];



    public function supervisor()
    {
        return $this->belongsToMany(Supervisor::class);
    }

    public function department()
    {
        return $this->belongsToMany(Department::class);
    }

}
