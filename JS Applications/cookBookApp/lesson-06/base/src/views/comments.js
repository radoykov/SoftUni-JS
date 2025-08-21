import { render, html} from '../dom.js';
import { getCommentsByRecipeId, postComment, getItemFromSessionStorage } from '../api/data.js';


const commentsTemplate = (recipe, commentForm, comments) => html`
    <div class="section-title">
        Comments for ${recipe.name}
    </div>
    ${commentForm}
    <div class="comments">
        ${commentsList(comments)}
    </div>
`;

const commentFormTemplate = (active, toggleForm) => html`
    <article class="new-comment">
        ${active
        ? html`
        <h2>New comment</h2>
        <form id="commentForm">
            <textarea name="content" placeholder="Type comment"></textarea>
            <input type="submit" value="Add comment">
        </form>`
        : html`<form><button class="button" @click=${toggleForm}>Add comment</button></form>`}
    </article>
`;

const commentsList = (comments) => html`
    <ul>
        ${comments.map(comment)}
    </ul>
`;

const comment = (data) => html`
    <li class="comment">
        <header>${data.author.email}</header>
        <p>${data.content}</p>
    </li>
`;

export async function showComments(recipe, nav) {
    let formActive = false;
    nav.registerForm('commentForm', onComment);
    const comments = await getCommentsByRecipeId(recipe._id);
    const result = document.createElement('div');
    renderTemplate(comments);

    return result;

    function renderTemplate(comments) {
        comments = comments.reverse();
        render(commentsTemplate(recipe, createForm(formActive, toggleForm), comments), result);
    }

    function toggleForm() {
        formActive = !formActive;
        renderTemplate(comments);
    }

    async function onComment(data) {
        toggleForm();
        let commentsCopy = comments;

        const comment = {
            content: data.content,
            recipeId: recipe._id
        };

        const result = await postComment(comment);

        renderTemplate(await getCommentsByRecipeId(result.recipeId));
    }
}

function createForm(formActive, toggleForm) {
    const userId = getItemFromSessionStorage('userId');
    if (userId == null) {
        return '';
    } else {
        return commentFormTemplate(formActive, toggleForm);
    }
}