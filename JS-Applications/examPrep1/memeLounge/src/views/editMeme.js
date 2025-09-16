import { html } from '../utils.js'
import { getMemeById, editMeme} from '../api/data.js'
import { notify } from '../notification.js';

const editMemeTemplate = (meme, onEdit) => html`
<!-- Edit Meme Page ( Only for logged user and creator to this meme )-->
    <section id="edit-meme">
        <form @submit=${onEdit} id="edit-form">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="titleEdit" type="text" placeholder="Enter Title" name="title" value=${meme.title}>
                <label for="description">Description</label>
                <textarea id="descriptionEdit" placeholder="Enter Description" name="description">
                        ${meme.description}
                    </textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrlEdit" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value=${meme.imageUrl}>
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>
`;

export async function editMemePage(ctx) {
    const meme = await getMemeById(ctx.params.id);
    ctx.render(editMemeTemplate(meme, onEdit));

    async function onEdit(ev) {
        ev.preventDefault();
        try {
            let formData = new FormData(ev.target);
            let [title, description, imageUrl] = formData.values();
            if (title == '') throw new Error('Title mustn\'t be empty!');
            if (description == '') throw new Error('Description mustn\'t be empty!');
            if (imageUrl == '') throw new Error('ImgUrl mustn\'t be empty!');

            await editMeme({ title, description, imageUrl }, ctx.params.id);

            ctx.page.redirect(`/details/${ctx.params.id}`);
            ev.target.reset();

        } catch (err) {
            notify(err.message);
        }
    }

}