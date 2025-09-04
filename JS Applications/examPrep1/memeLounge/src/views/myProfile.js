import { getUserData, html } from '../utils.js'
import { getMyMemes } from '../api/data.js'
import { memeTemplate } from './common/memeTemplate.js'

const myProfileTemplate = (myMemes, userData) => html`
<!-- Profile Page ( Only for logged users ) -->
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src=${userData.gender == 'male'? "/images/male.png" : "/images/female.png"}>
            <div class="user-content">
                <p>Username: ${userData.username}</p>
                <p>Email: ${userData.email}</p>
                <p>My memes count: ${myMemes.length ? myMemes.length : 'none'}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            ${myMemes.length
        ? html`
        <!-- Display : All created memes by this user (If any) -->
        ${myMemes.map(memeTemplate)}`
        : html`
        <!-- Display : If user doesn't have own memes  -->
        <p class="no-memes">No memes in database.</p>`
        }
        </div>
    </section>
`;

export async function myProfilePage(ctx) {
    const userData = getUserData();
    const myMemes = await getMyMemes(userData._id);
    ctx.render(myProfileTemplate(myMemes, userData));
}