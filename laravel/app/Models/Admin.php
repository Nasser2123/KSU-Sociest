<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use ShiftOneLabs\LaravelCascadeDeletes\CascadesDeletes;


/**
 * @method static create(array $array_merge)
 */
class Admin extends Model
{
    use HasFactory, SoftDeletes, CascadesDeletes;

    protected $fillable = [
        'id',
    ];
    protected $cascadeDeletes = ['user'];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'id');
    }

    public function department()
    {
        return $this->hasMany(Department::class);

    }



}
