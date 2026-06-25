import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import type { Product } from "./types.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const htmlItems = cartItems.map((item: Product) => cartItemTemplate(item));
    const listEl = document.querySelector(".product-list");
    if (listEl) listEl.innerHTML = htmlItems.join("");

    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", removeItemFromCart)
    });
  }

  if (cartItems.length > 0) {
    const footer = document.querySelector(".cart-footer");
    footer?.classList.remove("hide");

    const total = cartItems.reduce(
      (sum: number, item: Product) => sum + item.finalPrice * (item.quantity || 1), 0
    );

    const totals = document.querySelector(".cart-total");

    if (totals) {
      totals.innerHTML = `Total: $${total.toFixed(2)}`;
    }
  }
}

function removeItemFromCart(clickEvent: Event) {
  const target = clickEvent.target as HTMLElement;
  const id = target.dataset.id;

  let cartItems = getLocalStorage("so-cart") || [];

  const item = cartItems.find(
    (product: Product & {quantity : number}) => product.id == id
  );

  if (item) {
    if ((item.quantity || 1) > 1) {
      item.quantity!--;
    }

    else {
      cartItems = cartItems.filter(
        (product: Product) => product.id !== id
      );
    }
  }
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function cartItemTemplate(item: Product) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.images.primaryLarge}"
      alt="${item.name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.name}</h2>
  </a>
  <img class="remove-item" data-id="${item.id}" src="/images/flavicon/cross.png" alt="Remove Item" />
  <p class="cart-card__color">${item.colors[0].colorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
  <p class="cart-card__price">$${item.finalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
