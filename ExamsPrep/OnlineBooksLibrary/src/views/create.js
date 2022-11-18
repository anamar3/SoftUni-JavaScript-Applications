import {html} from '../../node_modules/lit-html/lit-html.js';
import { createBook } from '../api/books.js';
import { createSubmtiHandler } from '../api/utils.js';

const createTemplate = (onSubmit) => html`
 <section id="create-page" class="create">
            <form @submit=${onSubmit} id="create-form" action="" method="">
                <fieldset>
                    <legend>Add new Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" placeholder="Title">
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description" id="description" placeholder="Description"></textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" placeholder="Image">
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type">
                                <option value="Fiction">Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Add Book">
                </fieldset>
            </form>
        </section>
`

export function createView(ctx){
    ctx.render(createTemplate(createSubmtiHandler(ctx,onSubmit)))
}

async function onSubmit(ctx,data,e){
try {
    const missing =Object.entries(data).filter(([k,v])=> v.trim() =='');
    if(missing.length >0){
        throw new Error('Missing fields');
    }
    await createBook(data);
    e.target.reset();
ctx.page.redirect('/');

} catch (error) {
    alert(error.message);
}
}