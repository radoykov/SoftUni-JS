import { setupRegister, showRegister } from './register.js';
import { setupLogin, showLogin } from './login.js'
import { setupCreate, showCreate } from './create.js'
import { setupCatalog, showCatalog } from './catalog.js'
import { setupEdit} from './edit.js'

export function changeNavLocation(id) {
    [...document.querySelectorAll('a')].forEach(a => a.id == id ? a.classList.add('active') : a.classList.remove('active'));
}
export let main = document.querySelector('main');

window.addEventListener('load', async () => {
    setUserNav();

    const nav = document.querySelector('nav');

    setupCatalog(document.getElementById('catalog'));
    setupCreate(document.getElementById('create'));
    setupLogin(document.getElementById('login'));
    setupRegister(document.getElementById('register'));
    setupEdit(document.getElementById('edit'));
    document.getElementById('views').remove();


    const links = {
        'catalogLink': showCatalog,
        'createLink': showCreate,
        'loginLink': showLogin,
        'registerLink': showRegister,
        'logoutBtn': logout,
    };
    setupNavigation();
    //starts the app for user
    showCatalog();

    function setupNavigation() {
        nav.addEventListener('click', (ev) => {
            if (ev.target.tagName == 'A') {
                const handler = links[ev.target.id];
                if (handler) {
                    ev.preventDefault();
                    handler();
                }
            }
        });
    }
});


async function logout(ev) {
    const response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': sessionStorage.getItem('authToken')
        },
    });
    if (response.ok == false) {
        alert('Error in logout!');
        return;
    }
    sessionStorage.removeItem('authToken');
    showCatalog();
    setUserNav();
}

export function setUserNav() {
    if (sessionStorage.getItem('authToken') != null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}