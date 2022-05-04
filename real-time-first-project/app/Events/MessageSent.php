<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class MessageSent implements ShouldBroadcast {
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $user;
  public $message;
  public function __construct(User $user, $message) {
    $this->user    = $user;
    $this->message = $message;
  }
  public function broadcastOn() {
    Log::debug("{$this->user->name} {$this->message}");
    return new PresenceChannel('chat');
  }
}