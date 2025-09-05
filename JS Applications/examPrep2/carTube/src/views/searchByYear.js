import { html } from '../utils.js'
import { carTemplate } from './common/carTemplate.js'
import { searchByYear } from '../api/data.js'

const searchTemplate = (cars, onClick, showResults) => html`
 <!-- Search Page -->
    <section id="search-cars">
        <h1>Filter by year</h1>
        <div class="container">
            <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
            <button @click=${onClick} class="button-list">Search</button>
        </div>
        ${showResults
        ? html`
            <h2>Results:</h2>
        <div class="listings">
            ${cars.length
                ? html`
                <!-- Display all records -->
                ${cars.map(carTemplate)}`
                : html`
                <!-- Display if there are no matches -->
                <p class="no-cars"> No results.</p>`
            }
        `
        : ''}
            
        </div>
    </section>
`;

export async function searchPage(ctx) {
    const year = Number(ctx.querystring.split('=')[1]);
    const cars = Number.isNaN(year) ? [] : await searchByYear(year);
    console.log(ctx);

    ctx.render(searchTemplate(cars, onClick, ctx.path.includes('query')));

    function onClick(ev) {
        ev.preventDefault();

        const query = Number(document.querySelector('input#search-input').value);
        ctx.page.redirect('/search-by-year?query=' + query);
    }
}