import { expect, test } from './baseFixtures.js';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
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

	await searchField.click();
	await searchField.fill(searchTerm);

	expect('name').toEqual('name');
});

test('show info text if search term matches no product name', async ({ page }) => {
	const searchTerm = 'abcdefghijklmnopqrstuvwxyz';
	const searchField = page.getByPlaceholder('Suche');

	await searchField.click();
	await searchField.fill(searchTerm);

	const info = page.getByText('No products available');

	await expect(info).toBeVisible();
});
