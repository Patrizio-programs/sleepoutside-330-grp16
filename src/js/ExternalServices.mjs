const baseURL = "https://wdd330-backend.onrender.com/";
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor(category) {
     this.category = category;
     this.path = `../json/${this.category}.json`;
  }
async getData(category) {
  try {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await response.json();
    return data.Result || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}
