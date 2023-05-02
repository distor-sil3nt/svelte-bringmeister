<script lang="ts">
	import BringmeisterLogo from '@/assets/images/bringmeister.svg?component';
	import { Search } from '@/components';
	import { isLoading, search } from '$lib';
	import { setContext } from 'svelte';

	let searchTerm: string;

	$: {
		isLoading.set(false);
		search.set(searchTerm);
	}

	setContext('isLoading', isLoading);
	setContext('search', search);

	const setSearch = () => {
		search.set(searchTerm);
	};
</script>

<header>
	<a href="/" aria-label="Back home"
		><BringmeisterLogo aria-hidden="true" focusable="false" role="img" class="logo" />
	</a>
	<Search bind:searchTerm on:updateSearch={setSearch} />
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
    display: flex
    align-items: center
    padding: $medium
    background-color: $white

    > *
      &:not(:last-child)
        padding-right: $large

  .logo
    width: 100%
    @media (min-width: $mobile)
      width: 250px
</style>
