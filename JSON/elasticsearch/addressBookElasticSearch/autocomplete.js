$(document).ready(function() {
  console.log("ok");
  $("#search-query").autocomplete({
    source: "/autocomplete",
    minLength: 2
  });
});
