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

<style lang="sass">
  @use '../styles/variables' as *
  @use '../styles/variables/mixins' as *

  input
    outline: 2px solid rgba($black,0)
    border: none
    border-radius: 22px
    padding: 9px 20px
    height: 44px
    min-width: 10px
    width: 100%
    line-height: 22px
    font-family: inherit
    font-weight: 600
    font-size: 16px
    color: $grey-700
    background-color: $grey-200
    transition: box-shadow .25s

    &:focus
      background-color: $white
      box-shadow: inset 0 0 0 2px $green-light

    +placeholder
      line-height: 22px
      font-weight: 500
      color: $grey
</style>
