import { expect, test } from './baseFixtures.js';

test.beforeEach(async ({ page }) => {
	const productList = page.getByRole('list');

	await page.goto('/');

	await productList.waitFor();
});

test('filters products by name', async ({ page }) => {
	const searchTerm = 'Vollmilch';
	const searchField = page.getByPlaceholder('Suche');

	await searchField.click();
	await searchField.fill(searchTerm);

	const regex = new RegExp(searchTerm, 'i');
	const names = page.getByRole('article').getByRole('heading');

	for (const name of await names.all()) expect(await name.innerText()).toMatch(regex);
});

test('shows all products when search filter is cleared', async ({ page }) => {
	const searchTerm = 'Gouda';
	const searchField = page.getByPlaceholder('Suche');

	const productsCount = await page.getByRole('article').count();

	await searchField.click();
	await searchField.fill(searchTerm);

	let filteredProductsCount = await page.getByRole('article').count();

	expect(filteredProductsCount).not.toEqual(productsCount);

	// clear search
	await searchField.fill('');

	filteredProductsCount = await page.getByRole('article').count();

	expect(filteredProductsCount).toEqual(productsCount);
});

test('show info text if search term matches no product name', async ({ page }) => {
	const searchTerm = 'abcdefghijklmnopqrstuvwxyz';
	const searchField = page.getByPlaceholder('Suche');

	await searchField.click();
	await searchField.fill(searchTerm);

	const info = page.getByText('No products available');

	await expect(info).toBeVisible();
});
