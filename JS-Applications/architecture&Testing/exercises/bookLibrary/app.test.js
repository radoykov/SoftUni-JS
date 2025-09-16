import { test, expect, chromium } from '@playwright/test';

test.describe('book library', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://127.0.0.1:5500/architecture&Testing/exercises/bookLibrary/index.html');
    });

    test('load all books', async ({ page }) => {
        const [response] = await Promise.all([
            page.waitForResponse('http://localhost:3030/jsonstore/collections/books'),
            page.click('#loadBooks')
        ]);
        const data = await response.json();
        expect(data).toEqual({
            "d953e5fb-a585-4d6b-92d3-ee90697398a0": {
                "author": "J.K.Rowling",
                "title": "Harry Potter and the Philosopher's Stone"
            },
            "d953e5fb-a585-4d6b-92d3-ee90697398a1": {
                "author": "Svetlin Nakov",
                "title": "C# Fundamentals"
            }
        });

    });
    test('create book', async ({ page }) => {
        await page.fill('[name=author]', 'Alex');
        await page.fill('[name=title]', 'The film');

        const [request] = await Promise.all([
            page.waitForRequest('http://localhost:3030/jsonstore/collections/books'),
            page.click('text=submit')
        ]);

        const obj = JSON.parse(request.postData() || '{}');

        expect(obj).toEqual({ author: 'Alex', title: 'The film' });
    });
    test('edit book', async ({ page }) => {
        await page.click('#loadBooks');
        await page.waitForSelector('text=Edit');

        await page.click('button:has-text("Edit") >> nth=0');
        await page.waitForSelector('form#editForm', { state: 'visible' });

        const authorInput = page.locator('form#editForm input[name=author]');
        const titleInput = page.locator('form#editForm input[name=title]');

        await authorInput.fill('');
        await authorInput.fill('Alex');

        await titleInput.fill('');
        await titleInput.fill('The film');
        const [request] = await Promise.all([
            page.waitForRequest(req =>
                req.url().includes('/jsonstore/collections/books/') &&
                req.method() === 'PUT'
            ),
            page.click('form#editForm button:has-text("Save")')
        ]);

        const obj = JSON.parse(request.postData() || '{}');
        expect(obj).toEqual({ author: 'Alex', title: 'The film' });
    });
    test('delete book', async ({ page }) => {
        await page.click('#loadBooks');
        await page.waitForSelector('button:has-text("Delete")');

        page.once('dialog', dialog => dialog.accept());

        const [request] = await Promise.all([
            page.waitForRequest(req =>
                req.url().includes('/jsonstore/collections/books/') &&
                req.method() === 'DELETE'
            ),
            page.click('button:has-text("Delete")')
        ]);

        expect(request.method()).toBe('DELETE');
    });
});