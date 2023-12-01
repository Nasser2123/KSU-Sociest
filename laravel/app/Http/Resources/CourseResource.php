<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{

    public function toArray($request): array
    {
        return [
            'id' => $this['id'],
            'name' => $this['name'] ,
            'slag' => $this['slag'],
            'description' => $this['description'],
            'hours' => $this['hours'] ,
            'level' => $this['level'],
            'prerequisite' => $this['prerequisite'],
            'status' => $this['status'],
            'resource' => $this['resource'],
        ];
    }
}
