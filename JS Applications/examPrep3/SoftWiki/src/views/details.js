import { deleteArticle, getArticleById } from '../api/data.js';
import { html, getAccessToken, getUserId } from '../utils.js'

const detailsTemplate = (article, onDelete) => html`
<!-- Details -->
    <section id="details-page" class="content details">
        <h1>${article.title}</h1>
        <div class="details-content">
            <strong>Published in category ${article.category}</strong>
            <p>${article.content}</p>
            <div class="buttons">
                ${getAccessToken() && getUserId() == article._ownerId
                    ? html`
                    <a @click=${onDelete} href="javascript:void(0)" class="btn delete">Delete</a>
                    <a href=${`/edit/${article._id}`} class="btn edit">Edit</a>
                    <a @click=${() => history.back()} href="javascript:void(0)" class="btn edit">Back</a>`

                    : html`
                    <a @click=${() => history.back()} href="javascript:void(0)" class="btn edit">Back</a>`
                }
            </div>
        </div>
    </section>
`;

export async function detailsPage(ctx) {
    const article = await getArticleById(ctx.params.id);
    ctx.render(detailsTemplate(article, onDelete));

    async function onDelete(ev) {
        ev.preventDefault();

        await deleteArticle(ctx.params.id);
        ctx.page.redirect('/catalog')
    }
}