import { html } from 'https://unpkg.com/lit-html?module';
import { styleMap } from 'https://unpkg.com/lit-html/directives/style-map.js?module';

export const catCard = (data) => html`
    <li>
        <img src="./images/${data.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button class="showBtn">${data.isVisible ? 'Hide status code' : 'Show status code'}</button>
                <div class="status" id=${data.id} style=${styleMap({display : data.isVisible ? 'block' : 'none'})}>
                    <h4>Status Code: ${data.statusCode}</h4>
                    <p>${data.statusMessage}</p>
                </div>
            </div>
    </li>
`;