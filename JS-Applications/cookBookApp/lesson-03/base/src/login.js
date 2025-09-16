function login() {
    document.querySelector('form').addEventListener('submit', onLogin);
}
async function onLogin(ev) {
    ev.preventDefault();
    const dataFromForm = new FormData(ev.target);
    let [email, password] = dataFromForm.values();

    if (email == '' || password == '') {
        alert('Error fields must not be empty!');
        return;
    }
    const response = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password
        })
    }
    );
    if (response.ok == false) {
        alert('Error server not responded!');
        return;
    }
    const data = await response.json();

    sessionStorage.setItem('authToken', data.accessToken);
    window.location.replace('http://127.0.0.1:5500/cookBookApp/lesson-03/base/index.html');

    form.reset();
}

login();