import { html } from '../dom.js';
import { convertingFormData } from './create.js'
import { getRecipeById, putRecipe } from '../api/data.js'

const editTemplate = (recipe) => html`
<section id="create">
    <article>
        <h2>Edit Recipe</h2>
        <form id="editForm">
            <label>Name: <input type="text" name="name" placeholder="Recipe name" .value=${recipe.name}></label>
            <label>Image: <input type="text" name="img" placeholder="Image URL" .value=${recipe.img}></label>
            <label class="ml">Ingredients: <textarea name="ingredients"
                    placeholder="Enter ingredients on separate lines"
                    .value=${recipe.ingredients.join('\n')}></textarea></label>
            <label class="ml">Preparation: <textarea name="steps"
                    placeholder="Enter preparation steps on separate lines"
                    .value=${recipe.steps.join('\n')}></textarea></label>
            <input type="submit" value="Save Changes">
        </form>
    </article>
</section>`;

export function setupEdit(nav) {
    return showEdit;

    async function showEdit(recipeId) {
        nav.registerForm('editForm', onClick);
        const recipe = await getRecipeById(recipeId);

        return editTemplate(recipe);

        async function onClick(data) {
            const body = convertingFormData(data);

            await putRecipe(recipeId, body);
            nav.goTo('details', recipeId);
        }
    }
}
export function setupDeleted() {
    return () => html`
    <section id="details">
        <article>
            <h2>Recipe deleted</h2>
        </article>
    </section>
`;
}