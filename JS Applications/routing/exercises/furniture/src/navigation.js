export function setUserNav() {
    if (sessionStorage.getItem('authToken') != null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}
export function currentPosition(pathname) {
    const aArr = [...document.querySelectorAll('nav a')];
    
    let match = pathname.match(/^\/([^/]+)/);
    pathname = match ? match[1] : "";
    pathname += 'Link';

    aArr.forEach(a => a.classList.remove('active'));
    if (aArr.some(a => a.id == pathname)) {
        (aArr.find(el => el.id == pathname)).classList.add('active');
    } else {
        (aArr.find(el => el.id == 'catalogLink')).classList.add('active');
    }
}