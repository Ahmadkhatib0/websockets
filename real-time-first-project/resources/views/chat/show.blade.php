@extends('layouts.app') @push('styles')
<style type="text/css"></style>
@endpush @section('content')
<div class="container-fluid">
  <div class="row justify-content-center">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">Chat</div>
        <div class="card-body">
          <div class="row p-2">
            <div class="col-10">
              <div class="row">
                <div class="col-12 broder rounded-lg p-3">
                  <ul
                    id="messages"
                    class="list-unstyled overflow-auto border border-1 p-1"
                    style="height: 45vh"
                  >
                    <li>Test1: hello</li>
                    <li>Test1: Hi there</li>
                  </ul>
                </div>
                <form>
                  <div class="row p-3">
                    <div class="col-10">
                      <input type="text" id="message" class="form-control" />
                    </div>
                    <div class="col-2">
                      <button
                        id="send"
                        type="submit"
                        class="btn btn-primary btn-block"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-2">
              <p><strong> Online now </strong></p>
              <ul
                id="users"
                class="list-unstyled overflow-auto text-info"
                style="height: 45vh"
              >
                <li>test 1</li>
                <li>test 1</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection @push("scripts")
<script></script>
@endpush
