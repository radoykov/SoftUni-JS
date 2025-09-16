import { html } from 'https://unpkg.com/lit-html?module'
import { getTeamById, getListOfMemberships, deleteMembership, approveMembership, candidateForMembership } from '../api/data.js'
import { confirmMsgTemplate } from './confirmation.js'

const detailsTemplate = (team, allMembers, onJoin, onApprove, onRemoveMember) => html`
    ${sessionStorage.getItem('authToken')
        ? userTemplate(team, allMembers.filter(member => member.status == 'member'), allMembers.filter(member => member.status == 'pending'), sessionStorage.getItem('userId') == team._ownerId, onJoin, onApprove, onRemoveMember)
        : guestTemplate(team, allMembers.filter(member => member.status == 'member'))}
    `;

const guestTemplate = (team, members) => html`
    <section id="team-home">
        <article class="layout">
            <img src="${team.logoUrl}" class="team-logo left-col">
            <div class="tm-preview">
                <h2>${team.name}</h2>
                <p>${team.description}</p>
                <span class="details">${members.length} Members</span>
            </div>
            ${members ? html`
            <div class="pad-large">
                <h3>Members</h3>
                    <ul class="tm-members">
                        ${members.map(member => html`<li>${member.user.username}</li>`)}
                    </ul >
            </div >`
        : html`<h3>No members already.</h3>`}
        </article >
    </section >
`;

const userTemplate = (team, members, pendingPeople, isOwner, onJoin, onApprove, onRemoveMember) =>
    isOwner
        ? html`
    <section id="team-home">
        <article class="layout">
            <img src="${team.logoUrl}" class="team-logo left-col">
                <div class="tm-preview">
                    <h2>${team.name}</h2>
                    <p>${team.description}</p>
                    <span class="details">${members.length} Members</span>
                    <div>
                        <a href="/edit/${team._id}" class="action">Edit team</a>
                    </div>
                </div>
                ${members ? html`
                <div class="pad-large">
                    <h3>Members</h3>
                    <ul class="tm-members">
                        <li>My Username</li>
                        ${members.map(member => member._ownerId != sessionStorage.getItem('userId')
            ? html`<li>${member.user.username}<a @click=${(ev) => onRemoveMember(ev, member._id)} href="javascript:void(0)" class="tm-control action">Remove from team</a></li>`
            : '')}
                    </ul >
                </div >`
                : html`<h3>No members already.</h3>`}
            ${pendingPeople ? html`
                <div class="pad-large">
                    <h3>Membership Requests</h3>
                    <ul class="tm-members">
                        ${pendingPeople.map(req => html`<li>${req.user.username}<a @click="${(ev) => onApprove(ev, req._id, req)}" href="javascript:void(0)" class="tm-control action">Approve</a><a @click="${(ev) => onRemoveMember(ev, req._id)}" href="#" class="tm-control action">Decline</a></li>`)}
                    </ul>
                </div>
                    ` : html`<h3>No requests already.</h3>`}
        </article>
    </section>
    `
        : html`
       <section id="team-home">
        <article class="layout">
            <img src="${team.logoUrl}" class="team-logo left-col">
            <div class="tm-preview">
                <h2>${team.name}</h2>
                <p>${team.description}</p>
                <span class="details">${members.length} Members</span>
                <div>
                    ${userBtns(team, members, pendingPeople, onJoin, onRemoveMember)}                
               </div>
            </div>
            ${members ? html`
            <div class="pad-large">
                <h3>Members</h3>
                    <ul class="tm-members">
                        ${members.map(member => html`<li>${member.user.username}</li>`)}
                    </ul >
            </div >`
                : html`<h3>No members already.</h3>`}
        </article >
    </section >
`;

function userBtns(team, members, pendingPeople, onJoin, onRemoveMember) {
    const userId = sessionStorage.getItem('userId');
    const req = pendingPeople.find(req => req._ownerId == userId);
    const member = members.find(mem => mem._ownerId == userId);
    if (req) {
        return html`Membership pending. <a @click="${(ev) => onRemoveMember(ev, req._id)}" href="javascript:void(0)">Cancel request</a>`
    } else if (member) {
        return html`<a @click=${(ev) => onRemoveMember(ev, member._id)} href="javascript:void(0)" class="action invert">Leave team</a>`
    } else {
        return html`<a @click=${(ev) => onJoin(ev, team._id)} href="javascript:void(0)" class="action">Join team</a>`;
    }
}
export async function detailsPage(ctx) {
    const teamInfo = await getTeamById(ctx.params.id);
    const membersOfTeam = await getListOfMemberships(ctx.params.id);
    ctx.render(detailsTemplate(teamInfo, membersOfTeam, onJoin, onApprove, onRemoveMember));

    async function onJoin(ev, teamId) {
        await candidateForMembership(teamId);
        const membersOfTeam = await getListOfMemberships(ctx.params.id);
        ctx.render(detailsTemplate(teamInfo, membersOfTeam, onJoin, onApprove, onRemoveMember));

    }

    async function onRemoveMember(ev, id) {
        // ev.preventDefault();

        // const div = document.querySelector('div.overlay');
        // div.querySelector('#yes').addEventListener('click', () => onClick(id));
        // div.querySelector('#cencel').addEventListener('click', async () => {
        //     div.classList.add('hidden');
        // });
        // div.querySelector('p').textContent = 'Are sure you want to delete ?';

        // div.classList.remove('hidden');

        // async function onClick(id) {
        //     await deleteMembership(id);
        //     const membersOfTeam = await getListOfMemberships(ctx.params.id);
        //     ctx.render(detailsTemplate(teamInfo, membersOfTeam, onJoin, onApprove, onRemoveMember));

        //     div.classList.add('hidden');
        // }

        await deleteMembership(id);
        const membersOfTeam = await getListOfMemberships(ctx.params.id);
        ctx.render(detailsTemplate(teamInfo, membersOfTeam, onJoin, onApprove, onRemoveMember));
    }

    async function onApprove(ev, id, obj) {
        await approveMembership(id, obj);
        const membersOfTeam = await getListOfMemberships(ctx.params.id);
        ctx.render(detailsTemplate(teamInfo, membersOfTeam, onJoin, onApprove, onRemoveMember));

    }
}
