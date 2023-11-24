<?php

namespace App\Http\Controllers;

use App\Helpers\SupervisorDepartment;
use App\Http\Requests\Resource\ResourceRequest;
use App\Http\Resources\FileResource;
use App\Models\Course;
use App\Models\Department;
use App\Models\Resource;
use App\Services\ResourceService;
use App\Traits\HttpResponses;
use App\Traits\UploadResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ResourceController extends Controller
{
    use UploadResource , HttpResponses;

    /**
     * Display a listing of the resource.
     *
     * @param Course $course
     * @return JsonResponse
     */
    public function index(Course $course):JsonResponse
    {
        $resources =$course->resource()->where('approved' , '=' , '1')->get();
        if($resources->isEmpty())
        {
            return $this->error(null, "The course do not have resources" , 404);
        }
        return $this->success(FileResource::collection($resources) , "All resource belong to This " . $course['name']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Course $course
     * @param ResourceRequest $request
     * @return JsonResponse
     */
    public function store(Course $course ,ResourceRequest $request):JsonResponse
    {
        $path = $this->uploadFiles($request , $course['id']);
        $resource = Resource::create(array_merge(['course_id' => $course['id'] , 'path' => $path] , $request->all()));
        return $this->success(new FileResource($resource) , 'We save the Resource');
    }

    /**
     * Display the specified resource.
     *
     * @param Course $course
     * @param Resource $resource
     * @return StreamedResponse|JsonResponse
     */
    public function show(Course $course , Resource $resource): StreamedResponse|JsonResponse
    {
        if(Storage::disk('s3')->exists($resource['path']))
        {
            return Storage::disk('s3')->response($resource['path']);
        }
        else{
            return $this->error(null, "The resource dose not exist in ". $course['id'], 404);
        }
    }

    public function all(Department $department , ResourceService $resourceService):JsonResponse
    {
        if(SupervisorDepartment::isSupervisor($department)){
            return $resourceService->all($department);
        }
        return $this->error(null, "You can not access resource in this department (Not Auth)".$department->name  , 404);

    }
    public function approve(Department $department , Resource $resource , ResourceService $resourceService):JsonResponse
    {
        if(SupervisorDepartment::isSupervisor($department)) {
          return $resourceService->approve($resource);
        }
        return $this->error(null, "You can not approve resource in this department (Not Auth)".$department->name  , 404);

    }

    public function reject(Department $department , Resource $resource , ResourceService $resourceService):JsonResponse
    {
        if(SupervisorDepartment::isSupervisor($department)) {
          return $resourceService->reject($resource);
        }
        return $this->error(null, "You can not reject resource in this department (Not Auth)".$department->name  , 404);

    }
}
