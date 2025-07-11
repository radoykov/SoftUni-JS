async function loadCommits() {

    let username = document.querySelector('input#username').value;
    let repo = document.querySelector('input#repo').value;
    try {
        let url = `https://api.github.com/repos/${username}/${repo}/commits`;

        let response = await fetch(url);
        if (response.status != 200) {
            console.log(`status : ${response.status}`);
        }
        let data = await response.json();
        let ul = document.querySelector("ul#commits");
        ul.innerHTML = "";
        data.forEach(c => {
            ul.appendChild(e('li', { id: "commits", textContent: `${c.commit.author.name} : ${c.commit.message}` }));
        });
    } catch (err) {
        console.log("My error!");
        console.log(`Error: ${err.status} (Not Found)`);
    }
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