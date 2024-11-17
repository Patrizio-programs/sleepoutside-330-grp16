import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const items = Array.isArray(cartItems) ? cartItems : [cartItems];
  const htmlItems = items.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");




    // Calculate and display total if there are items
    if (items.length > 0) {
      const total = items.reduce((sum, item) => sum + item.FinalPrice, 0);
      const cartFooter = document.querySelector(".cart-footer");
      const cartTotal = document.querySelector(".cart-total");
      cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
      cartFooter.classList.remove("hide");
    }
  
}



function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default renderCartContents;
renderCartContents();
