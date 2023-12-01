<?php

namespace App\Http\Controllers;

use App\Helpers\SupervisorDepartment;
use App\Http\Requests\Course\CourseRequest;
use App\Http\Requests\Course\UpdateCourseRequest;
use App\Http\Resources\CourseResource;
use App\Http\Resources\CoursesResource;
use App\Models\Course;
use App\Models\Department;
use App\Services\CourseService;
use Illuminate\Http\JsonResponse;

class CourseController extends Controller
{

    public function index(Department $department):JsonResponse
    {
        $courses =$department->course()->get();
        return $this->success(CoursesResource::collection($courses), "All courses belong to This " . $department->name);
    }

    public function store(CourseRequest $request ,Department $department , CourseService $courseService):JsonResponse
    {
        if(SupervisorDepartment::isSupervisor($department)) {
          return $courseService->store($request ,$department);
        }
        return $this->error(null, "You can not store course in this department (Not Auth)".$department->name , 404);

    }

    public function show(Department $department , Course $course):JsonResponse
    {
        return $this->success(new CourseResource($course) , 'This is a course info belong'.$department->name );
    }

    public function update(UpdateCourseRequest $request, Department $department , Course $course ,CourseService $courseService):JsonResponse
    {
        if(SupervisorDepartment::isSupervisor($department)) {
           return $courseService->update($request ,$course);
        }
        return $this->error(null, "You can not store course in this department (Not Auth)".$department->name  , 404);

    }

    public function destroy(Department $department , Course $course , CourseService $courseService):JsonResponse
    {
        if(SupervisorDepartment::isSupervisor($department)) {
           return $courseService->destroy($course);
        }
        return $this->error(null, "You can not store course in this department (Not Auth)".$department->name  , 404);

    }

    public function All():JsonResponse
    {
        $courses =Course::all();
        return $this->success(CoursesResource::collection($courses), "All courses");
    }
}
