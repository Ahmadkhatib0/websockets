<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatController extends Controller {

  public function __construct() {
    $this->middleware('auth');
  }

  public function showChat() {
    return view('chat.show');
  }
}