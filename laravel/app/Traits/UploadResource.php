<?php

namespace App\Traits;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait UploadResource
{
    public function uploadFiles(Request $request, $id)
    {
        $file = $request->file('file');
        $fileName = time() . '_' . $id . '_' .$file->extension();
        $path = $file->storeAs('uploads', $fileName, 'public');
        return $path ;
    }

}
