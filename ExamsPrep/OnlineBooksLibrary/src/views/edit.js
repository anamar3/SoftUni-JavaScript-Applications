import {html} from '../../node_modules/lit-html/lit-html.js';
import { getById, updateBook } from '../api/books.js';
import { createSubmtiHandler } from '../api/utils.js';

const editTemplate = (book,onSubmit) => html`
 <section id="edit-page" class="edit">
            <form @submit=${onSubmit} id="edit-form" action="#" method="">
                <fieldset>
                    <legend>Edit my Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" .value=${book.title}>
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description"
                                id="description"  .value=${book.description}></textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" .value=${book.imageUrl}>
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type" .value=${book.type}>
                                <option value="Fiction" selected>Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Save">
                </fieldset>
            </form>
        </section>
`
export async function editView(ctx){
const book = await getById(ctx.params.id);
ctx.render(editTemplate(book,createSubmtiHandler(ctx,onSubmit)));

async function onSubmit(ctx,data,e){
    e.preventDefault();
try {
    const missing =Object.entries(data).filter(([k,v])=> v.trim() =='');
    if(missing.length >0){
        throw new Error('Missing fields');
    }
    await updateBook(ctx.params.id,data);
    e.target.reset();
ctx.page.redirect(`/details/${ctx.params.id}`);
    
} catch (error) {
    alert(error.message);
}
}
}