import { test, expect, chromium } from '@playwright/test';

test.describe('Messenger',  () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://127.0.0.1:5500/architecture&Testing/exercises/messenger/index.html');
    });

    test('load messages', async ({ page }) => {
        const [response] = await Promise.all([
            page.waitForResponse('http://localhost:3030/jsonstore/messenger'),
            page.click('#refresh')
        ]);

        expect(response.status()).toBe(200);

        const data = await response.json();
        const expectedText = Object.values(data).map(v => `${v.author}: ${v.content}`).join('\n');

        const messagesArea = await page.locator('#messages').inputValue();
        expect(messagesArea.trim()).toBe(expectedText.trim());
    });
    test('send a message', async ({ page }) => {
        await page.fill('#author', 'Alex');
        await page.fill('#content', 'Hello from Playwright!');

         const [request] = await Promise.all([
            page.waitForRequest('http://localhost:3030/jsonstore/messenger'),
            page.click('#submit')
        ]);

        const payload = JSON.parse(request.postData() || '{}');

        expect(payload).toEqual({ author: 'Alex', content: 'Hello from Playwright!' });
    });
});
