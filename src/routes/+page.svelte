<script lang="ts">
	import { Loader, ProductTile } from '@/components';
	import type { Product } from '@/models';
	import { getFromApi } from '@/utils/api';
	import { setLoadingState } from '$lib/store.ts';

	import { getContext, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let visible = false;
	const search = getContext('search');

	const getProducts = async (): Promise<Product[]> => {
		const data = await getFromApi().products();

		return data.edges.map(({ node: productData }) => ({
			image: productData.image,
			name: productData.name,
			basePrice: productData.prices.basePrice,
			baseUnit: productData.prices.baseUnit
		}));
	};

	const filterProducts = (products: Product[], searchTerm?: string): Product[] => {
		return searchTerm
			? products.filter((product) => product.name.toLowerCase().match(searchTerm.toLowerCase()))
			: products;
	};
</script>

<h1>Bringmeister coding challenge</h1>
<p>Search Term: {$search}</p>

<h2>Product</h2>
{#await setLoadingState(getProducts)}
	<div transition:fade on:introstart={() => (visible = false)} on:outroend={() => (visible = true)}>
		<Loader width={50} text="Products" />
	</div>
{:then products}
	{#if visible}
		<ul id="product-list" in:fade>
			{#each filterProducts(products, $search) as product}
				<li>
					<ProductTile {product} />
				</li>
			{:else}
				<li><p class="info">No products available</p></li>
			{/each}
		</ul>
	{/if}
{:catch error}
	<p class="error" transition:fade>An error occured: {error.message}</p>
{/await}
	<p class="error" transition:fade>An error occured: Error</p>
	<p class="info" transition:fade>No products available</p>

<style lang="sass">
  @use '../styles/variables/spaces' as *

  ul
    display: grid
    grid-template-columns: 1fr
    gap: $small
    padding-left: 0
    list-style: none

    @media (min-width: 480px)
      grid-template-columns: repeat(auto-fill, minmax(300px, 400px))

    li
      display: flex
      list-style: inherit

      :global(article)
        width: 100%
</style>
