export async function proFetch(url, method = 'get', body = {}, token = null, isItLogout = false) {
    const headers = {
        'Content-Type': 'application/json',
    }
    if (token != null && token != undefined) {
        headers['X-Authorization'] = token;
    }
    const obj = {
        method: method,
        headers: headers,
    };
    if (Object.keys(body).length > 0) {
        obj['body'] = JSON.stringify(body);
    }
    const response = await fetch(url, obj);
    if (response.ok == false) {
        alert(`Error in fetch : ${response.statusText}`);
        return;
    }
    if (isItLogout) {
        return;
    }
    const data = await response.json();
    return data;
}
export function addToMainSections(mainContainer, sectionsForAppending, idsToLive = ['nav', 'footer']) {
    [...mainContainer.children].forEach(el => {
        if (idsToLive.includes(el.id) == false) {
            el.remove();
        }
    });
    sectionsForAppending.forEach(sectionEl => mainContainer.insertBefore(sectionEl, mainContainer.lastElementChild));

}

export function setUserNav(section, other) {
    let [aWelcome, aLogout, aLogin, aRegister] = section.querySelectorAll('nav ul a');
    if (aWelcome == null) {
        [aWelcome, aLogout, aLogin, aRegister] = other.querySelectorAll('nav ul a');
    }

    if (sessionStorage.getItem('authToken') != null) {
        aWelcome.textContent = `Welcome ${sessionStorage.getItem('userEmail') ? sessionStorage.getItem('userEmail') : ''}`;
        aWelcome.classList.remove('hidden');
        aLogout.classList.remove('hidden');
        aLogin.classList.add('hidden');
        aRegister.classList.add('hidden');
    } else {
        aWelcome.classList.add('hidden');
        aLogout.classList.add('hidden');
        aLogin.classList.remove('hidden');
        aRegister.classList.remove('hidden');
    }
}