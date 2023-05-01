import type { HttpStatusType } from '@/models';

export const checkImage = async (src: string): Promise<HttpStatusType> => {
	return new Promise((resolve) => {
		const image = new Image();

		image.onload = () => {
			resolve('success');
		};

		image.onerror = () => {
			resolve('error');
		};

		image.src = src;
	});
};
