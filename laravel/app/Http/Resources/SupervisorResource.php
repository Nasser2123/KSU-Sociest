<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupervisorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this['id'],
            'first_name' => $this['user']->first_name,
            'last_name' => $this['user']->last_name,
            'email' => $this['user']->email,
            'department_name' => $this['department_name'],
            'department_id' => $this['department_id']

        ];
    }
}
