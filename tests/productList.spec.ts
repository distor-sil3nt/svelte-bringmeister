import { expect, test } from './baseFixtures.js';

test('renders an error message when response fails', async ({ page }) => {
	await page.goto('/');

	await page.route('**/*', (route) => {
		console.info(route.request().resourceType());
		return route.request().resourceType() === 'script' ? route.abort() : route.continue();
	});

	await page.getByRole('list').waitFor();
});
