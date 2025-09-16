import proFetch from './api.js'
import { clearUserData, setUserData, setAccessToken, getAccessToken, clearAccessToken } from '../utils.js'
const host = 'http://localhost:3030'
const urls = {
    login: host + '/users/login',
    register: host + '/users/register',
    logout: host + '/users/logout',
    recentCars: host + '/data/cars?sortBy=_createdOn%20desc',
    cars: host + '/data/cars',
    myCars: (userId) => host + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    search : (query) => host + `/data/cars?where=year%3D${query}`
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

export const getCars = async () => await proFetch(urls.recentCars, 'get', {}, getAccessToken());
export const getCarById = async (id) => await proFetch(urls.cars + `/${id}`, 'get', {}, getAccessToken());
export const getMyCars = async (userId) => await proFetch(urls.myCars(userId), 'get', {}, getAccessToken()); 

export const createCar = async (obj) => await proFetch(urls.cars, 'post', obj, getAccessToken()); 
export const editCar = async (obj, id) => await proFetch(urls.cars + `/${id}`, 'put', obj, getAccessToken()); 
export const deleteCar = async (id) => await proFetch(urls.cars + `/${id}`, 'delete', {}, getAccessToken()); 

export const searchByYear = async (query) => await proFetch(urls.search(query), 'get', {}, getAccessToken()); 