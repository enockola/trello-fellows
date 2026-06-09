import { defineCollection } from "astro:content";

// we can also create collections that load from markdown files in a directory...this is an example of how to do that.
// const posts = defineCollection({
//   loader: glob({ pattern: "**/*.md", base: "./src/content/blog" })
// });

// load our product info from the tents.json file
const products = defineCollection({
  loader: async () => {
    const serverURL = import.meta.env.PUBLIC_SERVER_URL || "";
    const response = await fetch(`${serverURL}products?limit=200`);
    const data = await response.json();
    return data.results || data;
  }
});

export const collections = { products };