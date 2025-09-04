import { html } from '../../utils.js'

export const memeTemplate = (meme) => html`
    <div class="meme">
        <div class="card">
            <div class="info">
                <p class="meme-title">${meme.title}</p>
                <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
            </div>
            <div id="data-buttons">
                <a class="button" href="${`/details/${meme._id}`}">Details</a>
            </div>
        </div>
    </div>
`;