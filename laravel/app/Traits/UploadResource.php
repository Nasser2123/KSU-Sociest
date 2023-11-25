<?php

namespace App\Traits;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait UploadResource
{
    public function uploadFiles(Request $request, $id): bool|string
    {
        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        return Storage::putFileAs('resource/'. $id, $file ,$fileName, 's3');



    }

}
