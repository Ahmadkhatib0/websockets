<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class UserDeleted implements ShouldBroadcast {
  use Dispatchable, InteractsWithSockets;
  // we removed SerializesModels, to avoid 404 error code, on deleting user

  public $user;
  public function __construct(User $user) {
    $this->user = $user;
  }
  public function broadcastOn() {
    Log::debug("Deleted {$this->user->name}");
    return new Channel('users');
  }
}