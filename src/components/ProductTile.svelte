<script lang="ts">
	import { Placeholder } from '@/components';
	import type { HttpStatusType, Product } from '@/models';
	import { checkImage, formatCurrency } from '@/utils/helpers';
	import { beforeUpdate, onMount } from 'svelte';

	export let product: Product;

	$: ({ name, image, basePrice, baseUnit, cartCount } = product);
	$: src = `${image}?imwidth=175`;

	const formattedBasePrice = formatCurrency(product.basePrice, 'de-DE', 'EUR');

	let status: HttpStatusType;

	onMount(async () => {
		status = await checkImage(src);
	});

	beforeUpdate(async () => {
		status = await checkImage(src);
	});
</script>

<article>
	<figure>
		{#if status === 'success'}
			<img {src} alt={`Image of ${name}`} />
		{:else}
			<Placeholder {name} />
		{/if}

		{#if cartCount}
			<div aria-label="amount in cart">
				<div>{`${cartCount}x`}</div>
				<div class="label">im Warenkorb</div>
			</div>
		{/if}
	</figure>
	<h3>{name}</h3>
	<p>
		<data aria-label="base price in Euro" value={basePrice}>{formattedBasePrice}</data> /
		<span aria-label="base unit">{baseUnit}</span>
	</p>
</article>

<style lang="sass">
  @use '../styles/variables' as *

  article
    display: grid
    border-radius: 2px
    box-shadow: 2px 2px 8px rgba($black, 0.1)
    padding: 1em
    background-color: $white
  
  figure
    position: relative
    justify-self: center

    div
      text-align: center
  
  h3
    margin-bottom: $small
    font-size: 1.6rem
    font-weight: 600
  
  p
    align-self: end
    margin: 0
    font-weight: 600
    font-size: 1.2rem
  
  [aria-label*="amount"]
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    position: absolute
    top: 50%
    left: 0
    right: 0
    height: 80px
    transform: translateY(-50%)
    background: rgba($grey-600,.6)
    color: $white
    border-radius: 3px
    text-align: center
    font-weight: 700
    font-size: 2.8rem
    line-height: 3.6rem
    padding: $small 0
    pointer-events: none

  .label
    font-weight: 600
    font-size: 1.4rem
    line-height: 2rem
</style>
