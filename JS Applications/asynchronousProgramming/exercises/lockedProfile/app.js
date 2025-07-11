function lockedProfile() {

    loadInfo();
    document.querySelector('main').addEventListener('click', onClick);

    function onClick(ev) {
        if (ev.target.tagName == 'BUTTON') {
            const isLocked = ev.target.parentNode.querySelector('input[type=radio]:checked').value === 'lock';
            const div = ev.target.parentNode.querySelector('div');

            if (ev.target.textContent == 'Show more') {
                if (isLocked == false) {
                    div.style.display = 'block';
                    ev.target.textContent = 'Hide it';
                }
                //else we can not show private information

            } else if (ev.target.textContent == 'Hide it') {
                if (isLocked == false) {
                    div.style.display = 'none';
                    ev.target.textContent = 'Show more';
                }
                //else it is locked after showing profile therefore we can not close it
            }
        }
    }
}

function loadInfo() {
    const main = document.querySelector('main');
    main.children[0].remove();

    fetch('http://localhost:3030/jsonstore/advanced/profiles')
        .then(response => response.json())
        .then(data => {
            Object.values(data).map(({_id, username, email, age}) => {
                const div = addProfile(username, email, age);
                main.appendChild(div);
            });

        })
        .catch(err => {
            console.log(err);
        });

};

function addProfile(username, email, age) {
    const div = e('div', { className: "profile" },
        e('img', { scr: "./iconProfile2.png", className: "userIcon" }),
        e('label', { textContent: "Lock" }),
        e('input', { type: "radio", name: "user1Locked", value: "lock", checked: true }),
        e('label', { textContent: "Unlock" }),
        e('input', { type: "radio", name: "user1Locked", value: "unlock" }),
        e('br'),
        e('hr'),
        e('label', { textContent: "Username" }),
        e('input', { type: "text", name: "user1Username", value: username, disabled: true, readOnly: true }),
        e('div', { id: "user1HiddenFields" },
            e('hr'),
            e('label', { textContent: "Email:" }),
            e('input', { type: "email", name: "user1Email", value: email, disabled: true, readOnly: true }),
            e('label', {textContent : "Age"}),
            e('input', {type : "email", name : "user1Age", value: age, disabled: true, readOnly: true })),
            e('button', {textContent : "Show more"})
        );

    return div;
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