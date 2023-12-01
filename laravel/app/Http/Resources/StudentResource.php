<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request):array
    {
        return [
            'id' => $this['id'],
            'first_name' => $this['first_name'],
            'last_name' => $this['last_name'],
            'email' => $this['email'],
            'department_name' => $this['student']->department_name,
            'department_id' => $this['student']->department_id

        ];
    }
}
