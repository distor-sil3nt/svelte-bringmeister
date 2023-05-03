import type { AwaitedPromise, Product } from '@/models';
import type { api } from '@/utils/api';

export const filterProducts = (products: Product[], searchTerm?: string): Product[] => {
	return searchTerm
		? products.filter((product) => product.name.toLowerCase().match(searchTerm.toLowerCase()))
		: products;
};

export const getProducts = async (
	productsData: AwaitedPromise<ReturnType<typeof api.products>>
): Promise<Product[]> => {
	return productsData.edges.map(({ node: { sku, image, name, prices } }) => ({
		sku,
		image,
		name,
		basePrice: prices.basePrice,
		baseUnit: prices.baseUnit
	}));
};
