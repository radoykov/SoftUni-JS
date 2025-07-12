import e from '../../funcCreateElement/funcCreateElement.js';

window.onload = function () {
    solve();
};

function solve() {

    let mainBtn = document.querySelector("button.btn.create");
    mainBtn.addEventListener('click', (ev) => {
        ev.preventDefault();

        let [author, title, category] = [...document.querySelectorAll("input")].map(e => e.value);
        let content = document.querySelector("textarea").value;

        let section = document.querySelector("main section");

        let article = e('article', {},
            e('h1', { textContent: title }),
            e('p', { textContent: "Category:" }, e('strong', { textContent: category })),
            e('p', { textContent: "Creator:" }, e('strong', { textContent: author })),
            e('p', { textContent: content }),
            e('div', { className: "buttons" },
                e('button', { className: "btn delete", textContent: "Delete" }),
                e('button', { className: "btn archive", textContent: "Archive" }))
        );
        section.appendChild(article);

        [...document.querySelectorAll("input")].map(e => e.value = "");
        document.querySelector("textarea").value = "";

        let [deleteBtn, archiveBtn] = article.querySelectorAll("button");

        deleteBtn.addEventListener('click', (ev) => {
            ev.target.parentNode.parentNode.remove();
        });

        archiveBtn.addEventListener('click', (ev) => {
            ev.target.parentNode.parentNode.remove();
            let ol = document.querySelector("ol");
            ol.appendChild(e('li', { textContent: title }));
            const arrSort = [...ol.children].sort((a, b) => a.textContent.localeCompare(b.textContent));
            arrSort.forEach(e => ol.appendChild(e));
        });
    });
}

