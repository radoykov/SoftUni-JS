import { page, render} from './utils.js'

import { logout } from './api/data.js'
import { setUserNav } from './navigation.js'

import { loginPage } from './views/login.js'
import { registerPage } from './views/register.js'
import { homePage } from './views/home.js'
import { catalogPage } from './views/catalog.js'
import { createPage } from './views/create.js'
import { detailsPage } from './views/details.js'
import { editPage } from './views/edit.js'
import { searchPage } from './views/search.js'


const main = document.querySelector('main#main-content');

page('/login', textDecorator, loginPage, setUserNav);
page('/register', textDecorator, registerPage, setUserNav);
page('/home', textDecorator, homePage);
page('/', textDecorator, homePage);
page('/catalog', textDecorator, catalogPage);
page('/create', textDecorator, createPage);
page('/details/:id', textDecorator, detailsPage);
page('/edit/:id', textDecorator, editPage);
page('/search', textDecorator, searchPage);

setUserNav();

page.start();


function textDecorator(ctx, next) {
    ctx.render = (content) => render(content, main);
    next();
}

document.querySelector('#logoutLink').addEventListener('click', async () => {
    await logout();
    setUserNav();
    page.redirect('/home');
})