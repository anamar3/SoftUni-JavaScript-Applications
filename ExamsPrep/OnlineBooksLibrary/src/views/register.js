import {html} from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/api.js';
import { createSubmtiHandler } from '../api/utils.js';

const registerTemplate = (onSubmit) => html`
 <section id="register-page" class="register">
            <form @submit=${onSubmit} id="register-form" action="" method="">
                <fieldset>
                    <legend>Register Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <p class="field">
                        <label for="repeat-pass">Repeat Password</label>
                        <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Register">
                </fieldset>
            </form>
        </section>
`

export function registerView(ctx){
   ctx.render(registerTemplate(createSubmtiHandler(ctx,onSubmit)))
}

async function onSubmit(ctx,data,e){
try {
    if(data.password == '' || data['confirm-pass']== '' || data.email == ''){
        throw new Error('Missing fields!!');
    } if(data.password !== data['confirm-pass']){
        throw new Error('Passwords do NOT match!');
    }
    await register(data.email,data.password);
    e.target.reset();
    ctx.page.redirect('/');
} catch (error) {
    alert(error.message);
}

}