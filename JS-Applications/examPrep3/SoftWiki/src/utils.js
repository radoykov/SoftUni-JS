import { html, render } from 'https://unpkg.com/lit-html?module';
import page from 'https://unpkg.com/page/page.mjs';

const getAccessToken = () => sessionStorage.getItem('accessToken');
const setAccessToken = (value) => sessionStorage.setItem('accessToken', value);
const clearAccessToken = () => sessionStorage.removeItem('accessToken');
const getUserId = () => sessionStorage.getItem('userId');
const setUserId = (value) => sessionStorage.setItem('userId', value);
const clearUserId = () => sessionStorage.removeItem('userId');

export {
    page,
    html, 
    render,
    getAccessToken,
    setAccessToken,
    clearAccessToken,
    getUserId,
    setUserId,
    clearUserId
};
