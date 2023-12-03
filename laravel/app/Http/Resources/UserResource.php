<?php

namespace App\Http\Resources;

use App\Helpers\UserRole;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request):array
    {
        $response = [];
        if (!is_null($this->admin)) {
            $response['id'] = $this->admin->id;
            $response['first_name'] = $this->first_name ;
            $response['last_name'] = $this->last_name ;

        }

        if (!is_null($this->student)) {
            $response['id'] = $this->student->id;
            $response['first_name'] = $this->first_name ;
            $response['last_name'] = $this->last_name ;
            $response['department_id'] = $this->student->department_id ;
            $response['department_name'] = $this->student->department_name ;

        }

            if (!is_null($this->supervisor)) {
                $response['id'] = $this->supervisor->id;
                $response['first_name'] = $this->first_name ;
                $response['last_name'] = $this->last_name ;
                $response['department_id'] = $this->supervisor->department_id ;
                $response['department_name'] = $this->supervisor->department_name ;
            }
        $response += ['role' => UserRole::isAdmin() ? 'Admin' : $this->roles[0]['name']];

        return $response;
    }

}
