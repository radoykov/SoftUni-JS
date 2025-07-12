import e from '../../../funcCreateElement/funcCreateElement.js'

window.onload = async function () {
    await loadInfo();

    document.querySelectorAll("button").forEach(btn => btn.addEventListener('click', toggle));

}
async function loadInfo() {
    const section = document.querySelector("section");

    try {
        const response = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
        const data = await response.json();
        Object.values(data).forEach(el => {
            section.appendChild(addAccordion(el._id, el.title))
        });

    } catch (err) {
        console.log(err);
    }
}

function addAccordion(id, title) {
    const div =
        e('div', { className: "accordion" },
            e('div', { className: "head" },
                e('span', { textContent: title }),
                e('button', { className: "button", id: id, textContent: "More" })
            ),
            e('div', { className: "extra" },
                e('p')
            ));

    return div;
}

async function toggle(ev) {
    const response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${ev.target.id}`);
    const data = await response.json();

    const button = ev.target;
    let div = ev.target.parentNode.parentNode.children[1];
    div.children[0].textContent = data.content;

    if (div.style.display == 'none' || div.style.display == '') {
        div.style.display = 'block';
        button.textContent = 'Less'
    } else {
        div.style.display = 'none';
        button.textContent = 'More'
    }
}