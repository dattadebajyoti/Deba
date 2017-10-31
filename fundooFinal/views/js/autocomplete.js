$(document).ready(function() {
  console.log("in autocomplete");
  $("#search").autocomplete({
    source: "/cardApi/autocomplete",
    minLength: 1
  });
});
