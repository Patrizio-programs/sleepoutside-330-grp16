import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="../product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Image}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
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
}
