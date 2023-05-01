<script lang="ts">
	import { productsData } from './../utils/products.ts';
	import { Loader, ProductTile } from '@/components';
	import type { Product } from '@/models';
	import { getFromApi } from '@/utils/api';
	import { cartCounts, setLoadingState } from '$lib';

	import { getContext, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let visible = false;

	const search = getContext('search');

	onMount(async () => {
		cartCounts.set(await getCounts());
	});

	const getCounts = async (): { [key: string]: number } => {
		const cart = await getFromApi().cart();

		return cart.products.reduce(
			(previous, product) => ({
				...previous,
				[product.sku]: product.quantity
			}),
			{}
		);
	};

	const getProducts = async (): Promise<Product[]> => {
		const data = await getFromApi().products();

		return data.edges.map(({ node: { sku, image, name, prices } }) => ({
			sku,
			image,
			name,
			basePrice: prices.basePrice,
			baseUnit: prices.baseUnit,
			cartCount: $cartCounts[sku] ?? 0
		}));
	};

	const filterProducts = (products: Product[], searchTerm?: string): Product[] => {
		return searchTerm
			? products.filter((product) => product.name.toLowerCase().match(searchTerm.toLowerCase()))
			: products;
	};
</script>

<h1>Bringmeister coding challenge</h1>
<p>Results for Products</p>

<h2>Products</h2>
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
