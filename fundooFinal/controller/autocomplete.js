$(document).ready(function() {
  console.log("in autocomplete");
  $("#search").autocomplete({
    source: "/autocomplete",
    minLength: 2
  });
});
