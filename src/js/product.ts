import type { Product } from "./types.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { renderCartCount } from "./utils.mjs";

function addProductToCart(product: Product) {
  let currentCart = getLocalStorage("so-cart");
  if (!currentCart) {
    currentCart = [];
  }
  currentCart.push(product);
  setLocalStorage("so-cart", currentCart);
  renderCartCount();
}
// add to cart button event handler
async function addToCartHandler(e: Event) {
  const target = e.target as HTMLButtonElement;
  if (target.dataset.id) {
    const product = await findProductById(target.dataset.id);
    addProductToCart(product);
  }
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  ?.addEventListener("click", addToCartHandler);
