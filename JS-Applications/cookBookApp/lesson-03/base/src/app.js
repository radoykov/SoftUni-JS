import e from '../../../../funcCreateElement/funcCreateElement.js'

window.addEventListener('load', async () => {
    if (sessionStorage.getItem('authToken') != null) {
        document.querySelector('div#user').style.display = 'inline-block';
        document.getElementById('logoutBtn').addEventListener('click', logout);
    } else {
        document.querySelector('div#guest').style.display = 'inline-block';
    }

    loadPreview();
});

async function logout(ev) {
    const response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': sessionStorage.getItem('authToken')
        },
    });
    if (response.ok == false) {
        alert('Error in logout!');
        return;
    }
    sessionStorage.removeItem('authToken');
    window.location.replace('http://127.0.0.1:5500/cookBookApp/lesson-03/base/index.html');
}


async function loadPreview() {
    const main = document.querySelector('main');
    const url = `http://localhost:3030/data/recipes`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        main.innerHTML = "";
        Object.values(data).forEach(oneData => {
            const article = createCustomArticle(false, oneData);
            main.appendChild(article);
        });

    } catch (err) {
        console.log(err);
    }

}
function createCustomArticle(isExtended, recipe) {
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
        const main = document.querySelector('main');
        const url = `http://localhost:3030/data/recipes/${recipe._id}`;

        try {
            const response = await fetch(url);
            const details = await response.json();

            let currArticle = ev.target;
            while (currArticle && currArticle.tagName !== 'ARTICLE') {
                currArticle = currArticle.parentNode;
            }

            const newArticle = createCustomArticle(true, details);
            const myIndex = [...main.children].findIndex(el => el == currArticle);
            main.insertBefore(newArticle, main.children[myIndex]);
            currArticle.remove();

        } catch (err) {
            console.log(err);
        }
    }
}