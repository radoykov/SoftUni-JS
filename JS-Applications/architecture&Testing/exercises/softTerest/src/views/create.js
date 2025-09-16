import { postIdea } from '../api/data.js';

export function setupCreate(section, nav) {
    section.querySelector('form').addEventListener('submit', onCreate);
    return showCreate;

    function showCreate() {
        return section;
    }
    async function onCreate(ev) {
        ev.preventDefault();
        let [[_x, title], [_xx, description], [_xxx, img]] = new FormData(ev.target);
        if (title.length < 6) {
            alert('Few symbols for title, please add more.');
            return;
        }
        if (description.length < 10) {
            alert('Few symbols for description, please add more.');
            return;
        }
        if (img.length < 5) {
            alert('Few symbols for img, please add more.');
            return;
        }

        const data = await postIdea({ title, description, img });

        nav.goTo('ideas');

        ev.target.reset();
    }
}