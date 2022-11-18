import {render} from '../../node_modules/lit-html/lit-html.js';
import {html} from '../../node_modules/lit-html/lit-html.js';

const root = document.getElementById('main-content');

const navTemplate = (user) => html `
 <nav>
                <img src="./images/headphones.png">
                <a href="/">Home</a>
                <ul>
                    <!--All user-->
                    <li><a href="/catalog">Catalog</a></li>
                    <li><a href="/search">Search</a></li>
                    <!--Only guest-->
                   ${user? html ` <li><a href="/create">Create Album</a></li>
                    <li><a href="/logout">Logout</a></li>` :
                html `<li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>` }
                   
                    <!--Only user-->
                    
                </ul>
            </nav>
`


const header = document.getElementsByTagName('header')[0];

function ctxRender(content){
    render(content,root);
}

export function addRender(ctx,next){
   
render(navTemplate(ctx.user),header);
ctx.render = ctxRender;
    next();
}