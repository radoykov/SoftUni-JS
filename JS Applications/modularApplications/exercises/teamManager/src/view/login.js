import { html } from 'https://unpkg.com/lit-html?module'
import { login } from '../api/data.js'

const loginTemplate = (onLogin, errorMsg) => html`
    <section id="login">
        <article class="narrow">
            <header class="pad-med">
                <h1>Login</h1>
            </header>
            <form @submit=${onLogin} id="login-form" class="main-form pad-large">
                ${errorMsg ? html`<div class="error">${errorMsg}</div>` : ''}
                <label>E-mail: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <input class="action cta" type="submit" value="Sign In">
            </form>
            <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
            </footer>
        </article>
    </section>
`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(onLogin));

    async function onLogin(ev) {
        ev.preventDefault();
        try {
            const formData = new FormData(ev.target);
            let [email, password] = formData.values();

            if (!email.includes('.') || !email.includes('@')) {
                throw new Error('Error with email, must be valid email!');
            }
            if (password.length < 3) {
                throw new Error('Error too short password!');
            }
            await login({ email, password });
            ctx.page.redirect('/home');
            ctx.setUserNav();
            ev.target.reset();

        } catch (err) {
            ctx.render(loginTemplate(onLogin, err.message));
        }
    }
}