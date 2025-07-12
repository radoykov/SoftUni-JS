import e from '../../../funcCreateElement/funcCreateElement.js'

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
window.loadCommits = loadCommits;