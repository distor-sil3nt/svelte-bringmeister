<script lang="ts">
	import type { Product } from '@/models';
	import { formatCurrency } from '@/utils/helpers';

	export let product: Product;

	$: ({ name, image, basePrice, baseUnit, cartCount } = product);

	const formattedBasePrice = formatCurrency(product.basePrice, 'de-DE', 'EUR');
</script>

<article>
	Count: {cartCount}
	<img src={`${image}?imwidth=175`} alt={`Image of ${name}`} />
	<h3>{name}</h3>
	<p>
		<data aria-label="base price in Euro" value={basePrice}>{formattedBasePrice}</data>
		<span aria-label="base unit">{baseUnit}</span>
	</p>
</article>

<style lang="sass">
  @use '../styles/variables/colors' as *

  article
    display: grid
    border-radius: 2px
    box-shadow: 2px 2px 8px rgba($black, 0.1)
    padding: 1em
    background-color: $white
  
  img
    justify-self: center
  
  p
    align-self: end
    margin-bottom: 0

    data
      display: block
      font-size: 1.8rem
      font-weight: 700
      color: $black

    span
      font-size: 1rem
</style>
