import { renderListWithTemplate } from "./utils.mjs";



function setImagePath(imagePath) {
  // Check if the path is already an absolute URL
  if (imagePath.startsWith("http")) {
      return imagePath;
  }
  // If it's a relative path, construct the full path
  // You might need to adjust this base URL according to your needs
  return `../images${imagePath.split("images")[1]}`;
}

function productCardTemplate(product) {
  return `<li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
          <img src="${setImagePath(product.Images.PrimaryMedium)}" 
               alt="Image of ${product.Name}">
          <h3 class="card__brand">${product.Brand.Name}</h3>
          <h2 class="card__name">${product.Name}</h2>
          <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.loading = false;
    this.error = null;
  }

  async init() {
    this.loading = true;
    try {
      const list = await this.fetchData();
      this.renderList(list);
    } catch (err) {
      console.error("Error fetching products:", err);
      this.setError("Failed to fetch products");
    } finally {
      this.loading = false;
    }
  }

  async fetchData() {
    const data = await this.dataSource.getData(this.category);
    return data || [];
  }

  renderList(list) {
    if (list.length > 0) {
      renderListWithTemplate(productCardTemplate, this.listElement, list);
    } else {
      this.listElement.innerHTML = "<div>No products found.</div>";
    }
  }

  setError(message) {
    this.error = message;
    this.listElement.innerHTML = `<div class="error">${message}</div>`;
  }


  updateBreadcrumb() {
    const categorySpan = document.getElementById("category-name");
    const itemCountSpan = document.getElementById("item-count");
    
    // Capitalize first letter of category
    const formattedCategory = this.category.charAt(0).toUpperCase() + this.category.slice(1);
    
    categorySpan.textContent = formattedCategory;
    if (itemCountSpan) {
      itemCountSpan.textContent = ` (${this.products.length} items)`;
    }
  }
}
