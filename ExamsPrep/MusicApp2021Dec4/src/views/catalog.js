import {html, nothing} from '../../node_modules/lit-html/lit-html.js';
import { getAllAlbums } from '../api/music.js';
import { getUserData } from '../api/utils.js';

const singleAlbumTemplate = (album,user) => html `
  <div class="card-box">
                <img src=${album.imgUrl}>
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${album.name}</p>
                        <p class="artist">Artist: ${album.artist}</p>
                        <p class="genre">Genre: ${album.genre}</p>
                        <p class="price">Price: $${album.price}</p>
                        <p class="date">Release Date: ${album.releaseDate}</p>
                    </div>
                    ${getUserData() != null ? html` <div class="btn-group">
                        <a href="/details/${album._id}" id="details">Details</a>
                    </div>` : nothing}
                   
                </div>
            </div>
`

const catalogTemplate = (albums,user) => html`
 <section id="catalogPage">
            <h1>All Albums</h1>
${albums.length >0 ? albums.map(singleAlbumTemplate) : html `<p>No Albums in Catalog!</p>`}
          

        
            <!--No albums in catalog-->
          

        </section>
`

export async function catalogView(ctx){
    const albums = await getAllAlbums();
    const user = getUserData();
    console.log(user);
    ctx.render(catalogTemplate(albums,user));
}