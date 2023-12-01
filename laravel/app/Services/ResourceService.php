<?php

namespace App\Services;


use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;


class ResourceService
{
    use HttpResponses;

    public function all($department): JsonResponse
    {
        $courses = $department->course()->get();
        if ($courses->isEmpty()) {
            return $this->error(null, "The Department do not have resources", 404);
        }
        $courseIds = $courses->pluck('id')->toArray();
        $resources = DB::table('resources')
            ->whereIn('course_id', $courseIds)
            ->where('approved', '=' , '0')
            ->get();
         return $this->success($resources, "All resource belong to This " . $department['name']);
    }

    public function approve($resource): JsonResponse
    {
        $resource['approved'] = true;
        $resource->save();
        return $this->success($resource, 'We Approve the Resource');
    }
    public function reject($resource): JsonResponse
    {
        Storage::disk('s3')->delete($resource['path']);
        $resource->delete();
        return $this->success(null, 'We reject the resource ');
    }


}
