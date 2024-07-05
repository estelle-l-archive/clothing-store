function populateFilterOptions(inventory) {
  const categories = new Set();
  const colors = new Set();
  const sizes = new Set();

  inventory.forEach(product => {
    categories.add(product.category);
    colors.add(product.color);
    sizes.add(product.size);
  });

  const createCheckbox = (value) => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" value="${value}"> ${value}`;
    return label;
  };

  const categoryOptions = document.getElementById('category-options');
  categories.forEach(category => {
    categoryOptions.appendChild(createCheckbox(category));
  });

  const colorOptions = document.getElementById('color-options');
  colors.forEach(color => {
    colorOptions.appendChild(createCheckbox(color));
  });

  const sizeOptions = document.getElementById('size-options');
  sizes.forEach(size => {
    sizeOptions.appendChild(createCheckbox(size));
  });
}

function filterByCategory(products, selectedCategories) {
  return products.filter(product => selectedCategories.includes(product.category));
}

function filterByPrice(products, maxPrice) {
  return products.filter(product => product.price <= maxPrice);
}

function filterByColor(products, selectedColors) {
  return products.filter(product => selectedColors.includes(product.color));
}

function filterBySize(products, selectedSizes) {
  return products.filter(product => selectedSizes.includes(product.size));
}

function applyFilters(inventory) {
  const selectedCategories = [...document.querySelectorAll('#category-options input:checked')].map(input => input.value);
  const selectedColors = [...document.querySelectorAll('#color-options input:checked')].map(input => input.value);
  const selectedSizes = [...document.querySelectorAll('#size-options input:checked')].map(input => input.value);
  const maxPrice = document.getElementById('price-slider').value;

  let filteredProducts = inventory;
  if (selectedCategories.length > 0) {
    filteredProducts = filterByCategory(filteredProducts, selectedCategories);
  }
  filteredProducts = filterByPrice(filteredProducts, maxPrice);
  if (selectedColors.length > 0) {
    filteredProducts = filterByColor(filteredProducts, selectedColors);
  }
  if (selectedSizes.length > 0) {
    filteredProducts = filterBySize(filteredProducts, selectedSizes);
  }

  displayProducts(filteredProducts);
}

function initializeFilters(inventory) {
  populateFilterOptions(inventory);

  const filterOptions = document.querySelectorAll('.filter-options input[type="checkbox"]');
  filterOptions.forEach(option => {
    option.addEventListener('change', () => applyFilters(inventory));
  });

  const priceSlider = document.getElementById('price-slider');
  priceSlider.addEventListener('input', () => {
    document.getElementById('price-value').textContent = priceSlider.value;
    applyFilters(inventory);
  });

  // Apply all filters initially to reflect any default states
  applyFilters(inventory);
}