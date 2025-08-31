import { html } from 'https://unpkg.com/lit-html?module'
import { updateTeam, getTeamById } from '../api/data.js';

const editTeamTemplate = (team = {}, onEdit, errorMsg) => html`
    <section id="edit">
        <article class="narrow">
            <header class="pad-med">
                <h1>Edit Team</h1>
            </header>
            <form @submit=${onEdit} id="edit-form" class="main-form pad-large">
                ${errorMsg ? html`<div class="error">${errorMsg}</div>` : ''}
                ${Object.keys(team).length ? html`
                <label>Team name: <input type="text" name="name" value="${team.name}"></label>
                <label>Logo URL: <input type="text" name="logoUrl" value="${team.logoUrl}"></label>
                <label>Description: <textarea name="description">${team.description}</textarea></label>` : html`

                <label>Team name: <input type="text" name="name"></label>
                <label>Logo URL: <input type="text" name="logoUrl"></label>
                <label>Description: <textarea name="description"></textarea></label>
                `}
                <input class="action cta" type="submit" value="Save Changes">
            </form>
        </article>
    </section>
`;

export async function editTeamPage(ctx) {
    const team = await getTeamById(ctx.params.id);
    ctx.render(editTeamTemplate(team, onEdit));
    let obj = {};
    async function onEdit(ev) {
        ev.preventDefault();
        try {
            const formData = new FormData(ev.target);
            let [name, logoUrl, description] = formData.values();
            obj.name = name;
            obj.logoUrl = logoUrl;
            obj.description = description;

            if (name.length < 4) {
                throw new Error('Error too short name!');
            }
            if (logoUrl == '') {
                throw new Error('Error logoUrl is required!');
            }
            if (description.length < 10) {
                throw new Error('Error too short decription!');
            }
            await updateTeam(obj, ctx.params.id);
            ctx.page.redirect(`/details/${ctx.params.id}`);
            ev.target.reset();

        } catch (err) {
            ctx.render(editTeamTemplate(obj, onEdit, err.message));
        }
    }
}