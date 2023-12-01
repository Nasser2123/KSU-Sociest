<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentRequest extends FormRequest
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
    public function rules()
    {
        return [
            "department_name" =>['Required', 'Exists:departments,name'],
            "department_id" =>['Required', 'matching_department:' . $this->input('department_name')],

        ];
    }

    public function messages()
    {
        return [
            'department_name.exists' => 'The selected department does not exist.',
            'department_id.matching_department' => 'The provided department ID does not match the selected department name.',
        ];
    }
}
