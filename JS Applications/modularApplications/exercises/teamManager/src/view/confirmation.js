import { html } from 'https://unpkg.com/lit-html?module'

export const confirmMsgTemplate = (msg, onAction, btnText) => html`
    <div class="overlay">
            <div class="modal">
                <p>${msg}</p>
                <a @click="${onAction} href="#" class="action">${btnText}</a>
                <a @click="${onAction} href="#" class="action">Cencel</a>
            </div>
    </div>
`;