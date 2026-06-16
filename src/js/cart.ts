import { getLocalStorage } from "./utils.mjs";
import type { Product } from "./types.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item: Product) => cartItemTemplate(item));
  const listEl = document.querySelector(".product-list");
  if (listEl) listEl.innerHTML = htmlItems.join("");

  if (cartItems.length > 0) {
  const footer = document.querySelector(".cart-footer");
  footer?.classList.remove("hide");

  const total = cartItems.reduce((sum: number, item: Product) => sum + item.finalPrice, 0);

    const totalElement = document.querySelector(".cart-total");

    if (totalElement) {

      totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
    }
  }
}


function cartItemTemplate(item: Product) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.image}"
      alt="${item.name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.name}</h2>
  </a>
  <p class="cart-card__color">${item.colors[0].colorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.finalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
