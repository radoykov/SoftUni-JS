import { html, render} from 'https://unpkg.com/lit-html?module';
import { furnitureTemplate } from './furnitureTemplate.js';
import { getMyFurnitures } from '../api/data.js'

const myFurnitureTemplate = () => html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
        </div>
        <div id="container" class="row space-top">
        </div>
    </div>
`;

export async function myPage(ctx) {
    ctx.render(myFurnitureTemplate());

    const myItems = await getMyFurnitures(sessionStorage.getItem('userId'));
    const result = myItems.map(furnitureTemplate);
    render(result, document.querySelector('#container'));
}