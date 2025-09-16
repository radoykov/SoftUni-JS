import { changeNavLocation, main } from './app.js'
import { createCustomArticle } from './baseFunctions.js'

let section;

export function setupCreate(sectionForLoign) {
    section = sectionForLoign;
    section.querySelector('form').addEventListener('submit', onCreate);
}
async function onCreate(ev) {
    ev.preventDefault();
    const obj = convertingFormData(new FormData(ev.target));
    
    const token = sessionStorage.getItem('authToken');
    if (token == null) {
        alert('Error token is null in create!');
        return;
    }

    const response = await fetch('http://localhost:3030/data/recipes', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(obj)
    }
    );
    if (response.ok == false) {
        alert('Error server not responded!');
        return;
    }
    main.innerHTML = '';
    const data = await response.json();
    obj['_ownerId'] = data._ownerId;
    obj['_id'] = data._id;
    main.appendChild(createCustomArticle(true, obj));

    ev.target.reset();
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

export function showCreate() {
    changeNavLocation('createLink');
    main.innerHTML = '';
    main.appendChild(section);
}