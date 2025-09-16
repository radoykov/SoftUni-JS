import { html } from 'https://unpkg.com/lit-html?module';

export const rowTemplate = (id, author, title, onEdit, onDelete) => html`
    <tr>
        <td>${title}</td>
        <td>${author}</td>
        <td>
            <button @click="${() => onEdit(id, title, author)}">Edit</button>
            <button @click="${() => onDelete(id)}">Delete</button>
        </td>
    </tr>
`;
