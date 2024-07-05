document.addEventListener("DOMContentLoaded", function () {
  const cartProductsList = document.getElementById("cart-products-list");

  function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    displayCartItems(cart);
  }

  function displayCartItems(cart) {
    cartProductsList.innerHTML = "";

    if (cart.length === 0) {
      cartProductsList.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    cart.forEach((product, index) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("cart-item");

      productDiv.innerHTML = `
        <img src="${product.picture_link}" alt="${product.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h3>${product.name}</h3>
          <p>${product.category} | $${product.price} | ${product.color} | ${product.size} | ${product.gender}</p>
          <button class="remove-from-cart-button" data-index="${index}">Remove</button>
        </div>
      `;

      cartProductsList.appendChild(productDiv);
    });

    document.querySelectorAll(".remove-from-cart-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        removeFromCart(index);
      });
    });
  }

  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }

  loadCart();
});
