import page from 'https://cdn.skypack.dev/page';
import { render } from 'https://unpkg.com/lit-html?module'

import { logout } from './api/data.js'
import { setUserNav } from './navigation.js'

import { loginPage } from './view/login.js'
import { registerPage } from './view/register.js'
import { homePage } from './view/home.js'
import { teamsPage } from './view/teams.js'
import { detailsPage } from './view/details.js'
import { createTeamPage } from './view/createTeam.js'
import { editTeamPage } from './view/editTeam.js';
import { myTeamsPage } from './view/myTeams.js';

const main = document.querySelector('main');
page('/login', decorator, loginPage);
page('/register', decorator, registerPage);
page('/home', decorator, homePage);
page('/teams', decorator, teamsPage);
page('/createTeam', decorator, createTeamPage);
page('/details/:id', decorator, detailsPage);
page('/edit/:id', decorator, editTeamPage);
page('/myTeams', decorator, myTeamsPage);

//start application
page();
setUserNav();

function decorator(context, next) {
    context.render = (ctx) => render(ctx, main);
    context.setUserNav = setUserNav;
    next();
}

document.getElementById('logoutLink').addEventListener('click', async () => {
    await logout();
    setUserNav();
    page.redirect('/home')
});