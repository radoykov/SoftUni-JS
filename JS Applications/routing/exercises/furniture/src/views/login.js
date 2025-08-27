import { html } from 'https://unpkg.com/lit-html?module';
import { login } from '../api/data.js'

const loginTemplate = (onLogin) => html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onLogin}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
    </div>
`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(onLogin));

    async function onLogin(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        let [email, password] = [...formData].map(el => el[1]);

        if (email.length == 0 || password.length == 0) {
            alert('Pass and email should not be empty!');
        }
        await login({ email, password });
        ctx.page.redirect('/catalog');
        ctx.setUserNav();
        ev.target.reset();
    }
}