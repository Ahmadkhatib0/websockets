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
    let users = response.data;
    console.log(users);
    users.forEach((user, index) => {
      let element = document.createElement("li");
      element.setAttribute("id", user.id);
      element.innerText = user.name;
      userElements.appendChild(element);
    });
  });
</script>

<script>
  window.Echo.channel("users")
    .listen("UserCreated", (e) => {
      const userElements = document.getElementById("users");
      let element = document.createElement("li");
      element.setAttribute("id", e.user.id);
      element.innerText = e.user.name;
      userElements.appendChild(element);
    })
    .listen("UserUpdated", (e) => {
      let element = document.getElementById(e.user.id);
      element.innerText = e.user.name;
    })
    .listen("UserDeleted", (e) => {
      let element = document.getElementById(e.user.id);
      element.parentNode.removeChild(element);
    });
</script>
@endpush
