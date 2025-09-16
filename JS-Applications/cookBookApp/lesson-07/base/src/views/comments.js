import { render, html } from '../dom.js';
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

const commentFormTemplate = (active, toggleForm, onSubmit) => html`
    <article class="new-comment">
        ${active
        ? html`
        <h2>New comment</h2>
        <form id="commentForm" @submit=${onSubmit}>
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

export async function showComments(recipe) {
    const recipeId = recipe._id;
    let formActive = false;
    const comments = await getCommentsByRecipeId(recipe._id);
    const result = document.createElement('div');
    renderTemplate(comments);

    return result;

    function renderTemplate(comments) {
        comments = comments.reverse();
        render(commentsTemplate(recipe, createForm(formActive, toggleForm, onSubmit), comments), result);
    }

    function toggleForm() {
        formActive = !formActive;
        renderTemplate(comments);
    }

    async function onSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        toggleForm();
        const commentsThis = comments;

        const comment = {
            content: data.get('content'),
            recipeId
        };
        console.log(comment);

        const result = await postComment(comment);

        commentsThis.unshift(result);
        renderTemplate(commentsThis);
    }
}

function createForm(formActive, toggleForm, onSubmit) {
    const userId = getItemFromSessionStorage('userId');
    if (userId == null) {
        return '';
    } else {
        return commentFormTemplate(formActive, toggleForm, onSubmit);
    }
}