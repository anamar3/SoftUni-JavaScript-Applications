import {html} from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/api.js';
import { createSubmtiHandler } from '../api/utils.js';

const registerTemplate = (onSubmit) => html `
 <section id="registerPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`

export function registerView(ctx){
    ctx.render(registerTemplate(createSubmtiHandler(ctx,onSubmit)))
}

async function onSubmit(ctx,data,e){
e.preventDefault();

try {
    if(data.email == '' || data.password == '' || data['conf-pass'] == ''){
        throw new Error('Missing fields!');
    } if( data.password != data['conf-pass']){
        throw new Error('Passwords DO NOT match!');
    }
    await register(data.email,data.password);
    e.target.reset();
    ctx.page.redirect('/');
} catch (error) {
    alert(error.message);
}

}