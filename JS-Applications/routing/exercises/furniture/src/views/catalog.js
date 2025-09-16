import { html, render} from 'https://unpkg.com/lit-html?module';
import { furnitureTemplate } from './furnitureTemplate.js';
import { getAllFurnitures } from '../api/data.js'

const catalogBaseTemplate = () => html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top" id="container">
        </div>
    </div>
`;

export async function catalogPage(ctx) {
    ctx.render(catalogBaseTemplate());

    const items = await getAllFurnitures();
    const result = items.map(furnitureTemplate);
    render(result, document.querySelector('#container'));

}