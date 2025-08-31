import { html } from 'https://unpkg.com/lit-html?module'
import { register } from '../api/data.js'

const registerTemplate = (onRegister, errorMsg) => html`
    <section id="register">
        <article class="narrow">
            <header class="pad-med">
                <h1>Register</h1>
            </header>
            <form @submit=${onRegister} id="register-form" class="main-form pad-large">
                ${errorMsg ? html`<div class="error">${errorMsg}</div>` : ''}
                <label>E-mail: <input type="text" name="email"></label>
                <label>Username: <input type="text" name="username"></label>
                <label>Password: <input type="password" name="password"></label>
                <label>Repeat: <input type="password" name="repass"></label>
                <input class="action cta" type="submit" value="Create Account">
            </form>
        </article>
    </section>
`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(onRegister));

    async function onRegister(ev) {
        ev.preventDefault();
        try {
            const formData = new FormData(ev.target);
            let [email, username, password, repass] = formData.values();

            if (!email.includes('.') || !email.includes('@')) {
                throw new Error('Error with email, must be valid email!');
            }
            if (username.length < 3) {
                throw new Error('Error too short username!');
            }
            if (password.length < 3) {
                throw new Error('Error too short password!');
            }
            if (password != repass) {
                throw new Error('Error password and repass must be the same!');
            }
            await register({ email, username, password });
            ctx.page.redirect('/myTeams');
            ctx.setUserNav();
            ev.target.reset();
        } catch (err) {
            ctx.render(registerTemplate(onRegister, err.message));
        }
    }
}