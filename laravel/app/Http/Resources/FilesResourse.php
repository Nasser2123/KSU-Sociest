<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FilesResourse extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'   => $this['id'],
            'name' => $this['name'],
            'type' => $this['type'],
            'year' => $this['year'],
            'path' => $this['path'],
            'course_id' => $this['course']->id,
            'course_name' => $this['course']->name,
            'course_slag' => $this['course']->slag,



        ];
    }
}
