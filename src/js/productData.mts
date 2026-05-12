import type {Product} from "./types.mjs"

function convertToJson(res:Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = "tents") {
  return fetch(`../../public/json/${category}.json`)
  // return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then(function(data) { return data; });
}

export async function findProductById(id:string) {
  const products = await getData();
  return products.find(function(item:Product) { return item.id === id; });
}
