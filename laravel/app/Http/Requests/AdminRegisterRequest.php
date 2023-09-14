<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AdminRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
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
            'first_name' =>['Required' , 'String' ,'max:25'],
            'last_name' =>['Required' , 'String' ,'max:25'],
            'email' =>['Required','email','ends_with:@student.ksu.edu.sa', 'unique:admins'],
            'password' =>['Required' , 'String' , 'Confirmed' , 'max:16'],
            'password_confirmation' =>['Required'],

        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors(),
        ], 422));
    }
}
