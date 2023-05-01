<script lang="ts">
	import Icon from './Icon.svelte';
	export let name: string;
</script>

<div aria-label={`Placeholder image for product ${name}`}>
	<Icon name={'image'} />
</div>

<style lang="sass">
  @use '../styles/variables/colors' as *

  div
    display: flex
    align-items: center
    justify-content: center
    border: 2px solid $grey-300
    height: 175px
    width: 175px

  * > :global(svg)
    width: 80px
    fill: $grey-300
</style>
