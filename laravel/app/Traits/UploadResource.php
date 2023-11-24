<?php

namespace App\Traits;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait UploadResource
{
    public function uploadFiles(Request $request, $id)
    {
        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        $path = $file->storeAs('resource/'.$id, $fileName, 's3');
        return $path;
    }

}
