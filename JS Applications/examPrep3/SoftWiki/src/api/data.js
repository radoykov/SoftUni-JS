import proFetch from './api.js'
import { setAccessToken, getAccessToken, clearAccessToken, getUserId, setUserId, clearUserId} from '../utils.js'
const host = 'http://localhost:3030'
const urls = {
    login: host + '/users/login',
    register: host + '/users/register',
    logout: host + '/users/logout',
    home: host + '/data/wiki?sortBy=_createdOn%20desc&distinct=category',
    catalog: host + '/data/wiki?sortBy=_createdOn%20desc',
    create: host + '/data/wiki',
    details: (id) => host + `/data/wiki/${id}`,
    search: (query) => host + `/data/wiki?where=title%20LIKE%20%22${query}%22`

};

export async function login(obj) {
    const result = await proFetch(urls.login, 'post', obj);
    setAccessToken(result['accessToken']);
    setUserId(result['_id']);

    return result;
}

export async function register(obj) {
    const result = await proFetch(urls.register, 'post', obj);
    setAccessToken(result['accessToken']);
    setUserId(result['_id']);

    return result;
}

export async function logout() {
    const result = await proFetch(urls.logout, 'get', {}, getAccessToken(), true);
    clearAccessToken();
    clearUserId();

    return result;
}

export const getArticlesForHome = async () => await proFetch(urls.home, 'get', {}, getAccessToken());
export const getArticlesForCatalog = async () => await proFetch(urls.catalog, 'get', {}, getAccessToken());
export const getArticleById = async (id) => await proFetch(urls.details(id), 'get', {}, getAccessToken());

export const createArticle = async (obj) => await proFetch(urls.create, 'post', obj, getAccessToken());
export const editArticle = async (obj, id) => await proFetch(urls.details(id), 'put', obj, getAccessToken());
export const deleteArticle = async (id) => await proFetch(urls.details(id), 'delete', {}, getAccessToken());

export const searchForArticles = async (query) => await proFetch(urls.search(query), 'get', {}, getAccessToken()); 