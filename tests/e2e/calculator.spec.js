import { test, expect } from '@playwright/test';

test.describe('Калькулятор', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculator.html');
  });

  test('ввод чисел подряд отображается корректно', async ({ page }) => {
    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: '8' }).click();
    await page.getByRole('button', { name: '9' }).click();

    const display = page.locator('#display');
    await expect(display).toHaveText('789');
  });

  test('сложение 2 + 3 = 5', async ({ page }) => {
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const display = page.locator('#display');
    await expect(display).toHaveText('5');
  });

  test('деление 8 / 2 = 4', async ({ page }) => {
    await page.getByRole('button', { name: '8' }).click();
    await page.getByRole('button', { name: '/' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const display = page.locator('#display');
    await expect(display).toHaveText('4');
  });

  test('деление на ноль показывает "Ошибка"', async ({ page }) => {
    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: '/' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const display = page.locator('#display');
    await expect(display).toHaveText('Ошибка');
  });

  test('кнопка очистки сбрасывает ввод', async ({ page }) => {
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: 'C' }).click();

    const display = page.locator('#display');
    await expect(display).toHaveText('0');
  });
});




