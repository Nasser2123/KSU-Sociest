<?php

namespace App\Http\Requests\Course;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize():bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules():array
    {
        return [
            'name' => ['Required' , 'max:55' , 'unique:courses,name'],
            'slag' => ['Required' , 'max:7'],
            'description' => ['Required' , 'max:2500'],
            'hours' => ['Required' , 'max:12' , 'numeric'],
            'prerequisite' => ['max:25'],
            'status' => 'Required',
            'level' => ['Required' ,'max:10', 'numeric']
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors(),
        ], 422));
    }
}
