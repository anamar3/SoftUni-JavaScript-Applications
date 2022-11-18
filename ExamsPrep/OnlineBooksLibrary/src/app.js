import page from '../node_modules/page/page.mjs'; 
import { logout } from './api/api.js';
import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';
import { createView } from './views/create.js';
import { dashboardView } from './views/dashboard.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { loginView } from './views/login.js';
import { myBooksPage } from './views/myBooks.js';
import { registerView } from './views/register.js';

page(addSession);
page(addRender);
page('/',dashboardView);
page('/login',loginView);
page('/register',registerView);
page('/create',createView);
page('/details/:id',detailsView);
page('/edit/:id',editView);
page('/logout',onLogout);
page('/mybooksPage',myBooksPage);



page.start();

async function onLogout(){
     logout();
    page.redirect('/');
}