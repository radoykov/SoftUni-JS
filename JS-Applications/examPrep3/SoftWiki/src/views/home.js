import { html } from '../utils.js'
import { getArticlesForHome } from '../api/data.js'

const homeTemplate = (articles) => html`
  <!-- Home -->
    ${articles.map(articleHomeTemplate)}
`;
const articleHomeTemplate = (article) => html`
      <section class="recent article">
            <h2>${article.category}</h2>
            ${article.title
        ? html` <article>
                <h3>${article.title}</h3>
                <p>${article.content}</p>
                <a href=${`/details/${article._id}`} class="btn details-btn">Details</a>
            </article>`
        : html`<h3 class="no-articles">No articles yet</h3>`
    }
    </section>
`;

export async function homePage(ctx) {
    const articles = await getArticlesForHome()
    ctx.render(homeTemplate(articles));
}