import { html } from '../utils.js'
import { register } from '../api/data.js'
import { notify } from '../notification.js';

const registerTemplate = (onRegister) => html`
<!-- Register Page ( Only for guest users ) -->
 <section id="register">
        <form @submit=${onRegister} id="register-form">
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="emailRegister" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="passwordRegister" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="/login">Sign in</a>.</p>
                </div>
            </div>
        </form>
</section>
`;

export function registerPage(ctx, setUserNav) {
    ctx.render(registerTemplate(onRegister));

    async function onRegister(ev) {
        ev.preventDefault();
        try {
            const formData = new FormData(ev.target);
            let [username, email, password, repass, gender] = formData.values();

            if (username == '') throw new Error('Username mustn\'t be empty!');
            if (email == '') throw new Error('Email mustn\'t be empty!');
            if (password == '') throw new Error('Password mustn\'t be empty!');
            if (repass == '') throw new Error('Repeat password mustn\'t be empty!');
            if (gender == '') throw new Error('Gender mustn\'t be empty!');

            await register({ username, email, password, gender });

            setUserNav();
            ctx.page.redirect('/all-memes');
            ev.target.reset();

        } catch (err) {
            notify(err.message);
        }
    }
}