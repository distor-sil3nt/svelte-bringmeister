import { writable } from 'svelte/store';

export const isLoading = writable(false);
export const search = writable('');

export const setLoadingState = async <T>(fn: () => Promise<T>): Promise<T> => {
	isLoading.set(true);
	const promise = await fn();
	isLoading.set(false);

	return promise;
};
