import { expect, test, type Page } from '@playwright/test';

test('should load home page', async ({ page }: { page: Page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Selecione uma sessão' })
  ).toBeVisible();

  await expect(
    page.getByText(
      'Escolha uma sessão da lista ao lado para visualizar e editar'
    )
  ).toBeVisible();
});
