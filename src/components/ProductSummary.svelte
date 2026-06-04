<script lang="ts">
   import type { Product } from "../js/types.mts";
   let { product }:{ product:Product } = $props();
</script>

<h2>Production Summary</h2>
<li class="product-card">
<a href="/products/{product.id}">
  <img src={product.images.primaryLarge} alt={product.name} />
  <div class="product-info">
    <h3>{product.name}</h3>
    <p>${product.finalPrice.toFixed(2)}</p>
  </div>
</a>
</li>