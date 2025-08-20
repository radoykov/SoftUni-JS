import { render } from 'https://unpkg.com/lit-html?module'
import proFetch from '../../../funcProFetch/funcProFetch.js'
import { tableTemplate} from './templates/table.js'
import { rowTemplate } from './templates/row.js';

window.onload = function () {
    render(tableTemplate(), document.querySelector('body'));

    document.querySelector('button#loadBooks').addEventListener('click', loadAllBooks);
    const form = document.querySelector('form');
    form.addEventListener('submit', (ev) => formBtnLogic(ev, form));
};

async function loadAllBooks() {
    const books = await proFetch('http://localhost:3030/jsonstore/collections/books', 'get');

    const result = Object.entries(books).map(([id, { author, title }]) => rowTemplate(id, author, title, onEdit, onDelete));
    render(result, document.querySelector('tbody'));
}


async function formBtnLogic(ev, form) {
    ev.preventDefault();

    const formTitle = form.querySelector('h3');
    const formBtn = form.querySelector('input[type="submit"]');
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

    await proFetch(`http://localhost:3030/jsonstore/collections/books/${id}`, method, book);
    form.reset();
    delete form.dataset.editedId;
    formTitle.textContent = 'FORM';
    formBtn.textContent = 'Submit';

    await loadAllBooks();
}

export function onEdit(id, title, author) {
    const form = document.querySelector('form');
    form.querySelector('input[name="title"]').value = title;
    form.querySelector('input[name="author"]').value = author;

    form.dataset.editedId = id;

    form.querySelector('h3').textContent = 'Edit FORM';
    form.querySelector('button').textContent = 'Save';
}

export async function onDelete(id) {
    await proFetch('http://localhost:3030/jsonstore/collections/books/' + id, 'delete');
    await loadAllBooks();
}