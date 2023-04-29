<script lang="ts">
	import { Loader } from '@/components';
	import { getFromApi } from '@/utils/api';
	import { setLoadingState } from '$lib';

	const getCart = () => {
		return getFromApi().cart();
	};
</script>

<h2>Cart</h2>

{#await setLoadingState(getCart)}
	<Loader width={50} text="Cart" />
{:then cartData}
	<pre>{JSON.stringify(cartData.products.length, null, 4)}</pre>
{:catch error}
	<p class="error">An error occured: {error.message}</p>
{/await}
