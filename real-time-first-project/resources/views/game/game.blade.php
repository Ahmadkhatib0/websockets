@extends('layouts.app') @push('styles')
<style type="text/css">
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .refresh {
    animation: rotate 1.5s linear infinite;
  }
</style>
@endpush @section('content')
<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">Game</div>
        <div class="card-body">
          <div class="text-center">
            <img
              id="circle"
              class=""
              src=" {{ asset('img/circle.png') }} "
              width="250"
              height="250"
            />
            <p id="winner" class="display-1 d-none text-primary"></p>
          </div>
          <hr />
          <div class="text-center">
            <label class="fw-bold fs-5">
              <select class="custom-select h5 col-auto">
                <option selected>Not In</option>
                @foreach (range(1 , 12 ) as $number)
                <option>{{ $number }}</option>
                @endforeach
              </select>
              <hr />
              <p class="fw-bold fs-5">remianing time</p>
              <p id="timer" class="fs-5 text-danger">Waiting to start</p>
              <hr />
              <p id="result" class="fs-1"></p>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection @push("scripts")
<script></script>
@endpush
