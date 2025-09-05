import { getUserData, html } from '../utils.js'
import { getMyCars } from '../api/data.js';
import { carTemplate } from './common/carTemplate.js'

const myListingsTemplate = (myCars) => html`
  <!-- My Listings Page -->
    <section id="my-listings">
        <h1>My car listings</h1>
        <div class="listings">
            ${myCars.length
        ? html`
                <!-- Display all records -->
                ${myCars.map(carTemplate)}`
        : html`
                <!-- Display if there are no records -->
                <p class="no-cars"> You haven't listed any cars yet.</p>`
    }
        </div>
    </section>
`;

export async function myListingsPage(ctx) {
    const myCars = await getMyCars(getUserData()._id)
    ctx.render(myListingsTemplate(myCars));
}