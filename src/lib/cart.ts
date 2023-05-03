import type { api } from '@/utils/api';

export const getCounts = async (
	cartPromise: ReturnType<typeof api.cart>
): Promise<{ [key: string]: number }> => {
	const cartData = await cartPromise;

	return cartData.products.reduce(
		(previous, product) => ({
			...previous,
			[product.sku]: product.quantity
		}),
		{}
	);
};
