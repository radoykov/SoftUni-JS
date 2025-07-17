import e from '../../../funcCreateElement/funcCreateElement.js'

function attachEvents() {
    document.querySelector('button#btnLoad').addEventListener('click', loadPhones);

    document.querySelector('button#btnCreate').addEventListener('click', createCustomPhone);

}
async function loadPhones() {
    const response = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await response.json();
    const ulPhoneBook = document.querySelector('ul#phonebook');
    ulPhoneBook.innerHTML = '';

    Object.values(data).forEach(({ person, phone, _id }) => {
        ulPhoneBook.appendChild(e('li', { id: 'phonebook', textContent: `${person}:${phone}` }, e('button', { textContent: 'Delete', onClick: (ev) => onDelete(ev, _id) })));
    });

    async function onDelete(ev, id) {
        const response = await fetch('http://localhost:3030/jsonstore/phonebook/' + id, {
            method: 'delete',
            headers: { 'Content-type': 'application/json' }
        });
        if (response.ok == false) {
            alert('Error');
        }
        ev.target.parentNode.remove();
    }
}

async function createPhone(data) {
    const response = await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (response.ok == false) {
        alert(`Error : ${await response.text()}`);
    }
}

function createCustomPhone() {
    const inputPerson = document.querySelector('input#person');
    const inputPhone = document.querySelector('input#phone');
    if (inputPerson.value == '' || inputPhone.value == '') {
        alert('Error : empty text in field');
        return;
    }
    createPhone({
        "person": inputPerson.value,
        "phone": inputPhone.value
    });
    inputPerson.value = '';
    inputPhone.value = '';
    loadPhones();
}

attachEvents();