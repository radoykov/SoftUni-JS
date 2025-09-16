import { getItemFromSessionStorage, getRecipeById, deleteRecipe } from '../api/data.js';
import e from '../../../../../funcCreateElement/funcCreateElement.js'

export function setupDetails(section, nav) {
    return showDetails;

    async function showDetails(id) {

        const details = await getRecipeById(id);

        section.innerHTML = '';
        section.appendChild(createExtendedArticle(details));

        return section;
    }

    function createExtendedArticle(recipe) {

        let article = e('article', {},
            e('h2', {}, recipe.name),
            e('div', { className: 'band' },
                e('div', { className: 'thumb' }, e('img', { src: recipe.img })),
                e('div', { className: 'ingredients' },
                    e('h3', {}, 'Ingredients:'),
                    e('ul', {}, recipe.ingredients.map(i => e('li', {}, i))),
                )
            ),
            e('div', { className: 'description' },
                e('h3', {}, 'Preparation:'),
                recipe.steps.map(s => e('p', {}, s))
            ),
        );
        if (getItemFromSessionStorage('authToken') != null && recipe._ownerId == getItemFromSessionStorage('userId')) {
            article.appendChild(e('div', { className: 'controls' },
                e('button', { onClick: () => nav.goTo('edit', recipe._id) }, '\u270E Edit'),
                e('button', { onClick: onDelete }, '\u2716 Delete'),
            ));
        }
        return article;
        
        async function onDelete() {
            const confirmed = confirm(`Are you sure you want to delete ${recipe.name}?`);
            if (confirmed) {
                await deleteRecipe(recipe._id);
    
                section.innerHTML = '';
                section.appendChild(e('article', {}, e('h2', {}, 'Recipe deleted')));
            }
        }
    }

}
