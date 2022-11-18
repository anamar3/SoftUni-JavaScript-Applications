import {html, nothing} from '../../node_modules/lit-html/lit-html.js';
import { searchByName } from '../api/music.js';
import { getUserData } from '../api/utils.js';

const searchTemplate = (onSearch) => html`
 <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click=${onSearch} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>

            <!--Show after click Search button-->
          
        </section>

`
const oneAlbum = (album) => html `
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
const resultsTemplate = (albums,onSearch) => html `
<section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click=${onSearch} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>
            <div class="search-result">
${albums.length > 0 ? albums.map(resultTemplate):html `<p class="no-result">No result.</p>`};
            <!--Show after click Search button-->
            </div>
        </section>

`
const resultTemplate = (album) => html `
               ${ oneAlbum(album)}
             
`
export async function searchView(ctx){


ctx.render(searchTemplate(onSearch));

async function onSearch(e){
    const searchedName = document.getElementById('search-input');
const albums = await searchByName(searchedName.value);
console.log(albums);
    e.preventDefault();
const searchedPage = document.getElementById('searchPage');
ctx.render(resultsTemplate(albums),searchedPage);
}

}