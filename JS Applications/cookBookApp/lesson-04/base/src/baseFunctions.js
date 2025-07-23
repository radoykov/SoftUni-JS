import e from '../../../../funcCreateElement/funcCreateElement.js'
import { main } from './app.js'
import { showEdit } from './edit.js';

export function createCustomArticle(isExtended, recipe) {
    let article;

    if (isExtended) {
        article =
            e('article', {},
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
        if (sessionStorage.getItem('authToken') != null && recipe._ownerId == sessionStorage.getItem('userId')) {
            article.appendChild(e('div', { className: 'controls' },
                e('button', { onClick: () => showEdit(recipe._id) }, '\u270E Edit'),
                e('button', { onClick: onDelete }, '\u2716 Delete'),
            ));
        }
    } else {
        article =
            e('article', { className: "preview", onClick: onLoad },
                e('div', { className: "title" },
                    e('h2', {}, recipe.name)),
                e('div', { className: "small" },
                    e('img', { src: recipe.img })));
    }

    return article;

    async function onLoad(ev) {
        ev.preventDefault();
        const url = `http://localhost:3030/data/recipes/${recipe._id}`;

        try {
            const response = await fetch(url);
            const details = await response.json();

            const newArticle = createCustomArticle(true, details);
            main.innerHTML = '';
            main.appendChild(newArticle);


        } catch (err) {
            console.log(err);
        }
    }
    async function onDelete() {
        const confirmed = confirm(`Are you sure you want to delete ${recipe.name}?`);
        if (confirmed) {

            const response = await fetch('http://localhost:3030/data/recipes/' + recipe._id, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.getItem('authToken')
                }
            });

            if (response.ok == false) {
                alert('Error with delete recipe.');
                return;
            }

            main.innerHTML = '';
            main.appendChild(e('article', {}, e('h2', {}, 'Recipe deleted')));
        }
    }
}