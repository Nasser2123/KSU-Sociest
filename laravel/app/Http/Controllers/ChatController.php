<?php

namespace App\Http\Controllers;

use App\Events\MessageSend;
use App\Helpers\SupervisorDepartment;
use App\Http\Requests\MessageRequest;
use App\Models\Course;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use function broadcast;

class ChatController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @param Course $course
     * @return JsonResponse
     */
    public function index(Course $course):JsonResponse
    {
        $messages = $course->message()->orderBy('created_at')->get();
        return $this->success($messages , "All message belong to this ".$course['name']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Course $course
     * @param MessageRequest $request
     * @return JsonResponse
     */
    public function store(Course $course ,MessageRequest $request): JsonResponse
    {
        $user = Auth::user();
        broadcast(new MessageSend($request['message'] , $course , $user));
        $message = Message::create(array_merge($request->all() ,['user_id' => Auth::id() , "course_id" => $course['id']]));
        return $this->success(array_merge(["message" => $message , "first_name" =>$user['first_name'] , "last_name" => $user['last_name'] ]), "Message send successfully");

    }


    /**
     * Remove the specified resource from storage.
     *
     * @param Course $course
     * @param Message $message
     * @return JsonResponse
     */
    public function destroy(Course $course , Message $message): JsonResponse
    {
        $department =$course->department()->get();

        if (Auth::id() === $message['user_id']){
            $message->delete();
            return $this->success(null, 'We delete the Message from this '. $course['slag']);
        }
        if (SupervisorDepartment::isSupervisor($department[0])){
            $message->delete();
            return $this->success(null, 'We delete the Message from this '. $course['slag']);
        }

        return $this->error(null, 'We can not delete the Message from this '. $course['slag'] , 401);

    }
}
