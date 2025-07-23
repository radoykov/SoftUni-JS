import { createCustomArticle } from './baseFunctions.js'
import { changeNavLocation, main} from './app.js'

let section;

export function setupCatalog( targetSection) {
    section = targetSection;
}

export async function showCatalog() {
    changeNavLocation('catalogLink');
    main.appendChild(section);

    try {
        const response = await fetch('http://localhost:3030/data/recipes');
        const data = await response.json();

        main.innerHTML = "";
        const fragment = document.createDocumentFragment();
        Object.values(data).forEach(oneData => {
            const article = createCustomArticle(false, oneData);
            fragment.appendChild(article);
        });
        main.appendChild(fragment);

    } catch (err) {
        console.log(err);
    }

}