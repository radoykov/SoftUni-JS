import e from '../../../../funcCreateElement/funcCreateElement.js'
import { proFetch, addToMainSections, setUserNav} from './mainFunctions.js'
import { setupDetails, onDetails } from './movieDetails.js'

let main;
let sections;
let moviesHTML;
let hiddenSection;

export function setupShowPage(mainForPaste, sectionHidden) {
    main = mainForPaste;
    sections = [sectionHidden.querySelector('#nav'), sectionHidden.querySelector('#home-page'), sectionHidden.querySelector('#footer')];
    moviesHTML = [sectionHidden.querySelector('#h1AddMovie'), sectionHidden.querySelector('#add-movie-button'), sectionHidden.querySelector('#movie div div div')];
    hiddenSection = sectionHidden;
    setupDetails(main, sectionHidden.querySelector('#movie-example'), sectionHidden.querySelector('#edit-movie'));
}

export async function showHomePage() {
    setUserNav(main, hiddenSection);
    main.innerHTML = '';
    moviesHTML[2].innerHTML = '';
    sections.forEach(el => main.appendChild(el));

    const movies = await proFetch('http://localhost:3030/data/movies');
    movies.forEach(movie => {
        let newMovieHTML = createHTMLForMovie(movie);
        newMovieHTML.dataset.id = movie._id;
        moviesHTML[2].appendChild(newMovieHTML);
    });

    if (sessionStorage.getItem('authToken')) {
        moviesHTML[1].addEventListener('click', onAddMovie);
        addToMainSections(main, moviesHTML);
    } else {
        addToMainSections(main, [moviesHTML[0], moviesHTML[2]]);
    }
}
function onAddMovie(ev) {
    ev.preventDefault();
    const form = hiddenSection.querySelector('#add-movie');
    addToMainSections(main, [form]);

    form.addEventListener('submit', (ev) => {
        const data = new FormData(ev.target);
        let [title, description, img] = data.values();

        proFetch('http://localhost:3030/data/movies', 'post', { title, description, img }, sessionStorage.getItem('authToken'));

    });
}

const createHTMLForMovie = (movie) =>
    e("div", { className: "card mb-4" },
        e("img", {
            className: "card-img-top",
            src: movie.img,
            alt: "Card image cap",
            width: 400
        }),
        e("div", { className: "card-body" },
            e("h4", { className: "card-title" }, movie.title)
        ),
        e("div", { className: "card-footer" },
            e("a", { href: "#/details/6lOxMFSMkML09wux6sAF" },
                e("button", { type: "button", className: "btn btn-info", onClick: onDetails }, "Details")
            )
        )
    );