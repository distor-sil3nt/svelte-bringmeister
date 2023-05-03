import { expect, test } from './baseFixtures.js';

const searchTerm = 'Vollmilch';

test.beforeEach(async ({ page }) => {
	const productList = page.getByRole('list');

	await page.goto('/');

	await productList.waitFor();
});

test('filters products by name', async ({ page }) => {
  // arrange
	const searchField = page.getByPlaceholder('Suche');

	const regex = new RegExp(searchTerm, 'i');
	const names = page.getByRole('article').getByRole('heading');

  // act
	await searchField.click();
	await searchField.fill(searchTerm);

  // assert
	for (const name of await names.all()) expect(await name.innerText()).toMatch(regex);
});

test('shows all products when search filter is cleared', async ({ page }) => {
  // arrange
	const searchField = page.getByPlaceholder('Suche');

	const productsCount = await page.getByRole('article').count();

  // act: start search
	await searchField.click();
	await searchField.fill(searchTerm);

	let filteredProductsCount = await page.getByRole('article').count();

  // assert
	expect(filteredProductsCount).not.toEqual(productsCount);

	// act: clear search
	await searchField.fill('');

	filteredProductsCount = await page.getByRole('article').count();

  // assert
	expect(filteredProductsCount).toEqual(productsCount);
});

test('show info text if search term matches no product name', async ({ page }) => {
  // arrange
	const searchTerm = 'abcdefghijklmnopqrstuvwxyz';
	const searchField = page.getByPlaceholder('Suche');

  // act
	await searchField.click();
	await searchField.fill(searchTerm);

	const info = page.getByText('No products available');

  // assert
	await expect(info).toBeVisible();
});
