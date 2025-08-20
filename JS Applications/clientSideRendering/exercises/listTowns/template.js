import { html } from 'https://unpkg.com/lit-html?module';
import { repeat } from 'https://unpkg.com/lit-html/directives/repeat.js'; 

export const townTemplate = (items) => html`
  <ul>
    ${repeat(items, item => item.name, item => html`
      <li>${item}</li>
    `)}
  </ul>
`;