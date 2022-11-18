import {html} from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/api.js';
import { createSubmtiHandler } from '../api/utils.js';

const loginTemplate =(onSubmit) => html `
 <section id="loginPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Login</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <button type="submit" class="login">Login</button>

                    <p class="field">
                        <span>If you don't have profile click <a href="#">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`

export function loginView(ctx){
   ctx.render(loginTemplate(createSubmtiHandler(ctx,onSubmit)));

  
}
async function onSubmit(ctx,data,e){
    e.preventDefault();
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