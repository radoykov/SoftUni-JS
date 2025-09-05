import { html, getAccessToken, getUserData } from '../utils.js'
import { getCarById, deleteCar } from '../api/data.js';

const detailsTemplate = (car, onDelete) => html`
<!-- Listing Details Page -->
    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src="${car.imageUrl}">
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${car.brand}</li>
                <li><span>Model:</span>${car.model}</li>
                <li><span>Year:</span>${car.year}</li>
                <li><span>Price:</span>${car.price}$</li>
            </ul>
            <p class="description-para">${car.description}</p>
            ${getAccessToken() && (getUserData())._id == car._ownerId
        ? html`
            <div class="listings-buttons">
                <a href=${`/edit/${car._id}`} class="button-list">Edit</a>
                <a @click=${onDelete} class="button-list">Delete</a>
            </div>
            `
        : ''
    }
        </div>
    </section>
`;

export async function detailsPage(ctx) {
    const car = await getCarById(ctx.params.id);
    ctx.render(detailsTemplate(car, onDelete));

    async function onDelete(ev) {
        ev.preventDefault();

        await deleteCar(ctx.params.id);
        ctx.page.redirect('/all-listings')
    }
}