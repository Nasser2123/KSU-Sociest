<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;


/**
 * @method static create(array|int[]|null[]|string[] $array_merge)
 */
class Course extends Model
{
    use HasFactory;

    protected $fillable = ['name' ,'slag', 'description' ,'hours' ,'prerequisite','status','level' , 'supervisor_id'];



    public function supervisor(): BelongsToMany
    {
        return $this->belongsToMany(Supervisor::class);
    }

    public function department(): BelongsToMany
    {
        return $this->belongsToMany(Department::class);
    }

    public function resource(): HasMany
    {
        return $this->hasMany(Resource::class);
    }

}
