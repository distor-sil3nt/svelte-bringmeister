<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let searchTerm: string;
</script>

<form>
	<input
		type="search"
		autocomplete="off"
		aria-label="Product Search"
		aria-controls="product-list"
		placeholder="Suche"
		bind:value={searchTerm}
		on:keyup={() => {
			dispatch('updateSearch');
		}}
	/>
</form>
