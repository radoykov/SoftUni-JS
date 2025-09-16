import { render } from 'https://unpkg.com/lit-html?module';
import { catCard } from './template.js'
import { cats } from './catSeeder.js'

function solve() {
    const main = document.querySelector('#allCats ul');
    const result = cats.map(catCard);
    render(result, main);
    main.addEventListener('click', (ev) => {
        if (ev.target.classList.contains('showBtn')) {
            const id = ev.target.parentNode.querySelector('div.status').id;
            const element = cats.find(c => c.id == id);
            element.isVisible = !element.isVisible;
            const result = cats.map(catCard);
            render(result, main);
        }
    });
}

solve();