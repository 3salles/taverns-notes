import test, { expect } from '@playwright/test';

test('Session edition by UI (success)', async ({ page }) => {
  const now = Date.now();
  const originalTitle = `E2E Edit Original ${now}`;
  const originalContent = 'Original Content';
  const updatedTitle = `E2E Edit Updated ${now}`;
  const updatedContent = 'Updated Content';

  // Create session via UI
  await page.goto('/new-session');
  await expect(page.getByPlaceholder('Título da sessão')).toBeVisible();
  await page.fill('input[name="title"]', originalTitle);
  await page.fill('textarea[name="note"]', originalContent);
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.waitForSelector('text=Sessão criada com sucesso!', {
    state: 'visible',
    timeout: 15000,
  });

  // Navigate to home and click on the created session in the sidebar
  await page.goto('/');
  await page.getByRole('link', { name: originalTitle }).click();

  // Wait for the session page to load
  await expect(page.locator('input[name="title"]')).toHaveValue(originalTitle);

  // Edit the session
  await page.fill('input[name="title"]', updatedTitle);
  await page.fill('textarea[name="note"]', updatedContent);
  await page.getByRole('button', { name: 'Salvar' }).click();

  // Assert success toast and updated values
  await page.waitForSelector('text=Sessão atualizada com sucesso!', {
    state: 'visible',
    timeout: 15000,
  });
  await expect(page.locator('input[name="title"]')).toHaveValue(updatedTitle);
});
