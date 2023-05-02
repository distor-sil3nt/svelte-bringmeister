import type { Product } from '@/models';
import { getFromApi } from '@/utils/api';

export const filterProducts = (products: Product[], searchTerm?: string): Product[] => {
  return searchTerm
    ? products.filter((product) => product.name.toLowerCase().match(searchTerm.toLowerCase()))
    : products;
};

export const getProducts = async (cartCounts: { [key: string]: number }): Promise<Product[]> => {
	const data = await getFromApi().products();

	return data.edges.map(({ node: { sku, image, name, prices } }) => ({
		sku,
		image,
		name,
		basePrice: prices.basePrice,
		baseUnit: prices.baseUnit,
		cartCount: cartCounts[sku] ?? 0
	}));
};
