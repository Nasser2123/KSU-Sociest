<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id'   => $this['id'],
            'name' => $this['name'],
            'type' => $this['type'],
            'year' => $this['year'],
            'path' => $this['path'],

        ];
    }
}
