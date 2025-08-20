import { render } from 'https://unpkg.com/lit-html?module';
import proFetch from '../../../funcProFetch/funcProFetch.js'
import { tableRowTemplate } from './template.js'

const getData = async () => proFetch('http://localhost:3030/jsonstore/advanced/table', 'get');

async function solve() {
   const main = document.querySelector('tbody');
   let result = await getData();
   result = Object.values(result).map(tableRowTemplate);
   render(result, main);

   document.querySelector('#searchBtn').addEventListener('click', onSearch);
}

function onSearch() {

   const searchField = document.getElementById('searchField');

   const tableCells = Array.from(document.querySelectorAll("tbody tr td"));
   for (let i = 0; i < tableCells.length; i++) {
      tableCells[i].parentElement.style.backgroundColor = 'grey';
   }

   for (let i = 0; i < tableCells.length; i++) {
      let a = tableCells[i].textContent.toLowerCase();
      if (a.indexOf(searchField.value) >= 0) {
         tableCells[i].parentElement.style.backgroundColor = 'yellow';
      }
   }

   searchField.value = '';
}
solve();