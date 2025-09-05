import { html } from '../utils.js'
import { login } from '../api/data.js'

const loginTemplate = (onLogin) => html`
    <!-- Login -->
    <section id="login-page" class="content auth">
        <h1>Login</h1>
        <form @submit=${onLogin} id="login" action="#" method="">
            <fieldset>
                <blockquote>Knowledge is like money: to be of value it must circulate, and in circulating it can
                    increase in quantity and, hopefully, in value</blockquote>
                <p class="field email">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com">
                </p>
                <p class="field password">
                    <label for="login-pass">Password:</label>
                    <input type="password" id="login-pass" name="password">
                </p>
                <p class="field submit">
                    <input class="btn submit" type="submit" value="Log in">
                </p>
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`;

export function loginPage(ctx, setUserNav) {
    ctx.render(loginTemplate(onLogin));

    async function onLogin(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        let [email, password] = formData.values();

        if (email == '') { alert('Email mustn\'t be empty!'); return; }
        if (password == '') { alert('Password mustn\'t be empty!'); return; }

        await login({email , password });

        setUserNav();
        ctx.page.redirect('/catalog');
        ev.target.reset();
    }
}