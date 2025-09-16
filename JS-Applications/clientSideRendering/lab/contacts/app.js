import { render } from 'https://unpkg.com/lit-html?module';
import { contacts as data } from "./contacts.js";
import { cardTemplate } from "./card.js"

const main = document.querySelector('div#contacts');
main.addEventListener('click', onClick);

const result = data.map(cardTemplate);
render(result, main);

function onClick(ev) {
    if (ev.target.classList.contains('detailsBtn')) {
        const id = ev.target.parentNode.querySelector('.details').id;
        const element = data.find(c => c.id == id);
        element.isVisible = !element.isVisible;
        const result = data.map(cardTemplate);
        render(result, main);
    }
}