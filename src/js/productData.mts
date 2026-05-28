import type {Product} from "./types.mjs"

const baseURL = import.meta.env.PUBLIC_SERVER_URL;

function convertToJson(res:Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getProducts(category = "tents") {
  return fetch(baseURL + `products?category=${category}`)
  // return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then(function(data) { return data; });
}

export async function findProductById(id:string) {
    const response = await fetch(baseURL + `products/${id}`);
    const product = await convertToJson(response) as Product;
    console.log(product)
    return product;
}
