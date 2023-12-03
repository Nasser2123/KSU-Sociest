<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @method static create(array $array_merge)
 * @property mixed $name
 */
class Department extends Model
{
    use HasFactory;


    protected $fillable = ['name' , 'description' ,'level' , 'admin_id'];


    public function admin(): BelongsTo
    {
        return $this->belongsTo(Admin::class);
    }
    public function supervisor()
    {
        return $this->hasMany(Supervisor::class);
    }
    public function student()
    {
        return $this->hasMany(Student::class);
    }
    public function course()
    {
        return $this->belongsToMany(Course::class);
    }


}
