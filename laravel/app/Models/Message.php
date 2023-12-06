<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @method static create($array_merge)
 */
class Message extends Model
{
    use HasFactory , SoftDeletes;
    protected $fillable = ['user_id', 'course_id' , 'message'];


    public function user(): HasOne
    {
        return $this->hasOne(User::class ,'user_id' , 'id');
    }
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class ,'course_id' , 'id');
    }
}
