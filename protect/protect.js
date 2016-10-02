
var ingredientInterval;
var flashInterval;
var phraseInterval;

var isWhite = true;
function getRandomColor() {
  if (isWhite) {
    isWhite = false;
    return "white";
  } else {
    isWhite = true;
    return "black";
  }
}

function randomSpotOnBorder() {
  return {
    'left': String((Math.random() * 200) - 100) + '%',
    'top': String((Math.random() * 200) - 100) + '%'
  };
  var attrs = {
    top: '',
    left: '',
    right: '',
    bottom: ''
  };
  var val = Math.random();

  var randPoint = String((Math.random() * 200) - 100) + '%';
  if (val < 0.25) {
    attrs.right = randPoint;
    attrs[choose(['top', 'bottom'])] = -1000;
  } else if (val < 0.5) {
    attrs.left = randPoint;
    attrs[choose(['top', 'bottom'])] = -1000;
  } else if (val < 0.75) {
    attrs.top = randPoint;
    attrs[choose(['left', 'right'])] = -1000;
  } else {
    attrs.bottom = randPoint;
    attrs[choose(['left', 'right'])] = -1000;
  }
  return attrs;
}

function addIngredient() {
  var $leaf = $("img.leaf:not(.moving)").clone();
  $leaf.css({
    left: "50%",
    top: "30%",
    display: "block",
    width: 10,
  });
  $("body").append($leaf);
  $leaf.addClass("moving");
  setTimeout(function() {
    $leaf.css(randomSpotOnBorder());
    $leaf.css({
      width: 300,
      transform: "rotate(" + String(Math.random() * 2000) + "deg)"
    });
  }, 100);
  setTimeout(function() {
    $leaf.remove();
  }, 2000);
}

function choose(inList) {
  return inList[Math.floor(Math.random() * inList.length)];
}

function flashBackground() {
  $("body").css({
    "background-color": getRandomColor(),
  });
}

function showAPhrase() {
  var phrase = $(choose($(".phrase")));
  phrase.css({
    "left": String(Math.random() * 60) + '%',
    "top": String(Math.random() * 60) + '%'
  });
  phrase.show();
  setTimeout(function() {
    phrase.hide();
  }, 1500);
}

function startAddingIngredients() {
  stopAddingIngredients();
  $("#tutorial").fadeOut();
  ingredientInterval = setInterval(addIngredient, 100);
  flashInterval = setInterval(flashBackground, 300);
  phraseInterval = setInterval(showAPhrase, 3000);
}

function stopAddingIngredients() {
  $("#tutorial").fadeIn();
  if (ingredientInterval) {
    $(".leaf.moving").hide();
    clearInterval(ingredientInterval);
  }
  if (flashInterval) {
    clearInterval(flashInterval);
  }
  if (phraseInterval) {
    clearInterval(phraseInterval);
  }
  $("body").css({"background-color": "white"});
}

function watchForHoldEvent() {
  $("#pot").on("mousedown", function() {
    $("audio").get(0).play();
    startAddingIngredients();
  });

  $("#pot").on("mouseup", function() {
    stopAddingIngredients();
  });

}

$(function() {
  watchForHoldEvent();
});
