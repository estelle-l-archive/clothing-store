function loadCSV(url, callback) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => callback(data))
    .catch((error) => console.error("Error loading CSV file:", error));
}

function parseCSV(data) {
  const lines = data.split("\n");
  const headers = lines[0].split(",").map((header) => header.trim());
  const items = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].split(",");
    if (line.length === headers.length) {
      const item = {};
      headers.forEach((header, index) => {
        item[header] = line[index].trim();
      });
      items.push(item);
    }
  }
  return items;
}

function displayProducts(products) {
  const productList = document.getElementById("product-info-list");
  productList.innerHTML = ""; // Clear any existing content

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-card");

    productDiv.innerHTML = `
      <img src="${product.picture_link}" alt="${product.name}" class="product-image">
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: $${product.price}</p>
      <p>Color: ${product.color}</p>
      <p>Size: ${product.size}</p>
      <p>Gender: ${product.gender}</p>
    `;

    productList.appendChild(productDiv);
  });
}

loadCSV("javascript/items.csv", (data) => {
  const inventory = parseCSV(data);
  displayProducts(inventory);
});
