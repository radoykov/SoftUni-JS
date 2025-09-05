import { html } from '../utils.js'
import { getArticlesForCatalog } from '../api/data.js'


const catalogTemplate = (articles) => html`
 <!-- catalogue -->
    <section id="catalog-page" class="content catalogue">
        ${articles.length
        ? html`<h1>All Articles</h1>
            ${articles.map(catalogArticleTemplate)}
        `: html`
        <!-- No articles message -->
        <h3 class="no-articles">No articles yet</h3> `
    }
    </section>
`;

export const catalogArticleTemplate = (article) => html`
    <a class="article-preview" href=${`/details/${article._id}`}>
        <article>
            <h3>Topic: <span>${article.title}</span></h3>
            <p>Category: <span>${article.category}</span></p>
        </article>
    </a>
`;


export async function catalogPage(ctx) {
    const articles = await getArticlesForCatalog();
    ctx.render(catalogTemplate(articles));
}