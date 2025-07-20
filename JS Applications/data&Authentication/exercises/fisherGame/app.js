import e from '../../../funcCreateElement/funcCreateElement.js'

function attachEvents() {
    if (window.location.pathname.includes('/login.html')) {

        let [registerForm, loginForm] = document.querySelectorAll('form');
        registerForm.addEventListener('submit', (ev) => onRegister(ev, registerForm));
        loginForm.addEventListener('submit', (ev) => onLogin(ev, loginForm));
    } else {
        document.querySelector('button.load').addEventListener('click', loadAll);
        //Authorization
        if (isAuthorized()) {
            const addBtn = document.querySelector('button.add')
            addBtn.addEventListener('click', onAdd);
            addBtn.disabled = false;
        }
    }
}
async function onAdd(ev) {
    const inputs = Array.from(document.querySelectorAll('aside fieldset input'));

    const obj = inputs.reduce((acc, input) => {
        acc[input.className] = input.type === 'number' ? Number(input.value) : input.value;
        return acc;
    }, {});

    const response = await fetch('http://localhost:3030/data/catches', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': getAuthToken()
        },
        body: JSON.stringify(obj)
    });
    inputs.forEach(input => input.value = '');
    loadAll();
}
const isAuthorized = () => sessionStorage.getItem('authToken') != null;
const getAuthToken = () => sessionStorage.getItem('authToken');

async function isAuthorizedForUpdataAndDeleteBtn(id) {
    if (isAuthorized() == false) {
        return false;
    }
    if (sessionStorage.getItem('userId') !== id) {
        return false;

    }

    return true;
}


async function loadAll(ev) {
    document.querySelector('#catches').innerHTML = '';
    const response = await fetch('http://localhost:3030/data/catches');
    const data = await response.json();
    Object.values(data).forEach(async (obj) => {

        const catchEl = e('div', { className: 'catch' },
            e('label', {}, 'Angler'),
            e('input', { type: 'text', className: 'angler', value: obj.angler }),
            e('hr'),
            e('label', {}, 'Weight'),
            e('input', { type: 'number', className: 'weight', value: obj.weight }),
            e('hr'),
            e('label', {}, 'Species'),
            e('input', { type: 'text', className: 'species', value: obj.species }),
            e('hr'),
            e('label', {}, 'Location'),
            e('input', { type: 'text', className: 'location', value: obj.location }),
            e('hr'),
            e('label', {}, 'Bait'),
            e('input', { type: 'text', className: 'bait', value: obj.bait }),
            e('hr'),
            e('label', {}, 'Capture Time'),
            e('input', { type: 'number', className: 'captureTime', value: obj.captureTime }),
            e('hr'),
            e('button', { className: 'update', disabled: true, onClick: (ev) => onUpdate(ev, obj._id) }, 'Update'),
            e('button', { className: 'delete', disabled: true, onClick: (ev) => onDelete(ev, obj._id) }, 'Delete')
        );
        //Authorization
        if (await isAuthorizedForUpdataAndDeleteBtn(obj._ownerId)) {
            [...catchEl.querySelectorAll('button')].forEach(btn => btn.disabled = false);
        }
        document.querySelector('#catches').appendChild(catchEl);
    });

    async function onDelete(ev, id) {
        const response = await fetch('http://localhost:3030/data/catches/' + id, {
            method: 'delete',
            headers: { 'X-Authorization': getAuthToken() }
        });
        if (response.ok == false) {
            alert('Error with the response');
            return;
        }
        ev.target.parentNode.remove();
    }
    async function onUpdate(ev, id) {

        const inputs = Array.from(ev.target.parentNode.querySelectorAll('input'));

        const obj = inputs.reduce((acc, input) => {
            acc[input.className] = input.type === 'number' ? Number(input.value) : input.value;
            return acc;
        }, {});

        const response = await fetch('http://localhost:3030/data/catches/' + id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
                , 'X-Authorization': getAuthToken()
            },
            body: JSON.stringify(obj)
        });
        inputs.forEach(input => input.value = '');
        loadAll();
    }
}


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
    sessionStorage.setItem('userId', dataFromServer._id);
    sessionStorage.setItem('authToken', dataFromServer.accessToken);
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
        alert('Error with the response');
        return;
    }
    const dataFromServer = await response.json();
    sessionStorage.clear();
    sessionStorage.setItem('authToken', dataFromServer.accessToken);
    sessionStorage.setItem('userId', dataFromServer._id);
    form.reset();
}
document.addEventListener('DOMContentLoaded', attachEvents);