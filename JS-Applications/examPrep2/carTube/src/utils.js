import { html, render } from 'https://unpkg.com/lit-html?module';
import page from 'https://unpkg.com/page/page.mjs';

function getUserData() {
    const user = sessionStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    } else {
        return undefined;
    }
}

function setUserData(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
}

function clearUserData() {
    sessionStorage.removeItem('user');
}

const getAccessToken = () => sessionStorage.getItem('accessToken');
const setAccessToken = (value) => sessionStorage.setItem('accessToken', value);
const clearAccessToken = () => sessionStorage.removeItem('accessToken');

export {
    page,
    html, 
    render,
    setUserData,
    getUserData,
    clearUserData,
    getAccessToken,
    setAccessToken,
    clearAccessToken
};
