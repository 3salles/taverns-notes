import { expect, test } from '@playwright/test';

test.describe('Responsive Sidebar', () => {
  test('mobile: Burger menu should open and close the sidebar', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');

    const openButton = page.getByLabel('Abrir menu');
    await expect(openButton).toBeVisible();
    await expect(openButton).toHaveAttribute('aria-expanded', 'false');

    await openButton.click();
    await expect(openButton).toHaveAttribute('aria-expanded', 'true');
    const aside = page.getByRole('complementary');
    await expect(aside).toBeInViewport();
    const closeButton = page.getByLabel('Fechar menu');
    await expect(closeButton).toBeInViewport();
    await expect(page.getByPlaceholder('Buscar sessões...')).toBeInViewport();

    await closeButton.click();
    await expect(openButton).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('complementary')).not.toBeInViewport();
    await expect(page.getByLabel('Fechar menu')).not.toBeInViewport();
    await expect(
      page.getByPlaceholder('Buscar sessões...')
    ).not.toBeInViewport();
  });

  test('desktop: The hamburger menu should be hidden, and the content should be visible', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto('/');

    await expect(page.getByLabel('Abrir menu')).toBeHidden();
    await expect(page.getByPlaceholder('Buscar sessões...')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Minimizar sidebar' })
    ).toBeVisible();
    await expect(page.getByLabel('Fechar menu')).toBeHidden();
    await expect(
      page.getByRole('heading', { name: 'Selecione uma sessão ' })
    ).toBeVisible();
  });
});
