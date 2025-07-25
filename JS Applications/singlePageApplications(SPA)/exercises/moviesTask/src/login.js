import { proFetch ,addToMainSections} from './mainFunctions.js'
import { showHomePage} from './movies.js'

let main;
let section;

export function setupLogin(htmlTarget, sectionTarget) {
    main = htmlTarget;
    section = sectionTarget;

    section.querySelector('form').addEventListener('submit', onLogin);

    async function onLogin(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        let [email, password] = formData.values();
        if (email == '' || password == '') {
            alert('Error fields mustn\'t be empty.');
            return;
        }
        if (password.length < 6) {
            alert('Error password must be at least 6 symbols.');
            return;
        }
        const data = await proFetch('http://localhost:3030/users/login', 'post', { email, password });
        sessionStorage.setItem('authToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('userEmail', email);

        ev.target.reset();
        showHomePage();
    }
}
export function showLogin() {
    addToMainSections(main, [section]);
};