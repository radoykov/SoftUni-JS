import { html } from '../utils.js'
import { catalogArticleTemplate } from './catalog.js'
import { searchForArticles } from '../api/data.js'

const searchTemplate = (articles, onClick) => html`
    <!-- Search  -->
    <section id="search-page" class="content">
        <h1>Search</h1>
        <form id="search-form">
            <p class="field search">
                <input type="text" placeholder="Search by article title" name="search">
            </p>
            <p class="field submit">
                <input @click=${onClick} class="btn submit" type="submit" value="Search">
            </p>
        </form>
        <div class="search-container">
            ${articles.length
        ? articles.map(catalogArticleTemplate)
        : html`
                <h3 class="no-articles">No matching articles</h3>`
    }
        </div>
    </section>
`;

export async function searchPage(ctx) {
    const title = ctx.querystring.split('=')[1];
    const articles = await searchForArticles(title);

    ctx.render(searchTemplate(articles, onClick));

    function onClick(ev) {
        ev.preventDefault();
    
        const query = document.querySelector('input[name="search"]').value;
        ctx.page.redirect('/search?query=' + query);
    }
}
