import { login } from '../api/data.js'

export function setupLogin(section, nav) {
    section.querySelector('form').addEventListener('submit', onLogin);
    return showLogin;

    function showLogin() {
        return section;
    }
    async function onLogin(ev) {
        ev.preventDefault();
        const dataFromForm = new FormData(ev.target);
        let [email, password] = dataFromForm.values();

        if (email == '' || password == '') {
            alert('Error fields must not be empty!');
            return;
        }
        
        const data = await login({email, password})

        nav.setUserNav();
        nav.goTo('ideas');
        
        ev.target.reset();
    }
}
