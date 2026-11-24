let basket = [];

function renderMeals(meals, containerId) {
  let container = document.getElementById(containerId);
  container.innerHTML = "";

  for (let i = 0; i < meals.length; i++) {
    container.innerHTML += getMealTemplate(meals[i]);
  }
}

function renderBasket() {
  let content = document.getElementById("basket-content");

  if (basket.length == 0) {
    content.innerHTML = getEmptyBasketTemplate();
    return;
  }

  let items = "";
  for (let i = 0; i < basket.length; i++) {
    items += getBasketItemTemplate(basket[i]);
  }
  content.innerHTML = `<div class="basket-items">${items}</div>`;
}

function findMeal(name) {
  let allMeals = burgers.concat(pizzas, salads);

  for (let i = 0; i < allMeals.length; i++) {
    if (allMeals[i].name == name) {
      return allMeals[i];
    }
  }
}

function addToBasket(name) {
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].name == name) {
      basket[i].amount++;
      renderBasket();
      return;
    }
  }

  let meal = findMeal(name);
  basket.push({ name: meal.name, price: meal.price, amount: 1 });
  renderBasket();
}

function init() {
  renderMeals(burgers, "burger-list");
  renderMeals(pizzas, "pizza-list");
  renderMeals(salads, "salad-list");
  renderBasket();
}

init();
