import { main } from './app.js';
import { convertingFormData } from './create.js'
import { createCustomArticle } from './baseFunctions.js'

let section;
let recipeId;

export function setupEdit(targetSection) {
    section = targetSection;
    const form = targetSection.querySelector('form');

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const obj = convertingFormData(new FormData(ev.target));
        const token = sessionStorage.getItem('authToken');
        if (token == null) {
            alert('Error token is null in create!');
            return;
        }

        const response = await fetch('http://localhost:3030/data/recipes/' + recipeId, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(obj)
        }
        );
        if (response.ok == false) {
            alert('Error server not responded!');
        }
        const data = await response.json();
        //make it without additional get request
        obj['_ownerId'] = data._ownerId;
        obj['_id'] = data._id;
        main.innerHTML = '';
        main.appendChild(createCustomArticle(true, obj));
    });
}

export async function showEdit(id) {
    if (id) {
        recipeId = id;
    }

    main.innerHTML = '';
    main.appendChild(section);

    const response = await fetch('http://localhost:3030/data/recipes/' + id);
    const recipe = await response.json();

    section.querySelector('[name="name"]').value = recipe.name;
    section.querySelector('[name="img"]').value = recipe.img;
    section.querySelector('[name="ingredients"]').value = recipe.ingredients.join('\n');
    section.querySelector('[name="steps"]').value = recipe.steps.join('\n');
}