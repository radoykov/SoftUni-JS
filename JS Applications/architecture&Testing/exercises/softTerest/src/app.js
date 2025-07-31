import { createNav } from './navigation.js';
import { logout as apiLogout } from './api/data.js';

import { setupHome } from './views/home.js';
import { setupIdeas } from './views/ideas.js';
import { setupCreate } from './views/create.js';
import { setupLogin } from './views/login.js';
import { setupRegister } from './views/register.js';
import { setupDetails } from './views/details.js';


window.addEventListener('load', async () => {
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const navbar = document.querySelector('nav');
    const navigation = createNav(main, navbar, footer);

    navigation.registerView('login', document.getElementById('login'), setupLogin, 'loginLink');
    navigation.registerView('register', document.getElementById('register'), setupRegister, 'registerLink');
    navigation.registerView('home', document.getElementById('home'), setupHome, 'ideaIcon');
    navigation.registerView('ideas', document.getElementById('dashboard-holder'), setupIdeas, 'dashboardLink');
    navigation.registerView('create', document.getElementById('create'), setupCreate, 'createLink');
    navigation.registerView('details', document.getElementById('details'), setupDetails);
    document.getElementById('logoutLink').addEventListener('click', logout);
    
    document.querySelector('div.hidden').remove();

    navigation.setUserNav();
    
    // // Start application in home view
    navigation.goTo('home');
    //tohave a view for home page at the beginning;
    document.querySelector('a#dashboardLink').classList.add('active');

    async function logout(ev) {
        ev.preventDefault();
        await apiLogout();
        navigation.setUserNav();
        navigation.goTo('home');
    }
});

