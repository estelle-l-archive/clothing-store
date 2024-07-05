function sortProducts(products, key, order = 'asc') {
  return products.sort((a, b) => {
    if (order === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return a[key] < b[key] ? 1 : -1;
    }
  });
}

function initializeSort(inventory) {
  document.getElementById("sort-price-asc").addEventListener("click", () => {
    const sortedProducts = sortProducts([...inventory], 'price', 'asc');
    displayProducts(sortedProducts);
  });

  document.getElementById("sort-price-desc").addEventListener("click", () => {
    const sortedProducts = sortProducts([...inventory], 'price', 'desc');
    displayProducts(sortedProducts);
  });

  document.getElementById("sort-item-name").addEventListener("click", () => {
    const sortedProducts = sortProducts([...inventory], 'name', 'asc');
    displayProducts(sortedProducts);
  });
}