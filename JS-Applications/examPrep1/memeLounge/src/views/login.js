import { html } from '../utils.js'
import { login } from '../api/data.js'
import { notify } from '../notification.js';

const loginTemplate = (onLogin) => html`
<!-- Login Page ( Only for guest users ) -->
<section id="login">
        <form @submit=${onLogin} id="login-form">
            <div class="container">
                <h1>Login</h1>
                <label for="email">Email</label>
                <input id="emailLogin" placeholder="Enter Email" name="email" type="text">
                <label for="password">Password</label>
                <input id="passwordLogin" type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn button" value="Login">
                <div class="container signin">
                    <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                </div>
            </div>
        </form>
</section>
`;

export function loginPage(ctx, setUserNav) {
    ctx.render(loginTemplate(onLogin));

    async function onLogin(ev) {
        ev.preventDefault();
        try {
            const formData = new FormData(ev.target);
            let [email, password] = formData.values();

            if (email == '') throw new Error('Email mustn\'t be empty!');
            if (password == '') throw new Error('Password mustn\'t be empty!');

            await login({email, password});
            
            setUserNav();
            ctx.page.redirect('/all-memes');
            ev.target.reset();

        } catch (err) {
            notify(err.message);
        }
    }
}