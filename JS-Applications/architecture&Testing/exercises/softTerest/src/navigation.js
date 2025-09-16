import { getItemFromLocalStorage } from './api/data.js'

export function createNav(main, navbar, footer) {
    const views = {};
    const links = {};

    setupNavigation();

    const navigator = {
        registerView,
        goTo,
        setUserNav
    };

    return navigator;

    function setupNavigation() {
        navbar.addEventListener('click', (ev) => {
            let target = ev.target;
            if(target.tagName == 'IMG') target = target.parentNode;
            if (target.tagName == 'A') {
                const handlerName = links[target.id];
                if (handlerName) {
                    ev.preventDefault();
                    goTo(handlerName);
                }
            }
        });
    }

    async function goTo(name, ...params) {
        main.innerHTML = '';
        const result = await views[name](...params);
        main.appendChild(result);
        
        if(name =='home'){
            main.appendChild(footer);
        }
    }

    function registerView(name, section, setup, navId) {
        const execute = setup(section, navigator);

        views[name] = (...params) => {
            [...navbar.querySelectorAll('a')].forEach(a => a.classList.remove('active'));
            if (navId) {
                navbar.querySelector('#' + navId).classList.add('active');
            }
            return execute(...params);
        };
        if (navId) {
            links[navId] = name;
        }
    }

    function setUserNav() {
        let [dashboard, create, logout, login, register] = navbar.querySelectorAll('ul li');
        if (getItemFromLocalStorage('authToken') != null) {
            create.classList.remove('hidden');
            logout.classList.remove('hidden');
            login.classList.add('hidden');
            register.classList.add('hidden');
        } else {
            create.classList.add('hidden');
            logout.classList.add('hidden');
            login.classList.remove('hidden');
            register.classList.remove('hidden');
        }
    }
}

