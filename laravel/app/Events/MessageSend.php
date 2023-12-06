<?php

namespace App\Events;

use App\Models\Course;
use App\Models\User;
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
    public User $user;

    public function __construct($message , $course , $user)
    {
        $this->message = $message;
        $this->course = $course;
        $this->user = $user;

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
