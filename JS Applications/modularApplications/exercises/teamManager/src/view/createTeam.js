import { html } from 'https://unpkg.com/lit-html?module'
import { createTeam, candidateForMembership, approveMembership} from '../api/data.js';
const createTeamTemplate = (onCreate, errorMsg) => html`
    <section id="create">
        <article class="narrow">
            <header class="pad-med">
                <h1>New Team</h1>
            </header>
            <form @submit=${onCreate} id="create-form" class="main-form pad-large">
                ${errorMsg ? html`<div class="error">${errorMsg}</div>` : ''}
                <label>Team name: <input type="text" name="name"></label>
                <label>Logo URL: <input type="text" name="logoUrl"></label>
                <label>Description: <textarea name="description"></textarea></label>
                <input class="action cta" type="submit" value="Create Team">
            </form>
        </article>
    </section>
`;

export function createTeamPage(ctx) {
    ctx.render(createTeamTemplate(onCreate));
    async function onCreate(ev) {
        ev.preventDefault();
        try {
            const formData = new FormData(ev.target);
            let [name, logoUrl, description] = formData.values();

            if (name.length < 4) {
                throw new Error('Error too short name!');
            }
            if(logoUrl == ''){
                throw new Error('Error logoUrl is required!');
            }
            if(description.length < 10){
                throw new Error('Error too short decription!');
            }
           const newCreatedTeam =  await createTeam({ name, logoUrl, description });
            ctx.page.redirect(`/details/${newCreatedTeam._id}`);
            ev.target.reset();
            const obj = await candidateForMembership(newCreatedTeam._id);
            await approveMembership(obj._id, obj);
        } catch (err) {
            ctx.render(createTeamTemplate(onCreate, err.message));
        }
    }
}