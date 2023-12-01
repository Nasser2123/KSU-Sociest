<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddSupervisorRequest extends FormRequest
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
            "department_name" =>['Required', 'Exists:departments,name'],
            "department_id" =>['Required', 'matching_department:' . $this->input('department_name')],

        ];
    }

    public function messages():array
    {
        return [
            'department_name.exists' => 'The selected department does not exist.',
            'department_id.matching_department' => 'The provided department ID does not match the selected department name.',
        ];
    }
}
