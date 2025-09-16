import { html } from '../dom.js';
import { register } from '../api/data.js'

const registerTemplate = () => html`
    <section id="register">
        <article>
            <h2>Register</h2>
            <form id="registerForm">
                <label>E-mail: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <label>Repeat: <input type="password" name="rePass"></label>
                <input type="submit" value="Register">
            </form>
        </article>
    </section>
`;

export function setupRegister() {
    return showRegister;

    function showRegister() {
        return registerTemplate();
    }

}
export async function onRegister(data, onSuccess) {
    if (data.password != data.rePass) {
        return alert('Passwords don\'t match');
    }

    await register({ email: data.email, password: data.password });
    onSuccess();
}