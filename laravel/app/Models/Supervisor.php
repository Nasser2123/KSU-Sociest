<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use ShiftOneLabs\LaravelCascadeDeletes\CascadesDeletes;

/**
 * @method static create(array $array)
 */
class Supervisor extends Model
{
    use HasFactory, SoftDeletes, CascadesDeletes;

    protected $fillable = [
        'id',
        'department_name',
        'department_id'
    ];

    protected $cascadeDeletes = ['user'];

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'id');
    }

    public function course(): HasMany
    {
        return $this->hasMany(Course::class);
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class , 'department_id' , 'id');
    }
}
