import { proFetch } from './api.js';

const urls = {
    login: "http://localhost:3030/users/login",
    register: "http://localhost:3030/users/register",
    logout: "http://localhost:3030/users/logout",
    teams: "http://localhost:3030/data/teams",
    members: "http://localhost:3030/data/members",
    allMembers: "http://localhost:3030/data/members?where=status%3D%22member%22",
    membersByIds: (teamIds) => {
        const url = "http://localhost:3030/data/members?where=";
        return url + encodeURIComponent(`teamId IN ("${teamIds.join('", "')}") AND status="member"`)
    },
    myTeamsAsMember: (userId) => `http://localhost:3030/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`,
    listOfMemberships: (teamId) => `http://localhost:3030/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`

};

export async function login(obj) {
    const data = await proFetch(urls.login, 'post', obj);
    sessionStorage.setItem('authToken', data['accessToken']);
    sessionStorage.setItem('userId', data._id);

    return data;
}

export async function register(obj) {
    const data = await proFetch(urls.register, 'post', obj);
    sessionStorage.setItem('authToken', data['accessToken']);
    sessionStorage.setItem('userId', data._id);

    return data;
}

export async function logout() {
    const data = await proFetch(urls.logout, 'get', {}, sessionStorage.getItem("authToken"), true);
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');

    return data;
}

export const getTeams = async () => await proFetch(urls.teams);
export const getTeamById = async (id) => await proFetch(urls.teams + `/${id}`);
export const createTeam = async (obj) => await proFetch(urls.teams, 'post', obj, sessionStorage.getItem('authToken'));
export const updateTeam = async (obj, id) => await proFetch(urls.teams + `/${id}`, 'put', obj, sessionStorage.getItem('authToken'));
export const getAllMembersInTeams = async () => await proFetch(urls.allMembers);
export const getTeamMembers = async (ids) => await proFetch(urls.membersByIds(ids));
export const getMyTeamsAsAMember = async (userId) => await proFetch(urls.myTeamsAsMember(userId));
export const getListOfMemberships = async (teamId) => await proFetch(urls.listOfMemberships(teamId));
export const candidateForMembership = async (teamId) => await proFetch(urls.members, 'post', { teamId }, sessionStorage.getItem('authToken'));
export const approveMembership = async (id, obj) => {
    obj.status = 'member';
    return await proFetch(urls.members + `/${id}`, 'put', obj, sessionStorage.getItem('authToken'));
}
export const deleteMembership = async (id) => await proFetch(urls.members + `/${id}`, 'delete', {}, sessionStorage.getItem('authToken'));