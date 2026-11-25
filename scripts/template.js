function formatPrice(price) {
  return price.toFixed(2).replace(".", ",") + "€";
}

function getMealTemplate(meal) {
  let amount = getAmount(meal.name);

  let buttonText = "Add to basket";

  let buttonClass = "add-button";

  if (amount > 0) {
    buttonText = "Added " + amount;

    buttonClass = "add-button added";
  }

  return `
    <div class="meal-card">
      <img class="meal-image" src="${meal.image}" alt="${meal.name}" />
      <div class="meal-info">
        <h3>${meal.name}</h3>

        <p>${meal.description}</p>
      </div>
      <div class="meal-side">
        <p class="meal-price">${formatPrice(meal.price)}</p>

        <button class="${buttonClass}" onclick="addToBasket('${meal.name}')">${buttonText}</button>
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

function getDeleteButtonTemplate(index) {
  return `
    <button class="basket-button" onclick="removeFromBasket(${index})">

      <img src="./assets/icons/delete.svg" alt="Delete" />
    </button>
  `;
}

function getBasketItemTemplate(item, index) {
  let topButton = "";
  let leftButton = getDeleteButtonTemplate(index);

  if (item.amount > 1) {
    topButton = getDeleteButtonTemplate(index);
    leftButton = `<button class="basket-button" onclick="decreaseAmount(${index})">-</button>`;
  }

  return `
    <div class="basket-item">
      <div class="basket-item-row">
        <p class="basket-item-name">${item.amount} x ${item.name}</p>
        ${topButton}
      </div>
      <div class="basket-item-row">
        <div class="quantity">
          ${leftButton}
          <span>${item.amount}</span>
          <button class="basket-button" onclick="increaseAmount(${index})">+</button>
        </div>
        <p class="basket-item-price">${formatPrice(item.price * item.amount)}</p>
      </div>
    </div>
  `;
}

function getBasketSummaryTemplate(subtotal, deliveryFee) {
  let total = subtotal + deliveryFee;

  return `
    <div class="basket-summary">
      <div class="summary-row">
        <p>Subtotal</p>
        <p>${formatPrice(subtotal)}</p>
      </div>
      <div class="summary-row">
        <p>Delivery fee</p>
        <p>${formatPrice(deliveryFee)}</p>
      </div>
      <div class="summary-row summary-total">
        <p>Total</p>
        <p>${formatPrice(total)}</p>
      </div>
      <button class="buy-button" onclick="buyNow()">Buy now (${formatPrice(total)})</button>
    </div>
  `;
}
