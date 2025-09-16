import { proFetch } from './api.js';

const urls = {
    login: "http://localhost:3030/users/login",
    register: "http://localhost:3030/users/register",
    logout: "http://localhost:3030/users/logout",
    furnitures: "http://localhost:3030/data/catalog",
    myFurnitures: (id) => {
        const url = "http://localhost:3030/data/catalog?where=_ownerId%3D%22{userId}%22";
        return url.replace('{userId}', id)
    }
};

export async function login(obj) {
    const data = await proFetch(urls.login, 'post', obj);
    sessionStorage.setItem('authToken', data['accessToken']);
    sessionStorage.setItem('userId', data._id);

    return data;
}

export async function register(obj) {
    const data = await proFetch(urls.register, 'post', obj);
    sessionStorage.setItem('authToken', data['accessToken']);
    sessionStorage.setItem('userId', data._id);

    return data;
}

export async function logout() {
    const data = await proFetch(urls.logout, 'get', {}, sessionStorage.getItem("authToken"), true);
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');

    return data;
}

export const createFurniture = async (obj) => proFetch(urls.furnitures, 'post', obj, sessionStorage.getItem('authToken'));

export const getAllFurnitures = async () => proFetch(urls.furnitures, 'get');

export const getFurnitureDetails = async (id) => proFetch(urls.furnitures + `/${id}`, 'get');

export const updateFurniture = async (id, obj) => proFetch(urls.furnitures + `/${id}`, 'put', obj, sessionStorage.getItem('authToken'));

export const deleteFurniture = async (id) => proFetch(urls.furnitures + `/${id}`, 'delete', {}, sessionStorage.getItem('authToken'));

export const getMyFurnitures = async (userId) => proFetch(urls.myFurnitures(userId), 'get');