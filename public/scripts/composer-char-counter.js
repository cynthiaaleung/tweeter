$(document).ready(function() {

  const counter = $("#counter").text();

  $("#tweet-text").on("input", function() {

    let charRemaining = counter - $("#tweet-text").val().length;
    
    $("#counter").text(charRemaining);

    if (charRemaining < 0) {
      $("#counter").css("color", "red");
    } else {
      $("#counter").css("color", "black");
    }
  });
});