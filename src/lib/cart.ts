import type { AwaitedPromise } from '@/models';
import type { api } from '@/utils/api';

export const getCounts = (
	cartData: AwaitedPromise<ReturnType<typeof api.cart>>
): { [key: string]: number } => {
	return cartData.products.reduce(
		(previous, product) => ({
			...previous,
			[product.sku]: product.quantity
		}),
		{}
	);
};
