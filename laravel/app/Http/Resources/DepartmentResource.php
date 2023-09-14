<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  $request
     * @return array
     */
    public function toArray($request):Array
    {
        return [
            'id' => $this->id ,
            'name' => $this->name ,
            'description' => $this->description,
            'level' => $this->level,
//            'admin' => $this->admin->user,
        ];
    }
}
