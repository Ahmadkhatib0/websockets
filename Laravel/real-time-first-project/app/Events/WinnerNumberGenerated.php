<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class WinnerNumberGenerated implements ShouldBroadcast {
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $number;
  public function __construct($number) {
    $this->number = $number;
  }
  public function broadcastOn() {
    Log::debug("Number: {$this->number}");
    return new Channel('game');

  }
}