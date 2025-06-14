function e(type, attributes = {}, ...content) {
    const result = document.createElement(type);

    for (let attr in attributes) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLowerCase(), attributes[attr]);
        } else {
            result[attr] = attributes[attr];
        }
    }

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}

function solve() {
    const button = document.querySelector(".form-control button");
    button.addEventListener('click', addButton);

    function addButton(ev) {
        ev.preventDefault();

        const inputs = document.querySelectorAll("input");
        const select = document.querySelector("select[name='lecture-module']");

        if (inputs[0].value == "" || inputs[1].value == "" || select.value == "Select module") {
            return;
        }

        const trainings = document.querySelector("div.modules");

        //check if the module already exist
        const element = [...trainings.children].filter(el => el.firstElementChild.innerHTML.includes(select.value.toUpperCase()));

        if (element.length > 0) {

            element[0].lastChild.appendChild(
                e('li', { className: 'flex' },
                    e('h4', { textContent: `${inputs[0].value} - ${inputs[1].value}` }),
                    e('button', { className: 'red', textContent: 'Del' })));
        } else {
            trainings.appendChild(e('div', { className: 'module' },
                e('h3', { textContent: `${select.value.toUpperCase()}-MODULE` }),
                e('ul', {},
                    e('li', { className: 'flex' },
                        e('h4', { textContent: `${inputs[0].value} - ${inputs[1].value}` }),
                        e('button', { className: 'red', textContent: 'Del' })))));
        }

        trainings.lastChild.lastChild.lastChild.lastChild.addEventListener('click', (ev) => {
            if (ev.target.parentNode.parentNode.children.length == 1) {
                ev.target.parentNode.parentNode.parentNode.remove();

            } else {
                ev.target.parentNode.remove();
            }
        });

        //make li in row of their time
        [...trainings.querySelectorAll("ul")].forEach(ul => {

            const sorted = [...ul.querySelectorAll("li")].sort((a, b) => a.innerHTML.localeCompare(b.innerHTML));
            sorted.forEach(li => ul.appendChild(li));
        });

    };

};