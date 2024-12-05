import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ExternalServices("tents");
const productId = getParam("product");


const product = new ProductDetails(productId, dataSource);
product.init();

function addProductToCart(item) {
  let cart = getLocalStorage("so-cart") || [];
  cart = Array.isArray(cart) ? cart : [];
  
  // Check if the item already exists in the cart
  const existingItem = cart.find(cartItem => cartItem.Id === item.Id);
  
  if (existingItem) {
      // If item exists, increment its quantity
      existingItem.Quantity = (existingItem.Quantity || 1) + 1;
  } else {
      // If item is new, add it with quantity 1
      item.Quantity = 1;
      cart.push(item);
  }
  
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const item = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(item);
  
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
