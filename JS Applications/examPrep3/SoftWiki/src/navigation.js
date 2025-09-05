import { getAccessToken } from './utils.js'

export function setUserNav() {

    let userDiv = document.querySelector('nav div#user');
    let guestDiv = document.querySelector('nav div#guest');

    if (getAccessToken()) {
        userDiv.classList.remove('hidden');
        guestDiv.classList.add('hidden');
    } else {
        userDiv.classList.add('hidden');
        guestDiv.classList.remove('hidden');
    }
}