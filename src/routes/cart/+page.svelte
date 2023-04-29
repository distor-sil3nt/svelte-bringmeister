<script lang="ts">
	import { Loader } from '@/components';
	import type { Product } from '@/models';
	import { getFromApi } from '@/utils/api';
</script>

<h2>Cart</h2>

{#await getFromApi().cart()}
	<Loader width={50} text="Cart" />
{:then cartData}
	<pre>{JSON.stringify(cartData.products.length, null, 4)}</pre>
{:catch error}
	<p>An error occured: {error.message}</p>
{/await}
