import { getCarById, editCar } from '../api/data.js';
import { html } from '../utils.js'

const editTemplate = (car, onEdit) => html`
<!-- Edit Listing Page -->
    <section id="edit-listing">
        <div class="container">
            <form @submit=${onEdit} id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>
                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" value=${car.brand}>
                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" value=${car.model}>
                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" value=${car.description}>
                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" value=${car.year}>
                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" value=${car.imageUrl}>
                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" value=${car.price}>
                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>
`;

export async function editPage(ctx) {
    const car = await getCarById(ctx.params.id);
    ctx.render(editTemplate(car, onEdit));

    async function onEdit(ev) {
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

        await editCar({ brand, model, description, year, imageUrl, price }, ctx.params.id);

        ev.target.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }
}