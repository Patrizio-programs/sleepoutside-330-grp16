import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");

const listing = new ProductList(category, dataSource, element);
listing.init();




// Add an event listener for category changes
document.addEventListener("hashchange", () => {
  const newCategory = getParam("category");
  // Update the listing when category changes
  listing.update(newCategory);
});

// Function to update the listing based on the new category
listing.update = function(newCategory) {
  this.category = newCategory;
  this.render();
};
