import e from '../../../funcCreateElement/funcCreateElement.js';

window.onload = function () {
    document.querySelector('button#loadBooks').addEventListener('click', loadAllBooks);
    const form = document.querySelector('form');
    form.addEventListener('submit', (ev) => formBtnLogic(ev, form));
};

async function loadAllBooks() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/books');
    const books = await response.json();
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    Object.entries(books).forEach(([id, { author, title }]) => {
        tbody.appendChild(e('tr', {},
            e('td', { textContent: title }),
            e('td', { textContent: author }),
            e('td', {},
                e('button', { textContent: 'Edit', onClick: () => onEdit(id, title, author) }),
                e('button', { textContent: 'Delete', onClick: () => onDelete(id) })
            )));
    });
}

function onEdit(id, title, author) {
    const form = document.querySelector('form');
    form.querySelector('input[name="title"]').value = title;
    form.querySelector('input[name="author"]').value = author;

    form.dataset.editedId = id;

    form.querySelector('h3').textContent = 'Edit FORM';
    form.querySelector('button').textContent = 'Save';
}

async function onDelete(id) {
    const response = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'DELETE',
    });

    if (!response.ok) {
        alert('Error in delete');
        return;
    }

    await loadAllBooks();
}

async function formBtnLogic(ev, form) {
    ev.preventDefault();

    const formTitle = form.querySelector('h3');
    const formBtn = form.querySelector('button');
    const isEdit = form.dataset.editedId !== undefined;
    const method = isEdit ? 'PUT' : 'POST';
    const id = isEdit ? form.dataset.editedId : '';

    const formData = new FormData(form);
    const [title, author] = [...formData.values()];
    const book = { title, author };

    if (Object.values(book).some(val => val.trim() === '')) {
        alert('Form must not be empty');
        return;
    }

    const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });

    if (!response.ok) {
        alert('Error in ' + (isEdit ? 'update' : 'create'));
        return;
    }

    form.reset();
    delete form.dataset.editedId;
    formTitle.textContent = 'FORM';
    formBtn.textContent = 'Submit';

    await loadAllBooks();
}
