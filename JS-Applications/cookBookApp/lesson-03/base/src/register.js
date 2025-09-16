function register() {
    document.querySelector('form').addEventListener('submit', onRegistration);
}
async function onRegistration(ev) {
    ev.preventDefault();
    const dataFromForm = new FormData(ev.target);
    let [email, password, repass] = dataFromForm.values();

    if (email == '' || password == '' || repass == '') {
        alert('Error fields must not be empty!');
        return;
    } if (password !== repass) {
        alert('Error password and repass difference!');
        return;
    }
    const response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password,
            repass
        })
    }
    );
    if (response.ok == false) {
        alert('Error server not responded!');
    }
    const data = await response.json();

    sessionStorage.setItem('authToken', data.accessToken);
    window.location.replace('http://127.0.0.1:5500/cookBookApp/lesson-03/base/index.html');
    form.reset();
}

register();