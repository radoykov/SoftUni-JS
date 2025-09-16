import { html } from '../utils.js'
import { createArticle } from '../api/data.js'


const createTemplate = (onCreate) => html`
<!-- Create -->
    <section id="create-page" class="content">
        <h1>Create Article</h1>
        <form @submit=${onCreate} id="create" action="#" method="">
            <fieldset>
                <p class="field title">
                    <label for="create-title">Title:</label>
                    <input type="text" id="create-title" name="title" placeholder="Enter article title">
                </p>
                <p class="field category">
                    <label for="create-category">Category:</label>
                    <input type="text" id="create-category" name="category" placeholder="Enter article category">
                </p>
                <p class="field">
                    <label for="create-content">Content:</label>
                    <textarea name="content" id="create-content"></textarea>
                </p>
                <p class="field submit">
                    <input class="btn submit" type="submit" value="Create">
                </p>
            </fieldset>
        </form>
    </section>
`;

export async function createPage(ctx) {
    ctx.render(createTemplate(onCreate));

    async function onCreate(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        let [title, category, content] = formData.values();
        if (category == '') { alert('Category must be filled in!'); return; }

        await createArticle({ title, category, content });
        ctx.page.redirect('/catalog')

        ev.target.reset();
    }
}