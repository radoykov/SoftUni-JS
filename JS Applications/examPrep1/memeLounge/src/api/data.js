import proFetch from './api.js'
import { clearUserData, setUserData, setAccessToken, getAccessToken, clearAccessToken } from '../utils.js'

const urls = {
    login: 'http://localhost:3030/users/login',
    register: 'http://localhost:3030/users/register',
    logout: 'http://localhost:3030/users/logout',
    recentMemes: 'http://localhost:3030/data/memes?sortBy=_createdOn%20desc',
    memes: 'http://localhost:3030/data/memes',
    myMemes: (userId) => `http://localhost:3030/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`

};

export async function login(obj) {
    const result = await proFetch(urls.login, 'post', obj);
    setUserData(Object.assign({}, result));
    setAccessToken(result['accessToken']);

    return result;
}

export async function register(obj) {
    const result = await proFetch(urls.register, 'post', obj);
    setUserData(Object.assign({}, result));
    setAccessToken(result['accessToken']);

    return result;
}

export async function logout() {
    const result = await proFetch(urls.logout, 'get', {}, getAccessToken(), true);
    clearUserData();
    clearAccessToken();

    return result;
}

export const getMemes = async () => await proFetch(urls.recentMemes, 'get', {}, getAccessToken()); 
export const getMemeById = async (memeId) => await proFetch(urls.memes + `/${memeId}`, 'get', {}, getAccessToken()); 
export const getMyMemes = async (userId) => await proFetch(urls.myMemes(userId), 'get', {}, getAccessToken()); 

export const deleteMemeById = async (memeId) => await proFetch(urls.memes + `/${memeId}`, 'delete', {}, getAccessToken()); 
export const createMeme = async (obj) => await proFetch(urls.memes, 'post', obj, getAccessToken()); 
export const editMeme = async (obj, memeId) => await proFetch(urls.memes + `/${memeId}`, 'put', obj, getAccessToken()); 