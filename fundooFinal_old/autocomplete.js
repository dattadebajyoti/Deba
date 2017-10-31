$(document).ready(function() {
  console.log("ok");
  $("#search").autocomplete({
    source: "/autocomplete",
    minLength: 2
  });
});
