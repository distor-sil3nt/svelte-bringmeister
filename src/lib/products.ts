import type { Product } from '@/models';
import type { api } from '@/utils/api';

export const filterProducts = (products: Product[], searchTerm?: string): Product[] => {
	return searchTerm
		? products.filter((product) => product.name.toLowerCase().match(searchTerm.toLowerCase()))
		: products;
};

export const getProducts = async (
	productsPromise: ReturnType<typeof api.products>
): Promise<Product[]> => {
	const productsData = await productsPromise;

	return productsData.edges.map(({ node: { sku, image, name, prices } }) => ({
		sku,
		image,
		name,
		basePrice: prices.basePrice,
		baseUnit: prices.baseUnit
	}));
};
