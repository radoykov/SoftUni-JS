import { getRecipes, getRecipeCount } from '../api/data.js'
import e from '../../../../../funcCreateElement/funcCreateElement.js'

export function setupCatalog(section, nav) {
    return showCatalog;

    async function showCatalog(page = 1) {

        const data = await getRecipes(page);

        const count = await getRecipeCount();
        const pages = Math.ceil(count / 5);

        const fragment = document.createDocumentFragment();
        fragment.appendChild(createPager(page, pages, true));

        Object.values(data).forEach(oneData => {
            const article = createArticlePreview(oneData);
            fragment.appendChild(article);
        });
        fragment.appendChild(createPager(page, pages));

        section.innerHTML = "";
        section.appendChild(fragment);

        return section;
    }
    function createArticlePreview(recipe) {
        return e('article', { className: 'preview', onClick: () => nav.goTo('details', recipe._id) },
            e('div', { className: 'title' }, e('h2', {}, recipe.name)),
            e('div', { className: 'small' }, e('img', { src: recipe.img })),
        );
    }
    function createPager(page, pages, header) {
        const type = header ? 'header' : 'footer';
        const result = e(type, { className: 'section-title' }, `Page ${page} of ${pages}`);
        if (page > 1) {
            result.appendChild(e('a', { href: '/catalog', className: 'pager', onClick: (e) => { e.preventDefault(); nav.goTo('catalog', page - 1); } }, '< Prev'));
        }
        if (page < pages) {
            result.appendChild(e('a', { href: '/catalog', className: 'pager', onClick: (e) => { e.preventDefault(); nav.goTo('catalog', page + 1); } }, ' Next >'));
        }
        return result;
    }
}

