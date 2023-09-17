<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResourceRequest;
use App\Models\Course;
use App\Models\Department;
use App\Models\Resource;
use App\Traits\HttpResponses;
use App\Traits\UploadResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ResourceController extends Controller
{
    use UploadResource , HttpResponses;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Department $department , Course $course):JsonResponse
    {
        $resources =$course->resource()->get();
        if($resources->isEmpty())
        {
            return $this->error(null, "The course do not have resources" , 404);
        }
        return $this->success($resources , "All resource belong to This " . $course->name);    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Department $department , Course $course ,ResourceRequest $request):JsonResponse
    {
        $path = $this->uploadFiles($request , $course['id']);
        $resource = Resource::create(array_merge(['course_id' => $course->id , 'path' => $path] , $request->all()));
        return $this->success($resource, 'We save the Resource');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return bool
     */
    public function show($id)
    {
        return true ;

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return bool
     */
    public function update(Request $request, $id)
    {
        return true ;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return bool
     */
    public function destroy($id)
    {
        return true ;
    }

    public function approve(Resource $resource):JsonResponse
    {
        $resource->approved = true;
        $resource->save();

        return $this->success($resource, 'We Approve the Resource ');
    }

    public function reject(Resource $resource):JsonResponse
    {
        $resource->course()->delete();
        $resource->delete();
        return $this->success(null, 'We reject the resource ');

    }
}
