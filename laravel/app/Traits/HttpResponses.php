<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait HttpResponses
{


    protected function success($data = null, $message = null, $code = 200):JsonResponse
    {
        return response()->json([
            'status' => 'Success',
            'data' => $data,
            'message' => $message,
        ], $code);
    }


    protected function error($data = null, $message = null, $code = null):JsonResponse
    {
        return response()->json([
            'status' => 'Error',
            'data' => $data,
            'message' => $message,
        ], $code);
    }
}
