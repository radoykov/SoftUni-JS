import { render } from 'https://unpkg.com/lit-html?module'
import proFetch from '../../../funcProFetch/funcProFetch.js'
import {itemTemplate} from './template.js'

const getItems = async () => proFetch('http://localhost:3030/jsonstore/advanced/dropdown', 'get');
const addItem = async (obj) => proFetch('http://localhost:3030/jsonstore/advanced/dropdown', 'post', obj);

async function solve() {
    const main = document.querySelector('select#menu');
    let data = await getItems();
    data = Object.values(data).map(itemTemplate);
    render(data, main);

}
document.querySelector('form').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.terget);
    await addItem({text : document.querySelector('input#itemText').value});
    ev.target.reset();
    solve();
});

solve();