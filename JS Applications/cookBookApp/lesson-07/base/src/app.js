import page from '//unpkg.com/page/page.mjs';

import { createNav } from './navigation.js';
import { logout as apiLogout } from './api/data.js';

import { setupHome } from './views/home.js';
import { setupCatalog } from './views/catalog.js';
import { setupCreate, onCreate } from './views/create.js';
import { setupLogin, onLogin } from './views/login.js';
import { setupRegister, onRegister } from './views/register.js';
import { setupDetails } from './views/details.js';
import { setupEdit, onEdit, setupDeleted } from './views/edit.js';

window.addEventListener('load', async () => {
    const main = document.querySelector('main');
    const navbar = document.querySelector('nav');
    const navigation = createNav(main, navbar);

    const views = {
        homeView: navigation.registerView('home', setupHome),
        catalogView: navigation.registerView('catalog', setupCatalog, 'catalogLink'),
        detailsView: navigation.registerView('details', setupDetails),
        loginView: navigation.registerView('login', setupLogin, 'loginLink'),
        registerView: navigation.registerView('register', setupRegister, 'registerLink'),
        createView: navigation.registerView('create', setupCreate, 'createLink'),
        editView: navigation.registerView('edit', setupEdit),
        deletedView: navigation.registerView('deleted', setupDeleted)
    };
    page('/', views.homeView);
    page('/index.html', views.homeView);
    page('/catalog', views.catalogView);
    page('/catalog/:page', views.catalogView);
    navigation.registerForm('searchForm', (data) => page.redirect('/catalog?search=' + data.search));

    page('/details/:id', views.detailsView);

    page('/login', views.loginView);
    navigation.registerForm('loginForm', onLogin, () => { page.redirect('/'); navigation.setUserNav(); });

    page('/register', views.registerView);
    navigation.registerForm('registerForm', onRegister, () => { page.redirect('/'); navigation.setUserNav(); });

    page('/create', views.createView);
    navigation.registerForm('createForm', onCreate, (recipeId) => page.redirect('/details/' + recipeId));

    page('/edit/:id', views.editView);
    navigation.registerForm('editForm', onEdit, (recipeId) => page.redirect('/details/' + recipeId));

    page('/deleted/:id', views.deletedView);

    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Start application in catalog view
    page();

    async function logout() {
        await apiLogout();
        navigation.setUserNav();
        page.redirect('/catalog');
    }
});