import { proFetch } from './mainFunctions.js'
import { showHomePage } from './movies.js';

export async function executeLogout() {
    await proFetch('http://localhost:3030/users/logout', 'get', {}, sessionStorage.getItem('authToken'), true);
    sessionStorage.clear();
    showHomePage();
}