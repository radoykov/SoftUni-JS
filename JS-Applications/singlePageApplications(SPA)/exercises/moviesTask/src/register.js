import { proFetch, addToMainSections} from './mainFunctions.js'
import { showHomePage} from './movies.js'


let main;
let section;

export function setupRegister(htmlTarget, sectionTarget) {
    main = htmlTarget;
    section = sectionTarget;

    section.querySelector('form').addEventListener('submit', onRegister);

    async function onRegister(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        let [email, password, repass] = formData.values();
        if (email == '' || password == '') {
            alert('Error fields mustn\'t be empty.');
            return;
        }
        if (password != repass) {
            alert('Error passwords must not be different.');
            return;
        }
        if (password.length < 6) {
            alert('Error password must be at least 6 symbols.');
            return;
        }
        const data = await proFetch('http://localhost:3030/users/register', 'post', { email, password });
        sessionStorage.setItem('authToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('userEmail', email);
        ev.target.reset();
        showHomePage();
    }
}
export function showRegister() {
    addToMainSections(main, [section]);
};