import { html } from 'https://unpkg.com/lit-html?module'
import { getTeams, getAllMembersInTeams} from '../api/data.js'

const teamsTemplate = (teams, allMembers) => html`
    <section id="browse">

        <article class="pad-med">
            <h1>Team Browser</h1>
        </article>

    ${sessionStorage.getItem('authToken') ? html` 
        <article class="layout narrow">
            <div class="pad-small"><a href="/createTeam" class="action cta">Create Team</a></div>
        </article>` : ''}

        ${teams.map(team => teamTemplate(team, allMembers.filter(member => member.teamId == team._id)))}

    </section>
        <footer id="footer">
        SoftUni &copy; 2014-2021
    </footer>
`;

export const teamTemplate = (team, members) => html`
    <article class="layout">
        <img src="${team.logoUrl}" class="team-logo left-col">
            <div class="tm-preview">
                <h2>${team.name}</h2>
                <p>${team.description}</p>
                <span class="details">${members.length} Members</span>
                <div><a href="/details/${team._id}" class="action">See details</a></div>
            </div>
    </article>
`;

export async function teamsPage(ctx) {
    const teams = await getTeams();
    const allMembers = await getAllMembersInTeams();
    ctx.render(teamsTemplate(teams, allMembers));
}