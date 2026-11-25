let basket = [];
let deliveryFee = 4.99;
let confirmationTimer;

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
    items += getBasketItemTemplate(basket[i], i);
  }
  content.innerHTML = `<div class="basket-items">${items}</div>`;
  content.innerHTML += getBasketSummaryTemplate(getSubtotal(), deliveryFee);
}

function getSubtotal() {
  let subtotal = 0;

  for (let i = 0; i < basket.length; i++) {
    subtotal += basket[i].price * basket[i].amount;
  }
  return subtotal;
}

function updatePage() {
  renderMeals(burgers, "burger-list");
  renderMeals(pizzas, "pizza-list");

  renderMeals(salads, "salad-list");
  renderBasket();
}

function findMeal(name) {
  let allMeals = burgers.concat(pizzas, salads);

  for (let i = 0; i < allMeals.length; i++) {
    if (allMeals[i].name == name) {
      return allMeals[i];
    }
  }
}

function getAmount(name) {
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].name == name) {
      return basket[i].amount;
    }
  }
  return 0;
}

function addToBasket(name) {
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].name == name) {
      increaseAmount(i);
      return;
    }
  }

  let meal = findMeal(name);
  basket.push({ name: meal.name, price: meal.price, amount: 1 });
  updatePage();
}

function increaseAmount(index) {
  basket[index].amount++;

  updatePage();
}

function decreaseAmount(index) {
  basket[index].amount--;

  updatePage();
}

function removeFromBasket(index) {
  basket.splice(index, 1);

  updatePage();
}

function buyNow() {
  basket = [];
  updatePage();
  document.getElementById("confirmation").showModal();
  confirmationTimer = setTimeout(closeConfirmation, 3000);
}

function closeConfirmation() {
  clearTimeout(confirmationTimer);
  document.getElementById("confirmation").close();
}

updatePage();
