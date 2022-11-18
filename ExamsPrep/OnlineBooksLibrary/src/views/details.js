import {html, nothing} from '../../node_modules/lit-html/lit-html.js';
import { deleteBook, getAllLikes, getById, getLikeFromUser, likeABook } from '../api/books.js';
import { getUserData } from '../api/utils.js';

const detailsTemplate = (book,user,onDelete,onLike,likes) => html`
  <section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src=${book.imageUrl}></p>
              
            </div>
                <div class="actions">
                    <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                    ${book.isOwner ? html `<a class="button" href='/edit/${book._id}' >Edit</a>
                    <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`: nothing}
                 
                    ${!book.isOwner && user  ? html`<a  @click=${onLike} id="btnLikes" class="button" href="javascript:void(0)"  >Like</a>`: nothing}

                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${likes}</span>
                    </div>
               </div>
                    <!-- Bonus -->
                    <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                    <!--  -->

                    <!-- ( for Guests and Users )  -->
                   
                    <!-- Bonus -->
                
                    <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
                </div>

        
        </section>
`

export async function detailsView(ctx){
    const book = await getById(ctx.params.id);
    let newLikes = await getAllLikes(ctx.params.id);
    let likesFromUser =0;
    if(ctx.user !=null){
  if(book._ownerId == ctx.user.id){
    book.isOwner = true;
  }  likesFromUser = await getLikeFromUser(ctx.params.id,ctx.user.id);
}else{
    book.isOwner = false;
  }

  let liked = `${likesFromUser == 1 ? 'none' : 'block'}`;

console.log(liked);
  ctx.render(detailsTemplate(book,ctx.user,onDelete,onLike,newLikes));
let button = document.getElementById('btnLikes');
button.style.display = liked;
console.log(button);
  async function onDelete(e){
    e.preventDefault();
    const choice = confirm('Are you sure you want to delete this game?');
if(choice){
    await deleteBook(ctx.params.id);
    ctx.page.redirect('/');
}
}

async function onLike(e){
    e.preventDefault();
    await likeABook(ctx.params.id);
    let likes = document.getElementById('total-likes');
    let neww = await getAllLikes(ctx.params.id);
    likes.textContent = `Likes: ${neww}`;
e.target.style.display = 'none';
}
}

