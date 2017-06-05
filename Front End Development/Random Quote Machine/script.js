var url = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";

$(function(){
    var $pText = $(".qText");
    var $pAuthor = $(".qAuthor");
    var $qButton = $("#newQuoteButton");
    var $qTweet = $("#tweetButton");

    function getQuote(data){
      var qText = data.quoteText;
      var qAuthor = data.quoteAuthor;
      $pText.text(qText);
      $pAuthor.text(qAuthor);
    }


    $.getJSON(url, getQuote, "jsonp");

    $qButton.on("click", function(){
      $.getJSON(url, getQuote, "jsonp");
    });

    $qTweet.on("click", function(){
      window.open("https://twitter.com/intent/tweet?text=" + $pText.text() + "\n- " + $pAuthor.text());
    });
});