import {html} from '../../node_modules/lit-html/lit-html.js';
import { getMyBooks } from '../api/books.js';

const singleBookTemplate = (book) => html`
<li class="otherBooks">
                    <h3>${book.title}</h3>
                    <p>Type: ${book.type}</p>
                    <p class="img"><img src=${book.imageUrl}></p>
                    <a class="button" href="/details/${book._id}">Details</a>
                </li>
`
const myBooksTemplate = (books) => html `
<section id="my-books-page" class="my-books">

${books.length > 0 ? html`   <h1>My Books</h1>
            <!-- Display ul: with list-items for every user's books (if any) -->
            <ul class="my-books-list">
              ${books.map(singleBookTemplate)}
                
            </ul> `:  html`<p class="no-books">No books in database!</p>`}
        

           
         
        </section>
`

export async function myBooksPage(ctx){
const userId = ctx.user.id;
const myBooks = await getMyBooks(userId);
ctx.render(myBooksTemplate(myBooks));
}