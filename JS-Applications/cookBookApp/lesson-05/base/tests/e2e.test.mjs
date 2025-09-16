//@ts-check
import { chromium } from 'playwright';
import { expect } from 'chai';

import mockData from './mock-data.json' assert { type: 'json' };

const host = 'http://127.0.0.1:5500/cookBookApp/lesson-05/base/index.html';
const endpoints = {
    recipes: '/data/recipes?select=_id%2Cname%2Cimg',
    count: '/data/recipes?count',
    recent: '/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3',
    recipe_by_id: '/data/recipes/3987279d-0ad4-4afb-8ca9-5b256ae3b298',
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    create: '/data/recipes'
};


function json(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}

let browser;
let context;
let page;

describe('E2E tests', function () {
    this.timeout(6000);

    before(async () => {
        // browser = await chromium.launch({ headless: false, slowMo: 500 });
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();

        // block intensive resources and external calls (page routes take precedence)
        await context.route('**/*.{png,jpg,jpeg}', route => route.abort());
        /*
        await context.route(url => {
            return url.hostname != 'localhost';
        }, route => route.abort());
        */
        await context.route('**' + endpoints.count, route => route.fulfill(json(3)));

        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    describe('Home', () => {
        it('show most recent recipes', async () => {
            page.route('**' + endpoints.recent, route => route.fulfill(json(mockData.list)));

            await page.goto(host);

            const titles = await page.$$eval('article.recent .recent-title', t => t.map(s => s.textContent));
            expect(titles.length).to.equal(3);
            expect(titles[0]).to.contains('Easy Lasagna');
            expect(titles[1]).to.contains('Grilled Duck Fillet');
            expect(titles[2]).to.contains('Roast Trout');
        });
    });


    describe('Catalog', () => {
        it('loads and renders content from API', async () => {
            page.route('**' + '/data/recipes?select=_id%2Cname%2Cimg&offset=0&pageSize=5' + '**', route => route.fulfill(json(mockData.list)));
            
            await page.goto(host);
            
            await page.click('text=Catalog');
            page.waitForSelector('article', {timeout: 15000});

            const titles = await page.$$eval('article.preview', t => t.map(s => s.textContent));
            expect(titles.length).to.equal(3);
            expect(titles[0]).to.contains('Easy Lasagna');
            expect(titles[1]).to.contains('Grilled Duck Fillet');
            expect(titles[2]).to.contains('Roast Trout');
        });

        it('displays recipe details', async () => {
            page.route('**' + endpoints.recipes + '**', route => route.fulfill(json(mockData.list)));
            page.route('**' + endpoints.recipe_by_id, route => route.fulfill(json(mockData.details)));

            await page.goto(host);
            await page.click('text=Easy Lasagna');

            const content = await page.textContent('article');
            expect(content).to.contains('Easy Lasagna');
            expect(content).to.contains('Ingredients');
            expect(content).to.contains('1 tbsp Ingredient 1');
            expect(content).to.contains('Preparation');
            expect(content).to.contains('Prepare ingredients');
        });
    });

    describe('Authentication', () => {
        it('register makes correct API call', async () => {
            const endpoint = '**' + endpoints.register;
            const email = 'john@abv.bg';
            const password = '123456';

            page.route(endpoint, route => route.fulfill(json({ _id: '0001', email, accessToken: 'AAAA' })));

            await page.goto(host);
            await page.click('text=Register');

            await page.waitForSelector('form');

            await page.fill('[name="email"]', email);
            await page.fill('[name="password"]', password);
            await page.fill('[name="rePass"]', password);

            const [response] = await Promise.all([
                page.waitForResponse(endpoint),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(response.request().postData());
            expect(postData.email).to.equal(email);
            expect(postData.password).to.equal(password);
        });

        it('login makes correct API call', async () => {
            const endpoint = '**' + endpoints.login;
            const email = 'john@abv.bg';
            const password = '123456';

            page.route(endpoint, route => route.fulfill(json({ _id: '0001', email, accessToken: 'AAAA' })));

            await page.goto(host);
            await page.click('text=Login');

            await page.waitForSelector('form');

            await page.fill('[name="email"]', email);
            await page.fill('[name="password"]', password);

            const [response] = await Promise.all([
                page.waitForResponse(endpoint),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(response.request().postData());
            expect(postData.email).to.equal(email);
            expect(postData.password).to.equal(password);
        });
    });

    describe('CRUD', () => {
        const email = 'john@abv.bg';
        const password = '123456';

        const mock = {
            name: 'Name1',
            img: '/assests/new.png',
            ingredients: ['i1', 'i2'],
            steps: ['s1', 's2'],
            _id: '0002',
            _ownerId: '0001'
        };

        beforeEach(async () => {
            // Create a fresh page for each test to avoid route conflicts
            page = await context.newPage();

            // Mock login response
            const loginEndpoint = '**' + endpoints.login;
            page.route(loginEndpoint, route =>
                route.fulfill(json({ _id: '0001', email, accessToken: 'AAAA' }))
            );

            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector('form');

            await page.fill('[name="email"]', email);
            await page.fill('[name="password"]', password);

            await Promise.all([
                page.waitForResponse(loginEndpoint),
                page.click('[type="submit"]')
            ]);
        });
        afterEach(async function () {
            this.timeout(10000);
            await page.close().catch(e => console.error("Page close error:", e));
            await context.close().catch(e => console.error("Context close error:", e));
        });


        it('create makes correct API call for logged in user', async () => {
            const createEndpoint = '**' + endpoints.create;
            page.route(createEndpoint, route => route.fulfill(json(mock)));

            await page.click('text=Create Recipe');
            await page.waitForSelector('form');

            await page.fill('[name="name"]', mock.name);
            await page.fill('[name="img"]', mock.img);
            await page.fill('[name="ingredients"]', mock.ingredients.join('\n'));
            await page.fill('[name="steps"]', mock.steps.join('\n'));

            const [response] = await Promise.all([
                page.waitForResponse(createEndpoint),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(response.request().postData());
            expect(postData.name).to.equal(mock.name);
            expect(postData.img).to.equal(mock.img);
            expect(postData.ingredients).to.deep.equal(mock.ingredients);
            expect(postData.steps).to.deep.equal(mock.steps);
        });

        it('author sees edit and delete buttons', async () => {
            page.route('**' + endpoints.recent, route => route.fulfill(json([mock])));
            page.route('**' + '/recipes/' + mock._id, route => route.fulfill(json(mock)));

            await page.goto(host);

            await page.waitForSelector('article');

            // await Promise.all([
            //     page.waitForResponse('**' + '/recipes/'),// + mock._id),
            //     page.click(`text=${mock.name}`)
            // ]);
            page.click(`text=${mock.name}`)

            await page.waitForSelector('article div.controls');

            const buttonsVisible = [
                await page.isVisible('button:text("Edit")'),
                await page.isVisible('button:text("Delete")')
            ].every(Boolean);

            expect(buttonsVisible).to.be.true;
        });

        it('edit loads correct article data for logged in user', async () => {
            page.route('**' + endpoints.recent, route => route.fulfill(json([mock])));
            page.route('**' + '/recipes/' + mock._id, route => route.fulfill(json(mock)));

            await page.goto(host);
            await page.click(`text=${mock.name}`);
            await page.click('button:text("Edit")');

            await page.waitForSelector('form');

            const name = await page.$eval('[name="name"]', e => e.value);
            const img = await page.$eval('[name="img"]', e => e.value);
            const ingredients = await page.$eval('[name="ingredients"]', e => e.value);
            const steps = await page.$eval('[name="steps"]', e => e.value);

            expect(name).to.equal(mock.name);
            expect(img).to.equal(mock.img);
            expect(ingredients).to.equal(mock.ingredients.join('\n'));
            expect(steps).to.equal(mock.steps.join('\n'));
        });

        it('edit makes correct API call for logged in user', async () => {
            page.route('**' + endpoints.recent, route => route.fulfill(json([mock])));
            page.route('**' + '/recipes/' + mock._id, route => route.fulfill(json(mock)));

            await page.goto(host);
            await page.click(`text=${mock.name}`);
            await page.click('button:text("Edit")');

            await page.waitForSelector('form');

            await page.fill('[name="name"]', 'Name2');
            await page.fill('[name="ingredients"]', [...mock.ingredients, 'i3'].join('\n'));
            await page.fill('[name="steps"]', [mock.steps[0]].join('\n'));

            const [response] = await Promise.all([
                page.waitForResponse('**' + '/recipes/' + mock._id),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(response.request().postData());
            expect(postData.name).to.equal('Name2');
            expect(postData.img).to.equal(mock.img);
            expect(postData.ingredients).to.deep.equal([...mock.ingredients, 'i3']);
            expect(postData.steps).to.deep.equal([mock.steps[0]]);
        });

        it('delete makes correct API call for logged in user', async () => {
            page.route('**' + endpoints.recent, route => route.fulfill(json([mock])));
            page.route('**' + '/recipes/' + mock._id, route => route.fulfill(json(mock)));

            await page.goto(host);
            await page.click(`text=${mock.name}`);
            await page.waitForSelector('article');

            page.on('dialog', dialog => dialog.accept());

            const [request] = await Promise.all([
                page.waitForRequest('**' + '/recipes/' + mock._id),
                page.click('button:text("Delete")')
            ]);

            expect(request.method()).to.equal('DELETE');
        });
    });
});
