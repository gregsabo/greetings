$(function() {
  setInterval(function() {
    $(".letter").each(function(i, e) {
      var value = String(Math.floor(Math.random() * 128));
      $(e).css({
        color: "rgb(" + value + ',' + value + ',' + value + ')',
      })
    });
  }, 1000);
});
