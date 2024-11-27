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
  cart.push(item);
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
