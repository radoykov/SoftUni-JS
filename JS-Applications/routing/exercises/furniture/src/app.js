import page from '../../../../node_modules/page/page.mjs'
import { render } from 'https://unpkg.com/lit-html?module';

import { logout } from './api/data.js'
import { setUserNav, currentPosition } from './navigation.js'

import { catalogPage } from './views/catalog.js'
import { createPage } from './views/create.js'
import { detailsPage } from './views/details.js'
import { editPage } from './views/edit.js'
import { loginPage } from './views/login.js'
import { myPage } from './views/myFurnitures.js'
import { registerPage } from './views/register.js'

const main = document.body;

page('/catalog', decorateContext, catalogPage);
page('/my-furniture', decorateContext, myPage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);

setUserNav();

//Start application
page.start();

function decorateContext(context, next) {
    context.render = (ctx) => render(ctx, main);
    context.setUserNav = setUserNav;
    currentPosition(context.pathname);
    next();
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    setUserNav();
    page.redirect('/catalog')
});