import { html } from 'https://unpkg.com/lit-html?module';

export const itemTemplate = (item) => html`<option value=${item._id}>${item.text}</option>`;