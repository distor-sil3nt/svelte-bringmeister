import { expect, test } from './baseFixtures.js';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test('shows placeholder if product image cannot be loaded', async ({ page }) => {
	// arrange
	await page.route('**/*', (route) => {
		return route.request().resourceType() === 'image' ? route.abort() : route.continue();
	});

	// act
	await page.getByRole('list').waitFor();

	const placehodlerCount = await page
		.locator('[aria-label^="Placeholder image for product"]')
		.count();

	// assert
	expect(placehodlerCount).toBeGreaterThan(0);
});

test('displays base price in correct format', async ({ page }) => {
	await page.getByRole('list').waitFor();

	// arrange
	const price = page.getByRole('article').getByText(/€/).first();
	const actual = await price.innerText();

	const value = await price.evaluate((e) => (e as HTMLDataElement).value);
	const expected = value.replace(/(\d+).(\d+)/, '$1,$2€');

	// assert
	expect(price).toBeVisible();
	expect(actual.replace(/\s/, '')).toBe(expected);
});

test('shows cart count when product is in cart', async ({ page }) => {
	page.locator('[aria-label="amount in cart"]');
});
