import test, { expect } from '@playwright/test';

test('Success session creation by UI', async ({ page }) => {
  const uniqueTitle = `E2E Session ${Date.now()}`;
  const note = 'Conteúdo gerado via E2E';

  await page.goto('/new-session');
  await expect(page.getByPlaceholder('Título da sessão')).toBeVisible();
  await page.fill('input[name="title"]', uniqueTitle);
  await page.fill('textarea[name="note"]', note);
  await page.getByRole('button', { name: 'Salvar' }).click();

  await page.waitForSelector('text=Sessão criada com sucesso!', {
    state: 'visible',
    timeout: 15000,
  });
});
