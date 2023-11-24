<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CoursesResource extends JsonResource
{

    public function toArray($request):array
    {
        return [
            'id' => $this['id'],
            'name' => $this['name'] ,
            'slag' => $this['slag'],
            'hours' => $this['hours'] ,
            'level' => $this['level'],
            ];
    }
}
