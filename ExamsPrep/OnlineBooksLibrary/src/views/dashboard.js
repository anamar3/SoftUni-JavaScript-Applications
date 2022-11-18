import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../api/books.js';


const singleBookTemplate = (book) => html `
   <li class="otherBooks">
                    <h3>${book.title}</h3>
                    <p>Type: ${book.type}</p>
                    <p class="img"><img src=${book.imageUrl}></p>
                    <a class="button" href='/details/${book._id}'>Details</a>
                </li>
`

const dashboardTemplate = (books) => html `
<section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
            <!-- Display ul: with list-items for All books (If any) -->
           ${books.length > 0 ? html`<ul class="other-books-list">
             ${books.map(singleBookTemplate)}
             </ul> `: html `<p class="no-books">No books in database!</p>`} 
            <!-- Display paragraph: If there are no books in the database -->
           
        </section>
`

export async function dashboardView(ctx){
    const books = await getAll();
    ctx.render(dashboardTemplate(books));
}