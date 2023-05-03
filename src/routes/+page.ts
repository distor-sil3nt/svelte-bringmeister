import { setLoadingState } from '$lib';
import type { PageLoad } from './$types';
import { api } from '@/utils/api';

export const load: PageLoad = async () => {
	const getProducts = async () => {
		return await api.products();
	};

	const getCart = async () => {
		return await api.cart();
	};

	return {
		products: setLoadingState(getProducts),
		cart: setLoadingState(getCart)
	};
};
