import { test, expect } from '@playwright/test';

test.describe('Accordion', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://127.0.0.1:5500/architecture&Testing/lab/accordion/index.html');
    });

    test('load titles', async ({ page }) => {
        await expect(page.locator('text=Unix')).toBeVisible();
        await expect(page.locator('text=Scalable Vector Graphics')).toBeVisible();
        await expect(page.locator('text=Open standard')).toBeVisible();
        await expect(page.locator('text=ALGOL')).toBeVisible();
    });
    test('button more', async ({ page }) => {

        const [response] = await Promise.all([
            page.waitForResponse(res =>
                res.url().includes('/jsonstore/advanced/articles/details/')
            ),
            page.locator('div:has(span:has-text("Open standard")) >> button').click()

        ]);
        const data = await response.json();
        expect(Object.values(data)[2]).toBe("An open standard is a standard that is publicly available and has various rights to use associated with it and may also have various properties of how it was designed (e.g. open process). There is no single definition, and interpretations vary with usage.");

    });
    test.only('button less', async ({ page }) => {
        await page.waitForSelector('.accordion');

        const toggleBtn = page.locator('div:has(span:has-text("Open standard")) >> button');

        await toggleBtn.click();

        const extraContent = page.locator('div:has(span:has-text("Open standard")) >> .extra');
        await expect(extraContent).toBeVisible();
        await expect(toggleBtn).toHaveText('Less');

        await toggleBtn.click();

        await expect(extraContent).toHaveCSS('display', 'none');
        await expect(toggleBtn).toHaveText('More');
    });
});
