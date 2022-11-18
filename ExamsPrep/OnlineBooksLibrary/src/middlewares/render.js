import {render} from '../../node_modules/lit-html/lit-html.js';
import {html} from '../../node_modules/lit-html/lit-html.js';

const root = document.getElementById('site-content');

const navTemplate = (user) => html `
 <nav class="navbar">
                <section class="navbar-dashboard">
                    <a href="/">Dashboard</a>
            ${user ? html `<div id="user">
                        <span>Welcome, ${user.email}</span>
                        <a class="button" href="/mybooksPage">My Books</a>
                        <a class="button" href="/create">Add Book</a>
                        <a class="button" href="/logout">Logout</a>
                    </div>` : html `<div id="guest">
                        <a class="button" href="/login">Login</a>
                        <a class="button" href="/register">Register</a>
                    </div> `}
                  
                </section>
            </nav>
`

const header = document.getElementById('site-header');

function ctxRender(content){
    render(content,root);
}

export function addRender(ctx,next){
   
render(navTemplate(ctx.user),header);
ctx.render = ctxRender;
    next();
}