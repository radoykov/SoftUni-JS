import { page, render} from './utils.js'

import { logout } from './api/data.js'
import { setUserNav, currentPosition } from './navigation.js'

import { loginPage } from './views/login.js'
import { registerPage } from './views/register.js'
import { homePage } from './views/home.js'
import { allListingsPage } from './views/allListings.js'
import { createListingPage } from './views/createListing.js'
import { detailsPage } from './views/details.js'
import { editPage } from './views/edit.js'
import { myListingsPage } from './views/myListings.js'
import { searchPage } from './views/searchByYear.js'


const main = document.querySelector('main#site-content');

page('/login', textDecorator, loginPage, setUserNav);
page('/register', textDecorator, registerPage, setUserNav);
page('/home', textDecorator, homePage);
page('/', textDecorator, homePage);
page('/all-listings', textDecorator, allListingsPage);
page('/create-listings', textDecorator, createListingPage);
page('/details/:id', textDecorator, detailsPage);
page('/edit/:id', textDecorator, editPage);
page('/my-listings', textDecorator, myListingsPage);
page('/search-by-year', textDecorator, searchPage);

setUserNav();

page.start();


function textDecorator(ctx, next) {
    ctx.render = (content) => render(content, main);
    currentPosition(ctx.pathname);
    next();
}

document.querySelector('#logoutLink').addEventListener('click', async () => {
    await logout();
    setUserNav();
    page.redirect('/home');
})