import { editArticle, getArticleById } from '../api/data.js';
import { html } from '../utils.js'

const editTemplate = (article, onEdit) => html`
<!-- Edit -->
    <section id="edit-page" class="content">
        <h1>Edit Article</h1>
        <form @submit=${onEdit} id="edit" action="#" method="">
            <fieldset>
                <p class="field title">
                    <label for="title">Title:</label>
                    <input type="text" name="title" id="title" placeholder="Enter article title" value=${article.title}>
                </p>
                <p class="field category">
                    <label for="category">Category:</label>
                    <input type="text" name="category" id="category" placeholder="Enter article category" value=${article.category}>
                </p>
                <p class="field">
                    <label for="content">Content:</label>
                    <textarea name="content" id="content" >${article.content}</textarea>
                </p>
                <p class="field submit">
                    <input class="btn submit" type="submit" value="Save Changes">
                </p>
            </fieldset>
        </form>
    </section>
`;

export async function editPage(ctx) {
    const article = await getArticleById(ctx.params.id);
    ctx.render(editTemplate(article, onEdit));

    async function onEdit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        let [title, category, content] = formData.values();
        if (category == '') { alert('Category must be filled in!'); return; }

        await editArticle({ title, category, content }, ctx.params.id);

        ev.target.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }
}