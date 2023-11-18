<?php

namespace App\Traits;


use Illuminate\Http\Request;

trait UploadResource
{
    public function uploadFiles(Request $request, $id)
    {
        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        $path = $file->storeAs('resource/'.$id, $fileName, 'public');
        return $path;
    }

}
