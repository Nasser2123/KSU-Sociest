<?php

namespace App\Http\Controllers;

use App\Helpers\SupervisorDepartment;
use App\Http\Controllers\Controller;
use App\Http\Requests\CourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use App\Models\Department;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{

    public function index(Department $department):JsonResponse
    {
        $courses =$department->course()->get();
        if($courses->isEmpty())
        {
            return $this->error(null, "The department is empty" , 404);
        }
        return $this->success(CourseResource::collection($courses), "All courses belong to This " . $department->name);
    }

    public function store(CourseRequest $request ,Department $department):JsonResponse
    {
        if(SupervisorDepartment::isSupervisor($department)) {
            $course = Course::create(array_merge($request->all(), ['supervisor_id' => Auth::id()]));
            $course->department()->attach($department);
            return $this->success($course, 'We save the Course ');
        }
        return $this->error(null, "You can not store course in this department (Not Auth)".$department->name , 404);

    }

    public function show(Department $department , Course $course):JsonResponse
    {
        return $this->success(new CourseResource($course) , 'This is a course info');
    }

    public function update(UpdateCourseRequest $request, Department $department , Course $course):JsonResponse
    {
        if(SupervisorDepartment::isSupervisor($department)) {
            $course->update(array_merge($request->all()));
            return $this->success(new CourseResource($course), 'We update the course successfully' );

        }
        return $this->error(null, "You can not store course in this department (Not Auth)".$department->name  , 404);

    }

    public function destroy(Department $department , Course $course):JsonResponse
    {
        if(SupervisorDepartment::isSupervisor($department)) {
            $course->department()->detach();
            $course->delete();
            return $this->success(null, 'We delete the Course ');
        }
        return $this->error(null, "You can not store course in this department (Not Auth)".$department->name  , 404);

    }
}
