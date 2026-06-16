<script lang="ts">
  import { onMount } from "svelte";
  import { getProducts } from "../js/productData.mts";
  import type { Product } from "../js/types.mts";
  import { getParam } from "../js/utils.mjs";
  import ProductSummary from "./ProductSummary.svelte";

// declare these out here as state so we can us it in our template below
  let category = $state(""); 
  let products: Product[] = $state([]);
  let loading = $state(true);

  async function init() {
    category = getParam("category") || "tents";
    try {
      const data = await getProducts(category);
      products = data.results || data;;
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      loading = false;
    }
  }

  onMount(init);
</script>

<h2>Top products: {category}</h2>

{#if loading}
  <p>Loading products...</p>
{:else if products.length === 0}
  <p>No products found for this category.</p>
{:else}
  <ul class="product-list">
    {#each products as product}
      <ProductSummary {product} />
    {/each}
  </ul>
{/if}