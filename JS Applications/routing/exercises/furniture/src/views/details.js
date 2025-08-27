import { html } from 'https://unpkg.com/lit-html?module'
import { getFurnitureDetails, deleteFurniture} from '../api/data.js'

const detailsTemplate = (item, onDelete) => html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${item.img[0] == '.'? item.img.slice(1) : item.img}" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${item.make}</span></p>
                <p>Model: <span>${item.model}</span></p>
                <p>Year: <span>${item.year}</span></p>
                <p>Description: <span>${item.description}</span></p>
                <p>Price: <span>${item.price} $</span></p>
                <p>Material: <span>${item.material}</span></p>
                ${sessionStorage.getItem('authToken') != null && sessionStorage.getItem('userId') == item._ownerId ?
                     html`<div>
                    <a href="/edit/${item._id}" class="btn btn-info">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="btn btn-red">Delete</a>
                    </div>` : ''
                }
            </div>
        </div >
    </div >
`;

export async function detailsPage(ctx) {
    const id = (ctx.path.split('/')).pop();

    const item = await getFurnitureDetails(id);

    ctx.render(detailsTemplate(item, onDelete));

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete this item?');
        if(confirmed){
            await deleteFurniture(id);
            ctx.page.redirect('/catalog');
        }
    }
}