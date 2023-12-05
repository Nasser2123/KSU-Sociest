<?php

namespace App\Events;

use App\Models\Course;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSend implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $message;
    public Course $course;

    public function __construct($message , $course)
    {
        $this->message = $message;
        $this->course = $course;

    }


    public function broadcastOn()
    {
        return ['chat'.$this->course->id];
    }

    public function broadcastAs()
    {
        return 'message';
    }
}
