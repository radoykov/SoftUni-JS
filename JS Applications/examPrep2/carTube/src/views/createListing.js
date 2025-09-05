import { html } from '../utils.js'
import { createCar } from '../api/data.js';

const createListingTemplate = (onCreate) => html`
<!-- Create Listing Page -->
    <section id="create-listing">
        <div class="container">
            <form @submit=${onCreate} id="create-form">
                <h1>Create Car Listing</h1>
                <p>Please fill in this form to create an listing.</p>
                <hr>
                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand">
                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model">
                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description">
                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year">
                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl">
                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price">
                <hr>
                <input type="submit" class="registerbtn" value="Create Listing">
            </form>
        </div>
    </section>
`;

export async function createListingPage(ctx) {
    ctx.render(createListingTemplate(onCreate));

    async function onCreate(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        let [brand, model, description, year, imageUrl, price] = formData.values();
        year = Number(year);
        price = Number(price);

        if (brand == '') { alert('Brand mustn\'t be empty.'); return; }
        if (model == '') { alert('Model mustn\'t be empty.'); return; }
        if (description == '') { alert('Description mustn\'t be empty.'); return; }
        if (year == '') { alert('Year mustn\'t be empty.'); return; }
        if (imageUrl == '') { alert('Img mustn\'t be empty.'); return; }
        if (price == '') { alert('Price mustn\'t be empty.'); return; }

        await createCar({ brand, model, description, year, imageUrl, price });
        ctx.page.redirect('/all-listings')

        ev.target.reset();
    }
}