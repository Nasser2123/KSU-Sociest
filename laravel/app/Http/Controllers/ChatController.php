<?php

namespace App\Http\Controllers;

use App\Events\MessageSend;
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
        $message = Message::create(array_merge($request->all() ,['user_id' => Auth::id() , "course_id" => $course['id']]));
        broadcast(new MessageSend($request['message'] , $course));
        return $this->success($message, "Message send successfully from ".$user['first_name']);

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
        if (Auth::id() === $message['user_id']){
            $message->delete();
            return $this->success(null, 'We delete the Message from this '. $course['slag']);
        }

        return $this->error(null, 'We can not delete the Message from this '. $course['slag'] , 401);

    }
}
