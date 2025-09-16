import { page, render} from './utils.js'

import { logout } from './api/data.js'
import { setUserNav, currentPosition } from './navigation.js'

import { loginPage } from './views/login.js'
import { registerPage } from './views/register.js'
import { homePage } from './views/home.js'
import { allMemesPage } from './views/allMemes.js'
import { detailsPage } from './views/details.js'
import { createMemePage } from './views/createMeme.js'
import { editMemePage } from './views/editMeme.js'
import { myProfilePage } from './views/myProfile.js'

const main = document.querySelector('main');

page('/login', textDecorator, loginPage, setUserNav);
page('/register', textDecorator, registerPage, setUserNav);
page('/home', textDecorator, homePage);
page('/all-memes', textDecorator, allMemesPage);
page('/details/:id', textDecorator, detailsPage);
page('/create-meme', textDecorator, createMemePage);
page('/edit/:id', textDecorator, editMemePage);
page('/my-profile', textDecorator, myProfilePage);

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