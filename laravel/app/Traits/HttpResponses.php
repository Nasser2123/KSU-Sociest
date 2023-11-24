<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait HttpResponses
{

    protected function success($data = null, $message = null, $code = 200)
    {

        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ], $code);
    }


    protected function error($data = null, $message = null, $code)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'data' => $data
        ], $code);
    }
}
