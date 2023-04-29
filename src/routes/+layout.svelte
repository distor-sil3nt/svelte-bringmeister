<script lang="ts">
	import BringmeisterLogo from '@/assets/images/bringmeister.svg?component';
	import { Search } from '@/components';
	import { isLoading, search } from '$lib';
	import { setContext } from 'svelte';

	let searchTerm: string;
	let filteredList: Product[];

	$: {
		isLoading.set(false);
		search.set(searchTerm);
	}

	setContext('isLoading', isLoading);
	setContext('search', search);

	const setSearchTerm = () => {
		setContext('search', searchTerm);
	};
</script>

<header>
	<BringmeisterLogo aria-hidden="true" focusable="false" role="img" class="logo" />
	<Search bind:searchTerm on:updateSearch={setSearchTerm} />
</header>

<main aria-busy={$isLoading}>
	<slot />
</main>

<footer />

<style global lang="sass">
  @import '../styles/app'

  main,
  footer
    padding-right: $medium
    padding-left: $medium

  header
    padding: $medium
    background-color: $white

  .logo
    width: 250px
</style>
