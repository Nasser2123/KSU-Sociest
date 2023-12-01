<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use ShiftOneLabs\LaravelCascadeDeletes\CascadesDeletes;

/**
 * @method static create(array $array_merge)
 * @method static find(mixed $id)
 */
class Student extends Model
{
    use HasFactory, SoftDeletes, CascadesDeletes;

    protected $fillable = [
        'id',
        'department_name',
        'department_id'

    ];
    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'id');
    }
    public function department(): hasOne
    {
        return $this->hasOne(Department::class, 'id', 'department_id');
    }
}
