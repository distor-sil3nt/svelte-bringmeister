import { fakeCartData } from './cart';
import { productsData } from './products';

export const getFromApi = () => {
	return {
		cart: async () => {
			return new Promise<typeof fakeCartData>((resolve) => {
				setTimeout(resolve, 2000, fakeCartData);
			});
		},
		products: async () => {
			return new Promise<typeof productsData>((resolve) => {
				setTimeout(resolve, 3000, productsData);
			});
		}
	};
}

export const api = getFromApi()
