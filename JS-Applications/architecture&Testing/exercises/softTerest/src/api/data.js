import { proFetch } from './api.js';

const urls = {
    logout: "http://localhost:3030/users/logout",
    login: "http://localhost:3030/users/login",
    register: "http://localhost:3030/users/register",
    recentIdeas: "http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc",
    ideas : "http://localhost:3030/data/ideas"
};

export const setItemInLocalStorage = (name, item) => localStorage.setItem(name, item);
export const getItemFromLocalStorage = (item) => localStorage.getItem(item);

export async function logout() {
    const data = await proFetch(urls.logout, 'get', {}, getItemFromLocalStorage("authToken"), true);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');

    return data;
}
export async function login(obj) {
    const data = await proFetch(urls.login, 'post', obj);
    setItemInLocalStorage('authToken', data['accessToken']);
    setItemInLocalStorage('userId', data._id);

    return data;
}

export async function register(obj) {
    const data = await proFetch(urls.register, 'post', obj);
    setItemInLocalStorage('authToken', data['accessToken']);
    setItemInLocalStorage('userId', data._id);

    return data;
}
export async function getIdeas() {
    return await proFetch(urls.recentIdeas, 'get');
}
export async function postIdea(obj) {
    return await proFetch(urls.ideas, 'post', obj, getItemFromLocalStorage('authToken'));
}
export async function getIdeaById(id) {
    return await proFetch(urls.ideas + '/' + id, 'get');
}
export async function deleteIdea(id) {
    return await proFetch(urls.ideas + '/' + id, 'delete', {}, getItemFromLocalStorage('authToken'));
}
