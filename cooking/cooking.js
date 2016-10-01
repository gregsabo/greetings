
var ingredientInterval;

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

function startAddingIngredients() {
  $("#tutorial").fadeOut();
  ingredientInterval = setInterval(addIngredient, 100);
}

function stopAddingIngredients() {
  $("#tutorial").fadeIn();
  if (ingredientInterval) {
    clearInterval(ingredientInterval);
  }
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
