import e from '../../../funcCreateElement/funcCreateElement.js'

function getInfo() {
    let value = document.querySelector("input#stopId").value;
    let div = document.querySelector('div#stopName');
    let ul = document.querySelector('ul');

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${value}`)
        .then(response => response.json())
        .then(data => {
            div.textContent = data.name;


            for (let bus in data.buses) {
                ul.appendChild(e('li', { textContent: `Bus ${bus} arrives in ${data.buses[bus]} minutes.` }));
            }
        })
        .catch(err => {
            div.textContent = 'Error';
            Array.from(ul.children).forEach(child => child.remove());
        });
}
window.getInfo = getInfo;