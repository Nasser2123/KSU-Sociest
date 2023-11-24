<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
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
            'first_name' =>['Required' , 'String' ,'max:25'],
            'last_name' =>['Required' , 'String' ,'max:25'],
            'email' =>['Required','email','ends_with:@student.ksu.edu.sa', 'unique:users'],
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
