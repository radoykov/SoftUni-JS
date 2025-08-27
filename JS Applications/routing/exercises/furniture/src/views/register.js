import { html } from 'https://unpkg.com/lit-html?module';
import { register } from '../api/data.js';

const registerTemplate = (onRegister) => html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onRegister}>
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
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
    </div>
`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(onRegister));

    async function onRegister(ev) {
        ev.preventDefault();
        
        const formData = new FormData(ev.target);
        let [email, password, repass] = [...formData].map(el => el[1]);
        if (email.length == 0 || password.lenght == 0) {
            alert('Pass and email should not be empty!');
            return;
        }
        if (password != repass) {
            alert('Pass and repass should be the same!');
            return;
        }
        await register({ email, password, repass});
        ctx.page.redirect('/catalog');
        ctx.setUserNav();
        ev.target.reset();
    }
}