import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const items = Array.isArray(cartItems) ? cartItems : [cartItems];
  const htmlItems = items.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
  // Add listeners to remove buttons after rendering
  addRemoveListener();

  // Calculate and display total if there are items
  if (items.length > 0) {
    const total = items.reduce((sum, item) => sum + item.FinalPrice, 0);
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
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}




export default renderCartContents;
renderCartContents();
