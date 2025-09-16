import { html, getAccessToken, getUserData } from '../utils.js'
import { getMemeById, deleteMemeById } from '../api/data.js'

const detailsTemplate = (meme, onDelete) => html`
<!-- Details Meme Page (for guests and logged users) -->
    <section id="meme-details">
        <h1>Meme Title: ${meme.title}
        </h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src="${meme.imageUrl}">
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>${meme.description}</p>
                ${getAccessToken() && meme._ownerId == getUserData()._id
        ? html`
                <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                <a class="button warning" href=${`/edit/${meme._id}`}>Edit</a>
                <button @click=${onDelete} class="button danger">Delete</button>`
        : ''}
            </div>
        </div>
    </section>
`;

export async function detailsPage(ctx) {
    const meme = await getMemeById(ctx.params.id);
    ctx.render(detailsTemplate(meme, onDelete));

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete this meme?');
        if (confirmed) {
            await deleteMemeById(ctx.params.id);
            ctx.page.redirect('/all-memes');
        }
    }
}