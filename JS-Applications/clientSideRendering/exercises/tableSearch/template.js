import { html } from 'https://unpkg.com/lit-html?module';

export const tableRowTemplate = (data) => html`
    <tr>
        <td>${data.firstName} ${data.lastName}</td>
        <td>${data.email}</td>
        <td>${data.course}</td>
    </tr>
`;