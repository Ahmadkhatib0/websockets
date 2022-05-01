@extends('layouts.app') @section('content')
<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">Users</div>

        <div class="card-body">
          <ul id="users"></ul>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
<!--  -->
@push("scripts")
<script>
  window.axios.get("/api/users").then((response) => {
    const userElements = document.getElementById("users");
    let users = response.data.slice(2);
    let parse = JSON.parse(users);
    console.log(parse);
    parse.forEach((user, index) => {
      let element = document.createElement("li");
      element.setAttribute("id", user.id);
      element.innerText = user.name;
      userElements.appendChild(element);
    });
  });
</script>
@endpush
