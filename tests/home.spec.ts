import { expect, test } from './baseFixtures.js';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test('renders a title with expected text', async ({ page }) => {
  const title = page.getByRole('heading', { name: 'Bringmeister coding challenge' })

	await expect(title).toBeVisible();
});

test('shows loader when request is pending', async ({ page }) => {
	await expect(page.getByText('Loading Products')).toBeVisible();

	await expect(page.getByRole('main')).toHaveAttribute('aria-busy', 'true');
});

test('shows product list and hides loader when request is resolved', async ({ page }) => {
	await expect(page.getByRole('list')).toBeVisible();

	await expect(page.getByText('Loading Products')).not.toBeVisible();

	await expect(page.getByRole('main')).toHaveAttribute('aria-busy', 'false');
});
