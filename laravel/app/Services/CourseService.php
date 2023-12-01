<?php

namespace App\Services;

use App\Http\Resources\CourseResource;
use App\Http\Resources\CoursesResource;
use App\Models\Course;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;


class CourseService
{
    use HttpResponses;

    public function store($request, $department): JsonResponse
    {
        $course = Course::create(array_merge($request->all(), ['supervisor_id' => Auth::id()]));
        $course->department()->attach($department);
        return $this->success($course, 'We save the'.$course->name);
    }

    public function update($request, $course): JsonResponse
    {
        $course->update($request->all());
        return $this->success(new CourseResource($course), 'We update the course successfully' );
    }
    public function destroy($course): JsonResponse
    {
        $course->department()->detach();
        $course->delete();
        return $this->success(null, 'We delete the Course ');
    }


}
