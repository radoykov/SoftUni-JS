import e from '../../../../funcCreateElement/funcCreateElement.js'
import { proFetch, addToMainSections } from './mainFunctions.js'
import { showHomePage } from './movies.js';

let main;
let editMovie;
let detailedMovie;
let currMovie;
let likesForMovie;
let usersLikeMovieArr;

export function setupDetails(mainForPaste, movie, edit) {
    main = mainForPaste;
    detailedMovie = movie;
    editMovie = edit;
}

export async function onDetails(ev) {
    ev.preventDefault();
    if (sessionStorage.getItem('authToken') == null) return;
    const parentWithOwner = ev.target.closest("[data-id]");

    const data = await proFetch(`http://localhost:3030/data/movies/${parentWithOwner.dataset.id}`);
    currMovie = data;
    likesForMovie = await proFetch(`http://localhost:3030/data/likes?where=movieId%3D%22${currMovie._id}%22&distinct=_ownerId&count`, 'get', {}, sessionStorage.getItem('authToken'));
    usersLikeMovieArr = await proFetch(`http://localhost:3030/data/likes?where=movieId%3D%22${currMovie._id}%22%20and%20_ownerId%3D%22${sessionStorage.getItem('userId')}%22`, 'get', {}, sessionStorage.getItem('authToken'));

    addToMainSections(detailedMovie.children[0], [createHTMLForMovieDetails(data, currMovie._ownerId)], []);
    addToMainSections(main, [detailedMovie]);
}

const createHTMLForMovieDetails = (movie) =>
    e("div", { className: "row bg-light text-dark" },
        e("h1", {}, movie.title),
        e("div", { className: "col-md-8" },
            e("img", {
                className: "img-thumbnail",
                src: movie.img,
                alt: "Movie"
            })
        ),
        e("div", { className: "col-md-4 text-center" },
            e("h3", { className: "my-3" }, "Movie Description"),
            e("p", {}, currMovie.description),
            ...[].concat(createActionButtons())
        )
    );

function createActionButtons() {
    if (currMovie._ownerId == sessionStorage.getItem('userId')) {
        return [
            e("a", { className: "btn btn-danger", href: "#", onClick: onDelete }, "Delete"),
            e("a", { className: "btn btn-warning", href: "#", onClick: onEdit }, "Edit"),
            e("span", { className: "enrolled-span", style: "text-decoration: none" }, `Liked ${likesForMovie}`)
        ];
    } else if (usersLikeMovieArr.length == 1) {
        return [
            e("span", { className: "enrolled-span", style: "text-decoration: none" }, `Liked ${likesForMovie}`)
        ];
    } else {
        return [
            e("a", { className: "btn btn-primary", href: "#", onClick: onLike }, "Like"),
            e("span", { className: "enrolled-span", style: "text-decoration: none" }, `Liked ${likesForMovie}`)
        ];
    }
}

function onEdit(ev) {
    ev.preventDefault();
    const form = editMovie.querySelector('form');
    addToMainSections(main, [form]);
    form.querySelector('[name="title"]').value = currMovie.title;
    form.querySelector('[name="description"]').value = currMovie.description;
    form.querySelector('[name="imageUrl"]').value = currMovie.img;

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const data = new FormData(ev.target);
        let [title, description, img] = data.values();

        await proFetch(`http://localhost:3030/data/movies/${currMovie._id}`, 'put', { title, description, img }, sessionStorage.getItem('authToken'));
        showHomePage();
    });

}
async function onLike(ev) {
    ev.preventDefault();

    ev.target.parentNode.lastChild.textContent = `Liked ${likesForMovie + 1}`;
    ev.target.remove();
    await proFetch(`http://localhost:3030/data/likes`, 'post', { movieId: currMovie._id }, sessionStorage.getItem('authToken'));

}

async function onDelete(ev) {
    await proFetch(`http://localhost:3030/data/movies/${currMovie._id}`, 'delete', {}, sessionStorage.getItem('authToken'));
    ev.preventDefault();
    ev.target.parentNode.parentNode.parentNode.remove();

    showHomePage();
}