import {html} from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/api.js';
import { createSubmtiHandler } from '../api/utils.js';

const loginTemplate = (onSubmit) => html`
  <section id="login-page" class="login">
            <form @submit=${onSubmit} id="login-form" action="" method="">
                <fieldset>
                    <legend>Login Form</legend>
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
                    <input class="button submit" type="submit" value="Login">
                </fieldset>
            </form>
        </section>
`

export function loginView(ctx){
    ctx.render(loginTemplate(createSubmtiHandler(ctx,onSubmit)));

   
}

async function onSubmit(ctx,data,e){
    try {
        if(data.email == '' || data.password == ''){
            throw new Error('Missing fields!');
        }
        await login(data.email,data.password);
        e.target.reset();
        ctx.page.redirect('/');
    } catch (error) {
        alert(error.message);
    }
   

}