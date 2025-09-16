import { towns } from './towns.js'
import { townCard } from './template.js'
import { render } from 'https://unpkg.com/lit-html?module';

function app() {
   const main = document.querySelector('div#towns');
   const result = townCard(towns);
   render(result, main);
   document.querySelector('button').addEventListener('click', search);

}
function search() {
   const searchText = document.getElementById("searchText").value;
   const result = document.getElementById("result");
   const towns = [...document.querySelectorAll('ul li')];
   towns.forEach(town => town.classList.remove('active'));

   let count = 0;
   for (let i = 0; i < towns.length; i++) {
      let town = towns[i].textContent;
      if (town.startsWith(searchText)) {
         count++;
         towns[i].classList.add('active');
      }
   }
   result.textContent = `${count} matches found`
}
app();