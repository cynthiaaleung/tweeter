/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = function(tweetObj) {

    const $tweet = $("<article>").addClass("tweet");

    // --------------header----------------
    const $header = $("<header>");
    $tweet.append($header);

    // avatar
    const $avatarAndName = $("<div>").addClass("avatar-and-name");

    const $avatar = $("<div>").addClass("avatar");
      
    const $img = $("<img>").attr("src", tweetObj.user.avatars);
    $avatar.append($img);

    // username
    const $userName = $("<div>").addClass("username").text(tweetObj.user.name);

    $avatarAndName.append($avatar, $userName);

    // handle
    const $handle = $("<div>").addClass("handle").text(tweetObj.user.handle);

    $header.append($avatarAndName,$handle);
    
    // ------------tweet content--------------
    const $tweetContent = $("<div>").addClass("tweet-content").text(tweetObj.content.text);
    $tweet.append($tweetContent);

    // --------------footer--------------------
    const $footer = $("<footer>");
    $tweet.append($footer);

    // days-ago
    const $daysAgo = $("<div>").addClass("days-ago").text(timeago.format(tweetObj.created_at));

    // icons
    const $icons = $("<div>");

    const $flagIcon = $("<span>").addClass("icon");
    const $flag = $("<i>").addClass("fas fa-flag");
    $flagIcon.append($flag);

    const $retweetIcon = $("<span>").addClass("icon");
    const $retweet = $("<i>").addClass("fas fa-retweet");
    $retweetIcon.append($retweet);

    const $heartIcon = $("<span>").addClass("icon");
    const $heart = $("<i>").addClass("fas fa-heart");
    $heartIcon.append($heart);

    $icons.append($flagIcon, $retweetIcon, $heartIcon);
    $footer.append($daysAgo, $icons);

    // adding tweet element to html
    $('#tweets-container').append($tweet);
    return $tweet;

  };

  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    tweets.forEach((tweet) => {
      return $("#tweets-container").prepend(createTweetElement(tweet));
    });
  };

  const counter = $("#counter").text();
  $("form").on("submit", function(event) {
    event.preventDefault();

    //form validation
    if (!$("#tweet-text").val() || $("#tweet-text").val().length > counter) {
      return alert('Your tweet is either empty or too long');
    }
    

    const serializedData = $(this).serialize();

    $.ajax ({
      url: "/tweets",
      method: "POST",
      data: serializedData
    }).then((response) => {
      loadTweets();
    }).catch((error) => {
      console.log("error", error);
      loadTweets();
    });

    //resets text in input form and counter
    this.reset();
    $("#counter").text(counter);

  });

 
  const loadTweets = function() {

    $.ajax ({
      url: "/tweets",
      method: "GET",
      data: $(this).serialize()
      
    }).then((data) => {
      renderTweets(data);
    }).catch((error) => {
      console.log("error", error);
    });
  };
  loadTweets();

});