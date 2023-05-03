<script lang="ts">
	import { Loader, ProductList } from '@/components';
	import { getProducts, setLoadingState } from '$lib';
	import { api } from '@/utils/api';

	import { fade } from 'svelte/transition';

	let visible = false;
  let products = api.products();
</script>

<h1>Bringmeister coding challenge</h1>
<p>Results for Products</p>

<h2>Products</h2>

{#await setLoadingState(() => getProducts(products))}
	<div transition:fade on:introstart={() => (visible = false)} on:outroend={() => (visible = true)}>
		<Loader width={50} text="Products" />
	</div>
{:then products}
	{#if visible}
		<ProductList {products} />
	{/if}
{:catch error}
	<p class="error" transition:fade>An error occured: {error.message}</p>
{/await}
