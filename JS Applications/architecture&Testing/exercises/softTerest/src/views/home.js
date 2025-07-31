
export function setupHome(section, nav) {
    section.querySelector('a').addEventListener('click', (ev) => {
        ev.preventDefault();
        nav.goTo('ideas')
    });
    return showHome;

    async function showHome() {

        return section;
    }
}