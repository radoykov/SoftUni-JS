import { html } from '../utils.js'
import { getMemes } from '../api/data.js'
import { memeTemplate } from './common/memeTemplate.js'

const allMemesTemplate = (memes) => html`
 <!-- All Memes Page ( for Guests and Users )-->
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
            <!-- Display : All memes in database ( If any ) -->
            ${memes.length
        ? memes.map(memeTemplate)
        : html`
            <!-- Display : If there are no memes in database -->
            <p class="no-memes">No memes in database.</p>
            ` }
        </div>
    </section>
`;

export async function allMemesPage(ctx) {
    const memes = await getMemes();
    ctx.render(allMemesTemplate(memes));
}