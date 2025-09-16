import e from '../../../funcCreateElement/funcCreateElement.js'

window.onload = function () {
    attachEvents();
}

function attachEvents() {
    document.querySelector("button#btnLoadPosts").addEventListener('click', async (ev) => {
        const response = await fetch('http://localhost:3030/jsonstore/blog/posts');
        const posts = await response.json();
        let select = document.querySelector('select');

        for (let key in posts) {
            select.appendChild(e('option', { value: key, textContent: posts[key].title }));
        }

        document.querySelector('button#btnViewPost').addEventListener('click', async (ev) => {
            const [post] = Object.values(posts).filter(post => post.id == select.value);

            const response = await fetch('http://localhost:3030/jsonstore/blog/comments');
            const comments = await response.json();

            document.querySelector('h1#post-title').textContent = post.title;
            document.querySelector('p').textContent = post.body;
            const ul = document.querySelector('ul');
            ul.innerHTML = "";

            Object.values(comments)
                .filter(comment => comment.postId == select.value)
                .forEach(comment => {
                    ul.appendChild(e('li', { id: comment.id, textContent: comment.text }));
                });
        });
    });
}