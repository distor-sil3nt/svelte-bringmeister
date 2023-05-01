<script lang="ts">
	export let name: string;
</script>

{#await import(`@/assets/icons/${name}.svg?component`) then component}
	<svelte:component this={component.default} aria-hidden="true" focusable="false" role="img" />
{/await}
