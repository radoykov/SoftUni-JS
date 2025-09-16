import { html } from 'https://unpkg.com/lit-html?module';
import { repeat } from 'https://unpkg.com/lit-html/directives/repeat.js';

export const townCard = (names) => html`
<ul>
 ${repeat(names, name => name, name => html`
  <li>${name}</li>
`)}
</ul>
`;