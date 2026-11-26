let basket = [];
let deliveryFee = 4.99;
let confirmationTimer;

function init() {
  updatePage();
}

function renderMeals(meals, containerId) {
  let container = document.getElementById(containerId);
  container.innerHTML = "";

  for (let i = 0; i < meals.length; i++) {
    container.innerHTML += getMealTemplate(meals[i]);
  }
}

function renderBasket() {
  let content = document.getElementById("basket-content");
  let items = "";
  let scrollPosition = getBasketScrollPosition();

  if (basket.length == 0) {
    content.innerHTML = getEmptyBasketTemplate();

    return;
  }

  for (let i = 0; i < basket.length; i++) {
    items += getBasketItemTemplate(basket[i], i);
  }
  content.innerHTML = `<div class="basket-items">${items}</div>`;
  content.innerHTML += getBasketSummaryTemplate(getSubtotal(), deliveryFee);
  document.querySelector(".basket-items").scrollTop = scrollPosition;
}

function getBasketScrollPosition() {
  let list = document.querySelector(".basket-items");

  if (list) {
    return list.scrollTop;
  }
  return 0;
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
  renderBasketCount();
}

function renderBasketCount() {
  let count = 0;
  let badge = document.getElementById("basket-count");

  for (let i = 0; i < basket.length; i++) {
    count += basket[i].amount;
  }

  if (count > 0) {
    badge.textContent = count;
  } else {
    badge.textContent = "";
  }
}

function openBasket() {
  document.getElementById("basket-wrapper").classList.add("open");
  document.body.classList.add("no-scroll");
}

function closeBasket() {
  document.getElementById("basket-wrapper").classList.remove("open");
  document.body.classList.remove("no-scroll");
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
  let meal = findMeal(name);

  for (let i = 0; i < basket.length; i++) {
    if (basket[i].name == name) {
      increaseAmount(i);
      return;
    }
  }

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
  closeBasket();
  document.getElementById("confirmation").showModal();
  confirmationTimer = setTimeout(closeConfirmation, 3000);
}

function closeConfirmation() {
  clearTimeout(confirmationTimer);
  document.getElementById("confirmation").close();
}
