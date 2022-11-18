import {html, nothing} from '../../node_modules/lit-html/lit-html.js';
import { deleteAlbum, getById } from '../api/music.js';

const detailsTemplate = (album,user,onDelete) => html `
 <section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src=${album.imgUrl}>
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${album.name}</h1>
                        <h3>Artist: ${album.artist}</h3>
                        <h4>Genre: ${album.genre}</h4>
                        <h4>Price: $${album.price}</h4>
                        <h4>Date: ${album.releaseDate}</h4>
                        <p>Description: ${album.description}</p>
                    </div>

                    <!-- Only for registered user and creator of the album-->
                    ${user.id == album._ownerId ? html ` <div class="actionBtn">
                        <a href="/edit/${album._id}" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                    </div>`: nothing} 
                   
                </div>
            </div>
        </section>
`

export async function detailsView(ctx){
const album = await getById(ctx.params.id);
const user = ctx.user;
ctx.render(detailsTemplate(album,user,onDelete));

async function onDelete(e){
    e.preventDefault();
    const choice = confirm('Are you sure you want to delete this album?');
    if(choice){
await deleteAlbum(ctx.params.id);
ctx.page.redirect('/catalog');
}

}
}