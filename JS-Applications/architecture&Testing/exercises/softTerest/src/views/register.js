import { register } from '../api/data.js'

export function setupRegister(section, nav) {
    section.querySelector('form').addEventListener('submit', onRegistration);
    return showRegister;

    function showRegister() {
        return section;
    }
    async function onRegistration(ev) {
        ev.preventDefault();
        const dataFromForm = new FormData(ev.target);
        let [email, password, repass] = dataFromForm.values();

        if (email == '' || password == '' || repass == '') {
            alert('Error fields must not be empty!');
            return;
        }
        if (email.includes('.') == false || email.includes('@') == false) {
            alert('Error fields must be with special symbols!');
            return;
        }
        if (password.length < 3) {
            alert('Error password is too short!');
            return;
        }
        if (password !== repass) {
            alert('Error password and repass difference!');
            return;
        }

        await register({ email, password });

        nav.setUserNav();
        nav.goTo('ideas');

        ev.target.reset();
    }
}
