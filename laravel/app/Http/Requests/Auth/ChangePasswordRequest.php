<?php

namespace App\Http\Requests\Auth;

use App\Rules\CheckOldPasswordRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ChangePasswordRequest extends FormRequest
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
            'old_password' => ['required', 'string' , new CheckOldPasswordRule],
            'password' => ['required', 'string', 'confirmed' , 'max:16'],
            'password_confirmation' => 'required',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'error' => $validator->errors(),
        ], 422));
    }
}
