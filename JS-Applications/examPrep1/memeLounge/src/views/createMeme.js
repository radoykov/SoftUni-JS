import { html } from '../utils.js'
import { createMeme } from '../api/data.js'
import { notify } from '../notification.js';

const createMemeTemplate = (onCreate) => html`
<!-- Create Meme Page ( Only for logged users ) -->
    <section id="create-meme">
        <form @submit=${onCreate} id="create-form">
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>
`;

export function createMemePage(ctx) {
    ctx.render(createMemeTemplate(onCreate));
    async function onCreate(ev) {
        ev.preventDefault();
        try {
            let formData = new FormData(ev.target);
            let [title, description, imageUrl] = formData.values();
            if(title == '') throw new Error('Title mustn\'t be empty!');
            if(description == '') throw new Error('Description mustn\'t be empty!');
            if(imageUrl == '') throw new Error('ImgUrl mustn\'t be empty!');

            await createMeme({title, description, imageUrl});

            ctx.page.redirect('/all-memes');
            ev.target.reset();

        } catch (err) {
            notify(err.message);
        }
    }
}