<?php

namespace App\Http\Requests\Resource;

use Illuminate\Foundation\Http\FormRequest;

class ResourceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize():Bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['Required' , 'max:255'] ,
            'type' => ['Required'] ,
            'year' => ['Required' , 'numeric' , 'min:2018'] ,
            'file' => 'required|mimes:jpeg,png,pdf,pptx,doc|max:4096',
        ];
    }
}
