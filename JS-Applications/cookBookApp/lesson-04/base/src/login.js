import { changeNavLocation, setUserNav, main} from './app.js'
import { showCatalog } from './catalog.js'

let section;

export function setupLogin(sectionForLoign) {
    section = sectionForLoign;
    section.querySelector('form').addEventListener('submit', onLogin);
}
async function onLogin(ev) {
    ev.preventDefault();
    const dataFromForm = new FormData(ev.target);
    let [email, password] = dataFromForm.values();

    if (email == '' || password == '') {
        alert('Error fields must not be empty!');
        return;
    }
    const response = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password
        })
    }
    );
    if (response.ok == false) {
        alert('Error server not responded!');
        return;
    }
    const data = await response.json();

    sessionStorage.setItem('userId', data._id);
    sessionStorage.setItem('authToken', data.accessToken);
    setUserNav();
    showCatalog();

    ev.target.reset();
}

export function showLogin(){
    changeNavLocation('loginLink');
    main.innerHTML = '';
    main.appendChild(section);
}