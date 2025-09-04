import { getAccessToken, getUserData } from './utils.js'

export function setUserNav() {

    let userDiv = document.querySelector('nav div.user');
    let guestDiv = document.querySelector('nav div.guest');

    if (getAccessToken()) {
        userDiv.querySelector('span').textContent = `Welcome, ${getUserData().username}`
        userDiv.classList.remove('hidden');
        guestDiv.classList.add('hidden');
    } else {
        userDiv.classList.add('hidden');
        guestDiv.classList.remove('hidden');
    }
}

export function currentPosition(pathname) {
    const links = [...document.querySelectorAll('nav a')];

    pathname = pathname.replace(/\/$/, "");

    links.forEach(a => a.classList.remove('active'));

    const activeLink = links.find(a => a.getAttribute('href') === pathname);

    if (activeLink) {
        activeLink.classList.add('active');
    } else {
        const homeLink = document.querySelector('#allMemesLink');
        if (homeLink) homeLink.classList.add('active');
    }
}
