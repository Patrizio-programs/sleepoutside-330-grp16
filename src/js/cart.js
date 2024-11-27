import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const items = Array.isArray(cartItems) ? cartItems : [cartItems];
  const htmlItems = items.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
  // Add listeners to remove buttons and quantity inputs after rendering
  addRemoveListener();
  addQuantityListeners();

  // Calculate and display total if there are items
  if (items.length > 0) {
    const total = items.reduce((sum, item) => {
      const quantity = item.Quantity || 1;
      return sum + (item.FinalPrice * quantity);
    }, 0);
    const cartFooter = document.querySelector(".cart-footer");
    const cartTotal = document.querySelector(".cart-total");
    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
    cartFooter.classList.remove("hide");
  }
}

function removeItem(id) {
  let items = getLocalStorage("so-cart");
  if (items.length > 1) {
    items = items.filter((item) => item.Id !== id);
  } else {
    items = [];
  }
  localStorage.setItem("so-cart", JSON.stringify(items));
  renderCartContents();
}

function addRemoveListener() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      removeItem(id);
    });
  });
}





function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <span class="remove-item" data-id="${item.Id}">X</span>
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="cart-card__quantity">
      <label for="qty-${item.Id}">qty:</label>
      <input 
        type="number" 
        id="qty-${item.Id}" 
        class="quantity-input" 
        value="${item.Quantity || 1}" 
        min="1"
        data-id="${item.Id}"
      >
    </div>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}


function updateQuantity(id, newQuantity) {
  let items = getLocalStorage("so-cart");
  const itemIndex = items.findIndex(item => item.Id === id);
  
  if (itemIndex >= 0) {
    items[itemIndex].Quantity = parseInt(newQuantity);
    localStorage.setItem("so-cart", JSON.stringify(items));
    renderCartContents();
  }
}

function addQuantityListeners() {
  const quantityInputs = document.querySelectorAll(".quantity-input");
  quantityInputs.forEach(input => {
    input.addEventListener("change", (e) => {
      const id = e.target.dataset.id;
      const newQuantity = e.target.value;
      if (newQuantity > 0) {
        updateQuantity(id, newQuantity);
      }
    });
  });
}




export default renderCartContents;
renderCartContents();
