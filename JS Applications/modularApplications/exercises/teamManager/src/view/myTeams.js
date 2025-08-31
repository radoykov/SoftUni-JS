import { html } from 'https://unpkg.com/lit-html?module'
import { teamTemplate } from './teams.js'
import { getMyTeamsAsAMember, getTeamMembers } from '../api/data.js'

const myTeamsTemplate = (myTeams, members) => html`
<section id="my-teams">

${myTeams.length ? html`
    <article class="pad-med">
        <h1>My Teams</h1>
    </article>
    ${ myTeams.map(objMemeberAndTeam => teamTemplate(objMemeberAndTeam.team, members.filter(member => member.teamId == objMemeberAndTeam.teamId)))}
` : html`
    <article class="layout narrow">
        <div class="pad-med">
            <p>You are not a member of any team yet.</p>
            <p><a href="/teams">Browse all teams</a> to join one, or use the button bellow to cerate your own team.</p>
        </div>
        <div class=""><a href="/createTeam" class="action cta">Create Team</a></div>
    </article>
`}
</section>
`;

const helperTemplate = async (myTeams) => await Promise.all(myTeams.map(async (objMemeberAndTeam) => {
    return teamTemplate(objMemeberAndTeam.team, members)
}));

export async function myTeamsPage(ctx) {
    const myTeams = await getMyTeamsAsAMember(sessionStorage.getItem('userId'));
    const members = await getTeamMembers(myTeams.map(team => team.teamId));

    ctx.render(myTeamsTemplate(myTeams, members));
}