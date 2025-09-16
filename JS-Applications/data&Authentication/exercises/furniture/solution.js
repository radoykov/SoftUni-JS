import e from '../../../funcCreateElement/funcCreateElement.js'

document.addEventListener('DOMContentLoaded', async () => {
    if (window.location.pathname.includes('/login.html')) {
        let [registerForm, loginForm] = document.querySelectorAll('form');
        registerForm.addEventListener('submit', (ev) => onRegister(ev, registerForm));
        loginForm.addEventListener('submit', (ev) => onLogin(ev, loginForm));

    } else if (isAuthorized() == false) {
        await showHomePage();
        [...document.querySelectorAll('input[type=checkbox]')].forEach(e => e.disabled = true);

    } else {
        if (window.location.pathname.includes('/homeLogged.html') == false) {
            window.location.replace('http://127.0.0.1:5500/data&Authentication/exercises/furniture/homeLogged.html');
        }
        showHomePage();
        document.querySelector('form').addEventListener('submit', async (ev) => onCreateFurniture(ev, document.querySelector('form')));
        const [x, btnGenerate, btnBuy] = document.querySelectorAll('button');

        btnGenerate.addEventListener('click', onBuy);
        btnBuy.addEventListener('click', OnGetAll);
        document.querySelector('a#logoutBtn').addEventListener('click', onLogout);

    }
});

async function onLogout(ev) {
    const response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: { 'X-Authorization': getAuthToken() },
    });
    if (response.ok == false) {
        alert('Error in logout');
        return;
    }
    window.location.replace('http://127.0.0.1:5500/data&Authentication/exercises/furniture/login.html');
    sessionStorage.clear();

}

async function onBuy(ev) {
    const arrIsChecked = document.querySelectorAll('input[type=checkbox]:checked');

    const obj = Array.from(arrIsChecked).reduce((acc, el) => {
        const tr = el.parentNode.parentNode;
        const elementText = tr.children[1].children[0].textContent;
        const price = Number(tr.children[2].textContent);

        acc[elementText] = price;
        return acc;
    }, {});
    const response = await fetch('http://localhost:3030/data/orders', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': getAuthToken()
        },
        body: JSON.stringify(obj)
    });
    if (response.ok == false) {
        alert('Error in buy');
        return;
    }
    [...document.querySelectorAll('input[type=checkbox]:checked')].forEach(e => e.checked = false);
}
async function OnGetAll(ev) {
    const response = await fetch('http://localhost:3030/data/orders');
    if (response.ok == false) {
        alert('Error in get total bill');
        return;
    }
    let [itemsSpan, priceSpan] = document.querySelectorAll('div.orders span');
    const data = await response.json();
    let str = '';
    let price = 0;

    [...data.values()]
        .filter(order => order._ownerId == sessionStorage.getItem('userId'))
        .forEach(order => {
            const excludedKeys = ['_ownerId', '_createdOn', '_id'];

            const filteredEntries = Object.entries(order).filter(([key]) => !excludedKeys.includes(key));

            price += filteredEntries.reduce((acc, [_, value]) => acc + value, 0);
            str += filteredEntries.reduce((acc, [key]) => acc + key + ', ', '');
        });

    itemsSpan.textContent = str;
    priceSpan.textContent = price;
}

async function onCreateFurniture(ev, form) {
    ev.preventDefault();
    const data = new FormData(form);
    const [name, price, factor, img] = data.values();
    const obj = {
        img: img,
        name: name,
        price: price,
        decFactor: factor
    };

    const response = await fetch('http://localhost:3030/data/furniture', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': getAuthToken()
        },
        body: JSON.stringify(obj)
    });
    if (response.ok == false) {
        alert('Error with response create el.')
    }
    form.reset();
    showHomePage();
}

async function showHomePage() {

    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    const response = await fetch('http://localhost:3030/data/furniture');
    if (response.ok == false) {
        alert('Error in show base menu');
        return;
    }
    const data = await response.json();

    [...data].forEach(obj => {

        const el = e('tr', {},
            e('td', {},
                e('img', { src: obj.img })
            ),
            e('td', {}, e('p', {}, obj.name)),
            e('td', {}, e('p', {}, obj.price)),
            e('td', {}, e('p', {}, obj.decFactor)),
            e('td', {}, e('input', { type: 'checkbox' }))
        );
        tbody.appendChild(el);
    });
}

const isAuthorized = () => sessionStorage.getItem('authToken') != null;
const getAuthToken = () => sessionStorage.getItem('authToken');

async function onRegister(ev, form) {
    ev.preventDefault();
    const data = new FormData(form);
    let [email, password, repass] = [...data.values()];
    if (email == '' || password == '' || repass == '') {
        alert('Error the box must not be empty');
        return;
    }
    if (password !== repass) {
        alert('Error different passwords');
        return;
    }
    const response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password
        })
    });
    if (response.ok == false) {
        alert('Error with the response');
    }
    const dataFromServer = await response.json();
    sessionStorage.clear();
    sessionStorage.setItem('authToken', dataFromServer.accessToken);
    sessionStorage.setItem('userId', dataFromServer._id);
    form.reset();
}
async function onLogin(ev, form) {
    ev.preventDefault();
    const data = new FormData(form);
    let [email, password] = [...data.values()];
    if (email == '' || password == '') {
        alert('Error the box must not be empty');
        return;
    }
    const response = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password
        })
    });
    if (response.statusText == "Forbidden") {
        alert('Error with the response in login');
        return;
    }
    const dataFromServer = await response.json();
    sessionStorage.clear();
    sessionStorage.setItem('authToken', dataFromServer.accessToken);
    sessionStorage.setItem('userId', dataFromServer._id);
    form.reset();
}