import { proFetch } from './api.js';

const urls = {
    logout: "http://localhost:3030/users/logout",
    login: "http://localhost:3030/users/login",
    register: "http://localhost:3030/users/register",
    recipes: "http://localhost:3030/data/recipes",
    recipesWithPager: (page = 1) => {
        const url = "http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg&offset={offset}&pageSize=5";
        return url.replace('{offset}', (page - 1) * 5);
    },
    recentRecipes: "http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3",
    recipesCount : "http://localhost:3030/data/recipes?count",
    recipeComments : (id) => {
        const url = "http://localhost:3030/data/comments?where=recipeId%3D%22{recipeId}%22&load=author%3D_ownerId%3Ausers";
        return url.replace('{recipeId}', id);
    },
    recipeCommentsPost : "http://localhost:3030/data/comments"
};

export const setItemInSessionStorage = (name, item) => sessionStorage.setItem(name, item);
export const getItemFromSessionStorage = (item) => sessionStorage.getItem(item);

export async function logout() {
    const data = await proFetch(urls.logout, 'get', {}, getItemFromSessionStorage("authToken"), true);
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');

    return data;
}
export async function login(obj) {
    const data = await proFetch(urls.login, 'post', obj);
    setItemInSessionStorage('authToken', data['accessToken']);
    setItemInSessionStorage('userId', data._id);

    return data;
}

export async function register(obj) {
    const data = await proFetch(urls.register, 'post', obj);
    setItemInSessionStorage('authToken', data['accessToken']);
    setItemInSessionStorage('userId', data._id);

    return data;
}
export async function getRecipes(page = 1) {
    return await proFetch(urls.recipesWithPager(page));
}
export async function getRecipeById(id) {
    return await proFetch(urls.recipes + '/' + id, 'get', {}, getItemFromSessionStorage('authToken'));
}
export async function postRecipe(recipe) {
    return await proFetch(urls.recipes, 'post', recipe, getItemFromSessionStorage('authToken'));
}
export async function deleteRecipe(id) {
    return await proFetch(urls.recipes + '/' + id, 'delete', {}, getItemFromSessionStorage('authToken'));
}
export async function putRecipe(id, obj) {
    return await proFetch(urls.recipes + '/' + id, 'put', obj, getItemFromSessionStorage('authToken'));
}
export async function getRecentRecipes() {
    return await proFetch(urls.recentRecipes, 'get');
}
export async function getRecipeCount() {
    return await proFetch(urls.recipesCount, 'get');
}
export async function getCommentsByRecipeId(id) {
    return await proFetch(urls.recipeComments(id), 'get');
}
export async function postComment(comment) {
    return await proFetch(urls.recipeCommentsPost, 'post', comment, getItemFromSessionStorage('authToken'));
}