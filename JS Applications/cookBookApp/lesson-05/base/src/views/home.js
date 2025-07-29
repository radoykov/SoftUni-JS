import e from '../../../../../funcCreateElement/funcCreateElement.js'
import { getRecentRecipes } from '../api/data.js';


export function setupHome(section, nav) {
    const container = section.querySelector('.recent-recipes');
    return showHome;

    async function showHome() {

        const recipes = await getRecentRecipes();
        const cards = recipes.map(createArticlePreview);

        const fragment = document.createDocumentFragment();

        while (cards.length > 0) {
            fragment.appendChild(cards.shift());
            if (cards.length > 0) {
                fragment.appendChild(createSpacer());
            }
        }
        container.innerHTML = '';
        container.appendChild(fragment);

        return section;
    }

    function createArticlePreview(recipe) {
        return e('article', { className: 'recent', onClick: () => nav.goTo('details', recipe._id) },
            e('div', { className: 'recent-preview' }, e('img', { src: recipe.img })),
            e('div', { className: 'recent-title' }, recipe.name),
        );
    }

    function createSpacer() {
        return e('div', { className: 'recent-space' });
    }

}