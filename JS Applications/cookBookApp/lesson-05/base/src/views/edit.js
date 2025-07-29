import { convertingFormData } from './create.js'
import { getRecipeById, putRecipe } from '../api/data.js'

let recipeId;

export function setupEdit(section, nav) {
    const form = section.querySelector('form');

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const obj = convertingFormData(new FormData(ev.target));

        const data = await putRecipe(recipeId, obj);
        nav.goTo('details', recipeId);

        //make it without additional get request
        // obj['_ownerId'] = data._ownerId;
        // obj['_id'] = data._id;
        main.innerHTML = '';
    });

    return showEdit;

    async function showEdit(id) {
        recipeId = id;

        const recipe = await getRecipeById(recipeId);

        section.querySelector('[name="name"]').value = recipe.name;
        section.querySelector('[name="img"]').value = recipe.img;
        section.querySelector('[name="ingredients"]').value = recipe.ingredients.join('\n');
        section.querySelector('[name="steps"]').value = recipe.steps.join('\n');

        return section;
    }
}
