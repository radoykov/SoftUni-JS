import e from '../../../../../funcCreateElement/funcCreateElement.js'
import { getIdeas } from '../api/data.js'

export function setupIdeas(section, nav) {
    return showIdeas;

    async function showIdeas() {

        const ideas = await getIdeas();
        const fragment = document.createDocumentFragment();
        Object.values(ideas).forEach(idea => fragment.appendChild(createHTMLIdea(idea)));
        if (Object.keys(ideas).length == 0) {
            fragment.appendChild(e('h1', {}, 'No ideas yet! Be the first one :)'));
        }

        section.innerHTML = '';
        section.appendChild(fragment);

        return section;
    }

    function createHTMLIdea(idea) {
        return e("div", {
            className: "card overflow-hidden current-card details",
            style: "width: 20rem; height: 18rem;"
        },
            e("div", { className: "card-body" },
                e("p", { className: "card-text" }, idea.title)
            ),
            e("img", {
                className: "card-image",
                src: idea.img,
                alt: "Card image cap"
            }),
            e("a", {
                className: "btn", href: "#", onClick: (ev) => {
                    ev.preventDefault();
                    nav.goTo('details', idea._id)
                }
            }, "Details")
        );
    }
}