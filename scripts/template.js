function formatPrice(price) {
  return price.toFixed(2).replace(".", ",") + "€";
}

function getMealTemplate(meal) {
  return `
    <div class="meal-card">
      <img class="meal-image" src="${meal.image}" alt="${meal.name}" />
      <div class="meal-info">
        <h3>${meal.name}</h3>
        <p>${meal.description}</p>
      </div>
      <div class="meal-side">
        <p class="meal-price">${formatPrice(meal.price)}</p>
        <button class="add-button" onclick="addToBasket('${meal.name}')">Add to basket</button>
      </div>
    </div>
  `;
}

function getEmptyBasketTemplate() {
  return `
    <p class="basket-empty-text">
      Nothing here yet.<br />Go ahead and choose something delicious!
    </p>
    <img class="basket-empty-icon" src="./assets/icons/cart.svg" alt="Cart" />
  `;
}

function getBasketItemTemplate(item) {
  return `
    <div class="basket-item">
      <p class="basket-item-name">${item.amount} x ${item.name}</p>
      <p class="basket-item-price">${formatPrice(item.price * item.amount)}</p>
    </div>
  `;
}
