<script lang="ts">
	import type { Product } from '@/models';
	import { formatCurrency } from '@/utils/helpers';

	export let product: Product;

	$: ({ name, image, basePrice, baseUnit } = product);

	const formattedBasePrice = formatCurrency(product.basePrice, 'de-De', 'EUR');
</script>

<article>
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
    border-radius: 2px
    box-shadow: 2px 2px 8px rgba($black, 0.1)
    padding: 1em
    background-color: $white
</style>
