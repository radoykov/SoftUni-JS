import { html } from '../utils.js'
import { register } from '../api/data.js'

const registerTemplate = (onRegister) => html`
<!-- Register -->
    <section id="register-page" class="content auth">
        <h1>Register</h1>
        <form @submit=${onRegister} id="register" action="#" method="">
            <fieldset>
                <blockquote>Knowledge is not simply another commodity. On the contrary. Knowledge is never used up.
                    It
                    increases by diffusion and grows by dispersion.</blockquote>
                <p class="field email">
                    <label for="register-email">Email:</label>
                    <input type="email" id="register-email" name="email" placeholder="maria@email.com">
                </p>
                <p class="field password">
                    <label for="register-pass">Password:</label>
                    <input type="password" name="password" id="register-pass">
                </p>
                <p class="field password">
                    <label for="register-rep-pass">Repeat password:</label>
                    <input type="password" name="rep-pass" id="register-rep-pass">
                </p>
                <p class="field submit">
                    <input class="btn submit" type="submit" value="Register">
                </p>
                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`;

export function registerPage(ctx, setUserNav) {
    ctx.render(registerTemplate(onRegister));

    async function onRegister(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        let [email, password, repass] = formData.values();

        if (email == '') { alert('Email mustn\'t be empty!'); return; }
        if (password == '') { alert('Password mustn\'t be empty!'); return; }
        if (repass == '') { alert('Repeat password mustn\'t be empty!'); return }
        if (password != repass) { alert('Passwords must be the same!'); return }

        await register({ email, password });

        setUserNav();
        ctx.page.redirect('/catalog');
        ev.target.reset();
    }
}