import { html } from '../utils.js'
import { login } from '../api/data.js'

const loginTemplate = (onLogin) => html`
<!-- Login Page -->
    <section id="login">
        <div class="container">
            <form @submit=${onLogin} id="login-form" action="#" method="post">
                <h1>Login</h1>
                <p>Please enter your credentials.</p>
                <hr>
                <p>Username</p>
                <input placeholder="Enter Username" name="username" type="text">
                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn" value="Login">
            </form>
            <div class="signin">
                <p>Don't have an account?
                    <a href="/register">Sign up</a>.
                </p>
            </div>
        </div>
    </section>
`;

export function loginPage(ctx, setUserNav) {
    ctx.render(loginTemplate(onLogin));

    async function onLogin(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        let [username, password] = formData.values();

        if (username == '') { alert('Username mustn\'t be empty!'); return; }
        if (password == '') { alert('Password mustn\'t be empty!'); return; }

        await login({ username, password });

        setUserNav();
        ctx.page.redirect('/all-listings');
        ev.target.reset();
    }
}