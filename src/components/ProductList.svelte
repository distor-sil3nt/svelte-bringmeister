<script lang="ts">
	import { ProductItem } from '@/components';
	import type { Product } from '@/models';
	import { filterProducts, search } from '$lib';
	import { api } from '@/utils/api';

	import { fade } from 'svelte/transition';

	export let products: Product[];
</script>

<ul id="product-list" in:fade>
	{#each filterProducts(products, $search) as product}
		<li>
			<ProductItem {product} />
		</li>
	{:else}
		<li><p class="info">No products available</p></li>
	{/each}
</ul>

<style lang="sass">
  @use '../styles/variables' as *

  ul
    display: grid
    grid-template-columns: 1fr
    gap: $small
    padding-left: 0
    list-style: none

    @media (min-width: $mobile)
      grid-template-columns: repeat(auto-fill, minmax(300px, 400px))

    li
      display: flex
      list-style: inherit

      :global(article)
        width: 100%
  
  .info
    width: 100%
</style>
