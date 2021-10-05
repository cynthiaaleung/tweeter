$(document).ready(function() {
  
  const counter = this.getElementById("counter").innerHTML;

  const tweetText = this.getElementById("tweet-text");
  tweetText.addEventListener("input", () => {
  
    let tweetLength = this.getElementById("tweet-text").value.length;
    this.getElementById("counter").innerHTML = counter - tweetLength;

    let charRemaining = counter - tweetLength;
    if (charRemaining < 0) {
      this.getElementById("counter").className = "counter-error";
    } else {
      this.getElementById("counter").className = "";
    }
  });
  
});