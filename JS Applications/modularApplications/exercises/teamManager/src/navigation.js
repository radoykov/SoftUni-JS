export function setUserNav() {
    let userLinks = ['myTeamsLink', 'logoutLink'];
    let guestLinks = ['loginLink', 'registerLink'];
    userLinks = userLinks.map(link => document.getElementById(link));
    guestLinks = guestLinks.map(link => document.getElementById(link));

    if (sessionStorage.getItem('authToken') != null) {
        guestLinks.forEach(el => el.classList.add('hidden'));
        userLinks.forEach(el => el.classList.remove('hidden'));
    } else {
        guestLinks.forEach(el => el.classList.remove('hidden'));
        userLinks.forEach(el => el.classList.add('hidden'));
    }
}