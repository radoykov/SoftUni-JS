import e from '../../../../../funcCreateElement/funcCreateElement.js'
import { getItemFromLocalStorage, getIdeaById, deleteIdea } from '../api/data.js';

export function setupDetails(section, nav) {
    return showDetails;

    async function showDetails(id) {
        if (getItemFromLocalStorage('authToken') == null) {
            alert('You have first to log in app.')
            return;
        }

        const details = await getIdeaById(id);

        section.innerHTML = '';
        section.appendChild(createHTMLIdeaExtended(details));

        return section;
    }
    function createHTMLIdeaExtended(idea) {
        const children = [];

        if (idea._ownerId == getItemFromLocalStorage('userId')) {
            children.push(
                e("a", {
                    className: "btn detb",
                    href: "#",
                    onClick: (ev) => {
                        ev.preventDefault();
                        onDelete(ev, idea._id);
                    }
                }, "Delete")
            );
        }
        return e("div", {},

            e("img", {
                className: "det-img",
                src: idea.img
            }),

            e("div", { className: "desc" },
                e("h2", { className: "display-5" }, idea.title),
                e("p", { className: "infoType" }, "Description:"),
                e("p", { className: "idea-description" }, idea.description)
            ),
            e("div", { className: "text-center" }, ...children)
        );
    }
    async function onDelete(ev, _id) {
        ev.preventDefault();
        await deleteIdea(_id);
        nav.goTo('ideas');

    }
}