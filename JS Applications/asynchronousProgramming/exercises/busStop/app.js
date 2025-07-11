function getInfo() {
    let value = document.querySelector("input#stopId").value;
    let div = document.querySelector('div#stopName');
    let ul = document.querySelector('ul');

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${value}`)
        .then(response => response.json())
        .then(data => {
            div.textContent = data.name;


            for (bus in data.buses) {
                ul.appendChild(e('li', { textContent: `Bus ${bus} arrives in ${data.buses[bus]} minutes.` }));
            }
        })
        .catch(err => {
            div.textContent = 'Error';
            Array.from(ul.children).forEach(child => child.remove());
        });
}

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