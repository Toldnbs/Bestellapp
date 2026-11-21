function renderMeals(meals, containerId) {
  let container = document.getElementById(containerId);
  container.innerHTML = "";

  for (let i = 0; i < meals.length; i++) {
    container.innerHTML += getMealTemplate(meals[i]);
  }
}

function init() {
  renderMeals(burgers, "burger-list");
  renderMeals(pizzas, "pizza-list");
  renderMeals(salads, "salad-list");
}

init();
