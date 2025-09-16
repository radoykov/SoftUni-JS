import { postRecipe } from '../api/data.js';

export function setupCreate(section, nav) {
    section.querySelector('form').addEventListener('submit', onCreate);
    return showCreate;

    function showCreate() {
       return section;
    }
    async function onCreate(ev) {
        ev.preventDefault();
        const obj = convertingFormData(new FormData(ev.target));

        const data = await postRecipe(obj);

        nav.goTo('details', data._id);
        
        ev.target.reset();
    }
}
export function convertingFormData(formData) {
    let [name, img, ingredients, preparation] = formData.values();
    const obj = {
        name: name,
        img: img,
        ingredients: ingredients.split('\n').map(l => l.trim()).filter(l => l != ''),
        steps: preparation.split('\n').map(l => l.trim()).filter(l => l != '')
    };
    return obj;
}