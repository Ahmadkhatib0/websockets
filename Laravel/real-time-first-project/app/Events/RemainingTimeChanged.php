<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class RemainingTimeChanged implements ShouldBroadcast {
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $time;
  public function __construct($time) {
    $this->time = $time;
  }
  public function broadcastOn() {
    Log::debug("Time: {$this->time}", );
    return new Channel('game');
  }
}