
var ingredientInterval;
var flashInterval;
var phraseInterval;

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function addIngredient() {
  var num = String(Math.floor((Math.random() * 58) + 172));
  var $ingredient = $("img[src='../images/food/" + num + ".png']").clone();
  $ingredient.css({
    left: String((Math.random() * 200) - 100) + '%',
    top: "-1000px",
    width: 1000
  });
  $("body").append($ingredient);
  $ingredient.addClass("falling-food-item");
  setTimeout(function() {
    $ingredient.css({
      left: "50%",
      top: "100%",
      width: 30,
      transform: "rotate(" + String(Math.random() * 360) + "deg)"
    });
  }, 100);
  setTimeout(function() {
    $ingredient.remove();
  }, 5000);
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
    "left": String(Math.random() * 70) + '%',
    "top": String(Math.random() * 70) + '%'
  });
  phrase.show();
  setTimeout(function() {
    phrase.hide();
  }, 1500);
}

function startAddingIngredients() {
  stopAddingIngredients();
  $("#tutorial").fadeOut();
  ingredientInterval = setInterval(addIngredient, 300);
  flashInterval = setInterval(flashBackground, 100);
  phraseInterval = setInterval(showAPhrase, 3000);
}

function stopAddingIngredients() {
  $("#tutorial").fadeIn();
  if (ingredientInterval) {
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
    startAddingIngredients();
  });

  $("#pot").on("mouseup", function() {
    stopAddingIngredients();
  });

}

$(function() {
  watchForHoldEvent();
});
