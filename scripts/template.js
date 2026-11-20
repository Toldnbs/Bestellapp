function getMealTemplate(meal) {
  let price = meal.price.toFixed(2).replace(".", ",");

  return `
    <div class="meal-card">
      <img class="meal-image" src="${meal.image}" alt="${meal.name}" />
      <div class="meal-info">
        <h3>${meal.name}</h3>
        <p>${meal.description}</p>
      </div>
      <div class="meal-side">
        <p class="meal-price">${price}€</p>
        <button class="add-button">Add to basket</button>
      </div>
    </div>
  `;
}
