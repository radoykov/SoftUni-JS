import { html } from '../utils.js'
import { register } from '../api/data.js'

const registerTemplate = (onRegister) => html`
 <!-- Register Page -->
    <section id="register">
        <div class="container">
            <form @submit=${onRegister} id="register-form">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>
                <p>Username</p>
                <input type="text" placeholder="Enter Username" name="username" required>
                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" required>
                <p>Repeat Password</p>
                <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                <hr>
                <input type="submit" class="registerbtn" value="Register">
            </form>
            <div class="signin">
                <p>Already have an account?
                    <a href="/login">Sign in</a>.
                </p>
            </div>
        </div>
    </section>
`;

export function registerPage(ctx, setUserNav) {
    ctx.render(registerTemplate(onRegister));

    async function onRegister(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        let [username, password, repass] = formData.values();

        if (username == '') { alert('Username mustn\'t be empty!'); return; }
        if (password == '') { alert('Password mustn\'t be empty!'); return; }
        if (repass == '') { alert('Repeat password mustn\'t be empty!'); return }
        if (password != repass) { alert('Passwords must be the same!'); return }

        await register({ username, password });

        setUserNav();
        ctx.page.redirect('/all-listings');
        ev.target.reset();
    }
}