import type { Product } from "./types.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { renderCartCount } from "./utils.mjs";

function addProductToCart(product: Product) {
  let currentCart = getLocalStorage("so-cart");
  if (!currentCart) {
    currentCart = [];
  }

  const existingItem = currentCart.find(
    (item: Product & {quantity?: number}) => item.id === product.id

  );

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  }

  else{
    currentCart.push({
      ...product, quantity: 1
    });
  }
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
  const cartIcon = document.querySelector('.cart');
  cartIcon?.classList.add('animating');
  cartIcon?.addEventListener('animationend', () => {
    cartIcon.classList.remove('animating');
  });
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  ?.addEventListener("click", addToCartHandler);
