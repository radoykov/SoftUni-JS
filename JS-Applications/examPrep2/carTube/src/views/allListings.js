import { html } from '../utils.js'
import { carTemplate } from './common/carTemplate.js';
import { getCars } from '../api/data.js';

const allListingsTemplate = (cars) => html`
 <!-- All Listings Page -->
    <section id="car-listings">
        <h1>Car Listings</h1>
        <div class="listings">
            ${cars.length
        ? html`
                <!-- Display all records -->
                 ${cars.map(carTemplate)}
                `
        : html`
                <!-- Display if there are no records -->
            <p class="no-cars">No cars in database.</p>`
    }
        </div>
    </section>
`;

export async function allListingsPage(ctx) {
    const cars = await getCars();
    ctx.render(allListingsTemplate(cars));
}