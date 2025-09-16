import { render } from 'https://unpkg.com/lit-html?module';
import {townTemplate} from './template.js'

function towns(){
    document.querySelector('form').addEventListener('submit', (ev) => {
        ev.preventDefault();
        const data = new FormData(ev.target);
        let [names] = data.values();
        names = names.split(', ');

        render(townTemplate(names), document.getElementById('root'));
        ev.target.reset();
    });
}
towns();