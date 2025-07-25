import { setupLogin, showLogin } from "./login.js";
import { setupRegister, showRegister } from "./register.js";
import { executeLogout } from "./logout.js";
import { setupShowPage, showHomePage } from "./movies.js";

const main = document.querySelector('div#container');
const section = document.querySelector('div.hidden');

window.addEventListener('DOMContentLoaded', () => {
    setupAFunctions();
    const links = {
        "moviesLink": showHomePage,
        "loginLink": showLogin,
        "registerLink": showRegister,
        "logoutLink": executeLogout
    };
    setupShowPage(main, section);
    setupLogin(main, section.querySelector('#form-login'));
    setupRegister(main, section.querySelector('#form-sign-up'));
    section.remove();

    showHomePage();

    function setupAFunctions() {
        nav.addEventListener('click', (ev) => {
            if (ev.target.tagName == 'A') {
                const handler = links[ev.target.id];
                if (handler) {
                    ev.preventDefault();
                    handler();
                }
            }
        });
    }
});

