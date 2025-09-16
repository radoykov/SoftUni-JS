import e from '../../../funcCreateElement/funcCreateElement.js'

window.addEventListener('DOMContentLoaded', () => {
    // window.location.replace('http://127.0.0.1:5500/singlePageApplications(SPA)/exercises/softForum');
    if (window.location.pathname.includes('index.html')) {
        showHomePage();
        let [cancelBtn, postBtn] = document.querySelectorAll('div.new-topic-buttons button');
        const form = document.querySelector('form');
        postBtn.addEventListener('click', (ev) => onSubmit(ev, form));
        cancelBtn.addEventListener('click', (ev) => onCancel(ev, form));
        [...document.querySelectorAll('a.normal')].forEach(e => e.addEventListener('click', onA));

    } else {
        showComments();
        document.querySelector('form').addEventListener('submit', async (ev) => {
            ev.preventDefault();
            const data = new FormData(ev.target);
            let [text, username] = data.values();
            await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text,
                    username,
                })
            });
            ev.target.reset();
            showComments();
        });
    }
});

function onA(ev) {
    sessionStorage.setItem('nameOfPublication', ev.target.textContent);
}

async function showComments() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
    if (response.ok == false) {
        alert('Error in post');
        return;
    }
    const data = await response.json();
    const myPost = Object.values(data).filter(el => el.title === sessionStorage.getItem('nameOfPublication'));
    document.querySelector('div.container').innerHTML = '';

    document.querySelector('div.container').appendChild(e('div', { className: 'topic-content' },
        e('div', { className: 'topic-title' },
            e('div', { className: 'topic-name-wrapper' },
                e('div', { className: 'topic-name' },
                    e('h2', {}, myPost[0].title),
                    e('p', {}, 'Date: ',
                        e('time', {}, '2020-10-10 12:08:28')
                    )
                ),
                e('div', { className: 'subscribers' },
                    e('p', {}, 'Subscribers: ',
                        e('span', {}, '')
                    )
                )
            )
        )));

    const response2 = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
    if (response2.ok == false) {
        alert('Error in post');
        return;
    }
    const data2 = await response2.json();
    Object.values(data2).forEach(el => {
        document.querySelector('div.container').appendChild(e('div', { className: 'comment' },
            e('header', { className: 'header' },
                e('p', {},
                    e('span', {}, el.username),
                    ' posted on ',
                    e('time', {}, '2020-10-10 14:28:11')
                )
            ),
            e('div', { className: el.text },
                e('div', { className: 'userdetails' },
                    e('img', { src: './static/profile.png', alt: 'avatar' })
                ),
                e('div', { className: 'post-content' },
                    e('p', {}, 'Lorem ipsum dolor sit amet consectetur')
                )
            ),
            e('div', { className: 'footer' },
                e('p', {}, e('span', {}, '3'), ' likes')
            )));
    });
}

async function showHomePage() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
    if (response.ok == false) {
        alert('Error in post');
        return;
    }
    const data = await response.json();
    //forEach create Element
    const place = document.querySelector('div.topic-title');
    [...place.querySelectorAll('#myPublication')].forEach(el => el.remove());
    Object.values(data).forEach(({ title, username, _ }) => {
        const now = new Date();

        const topicElement = e('div', { className: 'topic-container', id: 'myPublication' },
            e('div', { className: 'topic-name-wrapper' },
                e('div', { className: 'topic-name' },
                    e('a', { href: 'topic-content.html', className: 'normal', onClick: onA },
                        e('h2', {}, title)
                    ),
                    e('div', { className: 'columns' },
                        e('div', {},
                            e('p', {}, 'Date: ',
                                e('time', {}, now.toISOString())
                            ),
                            e('div', { className: 'nick-name' },
                                e('p', {}, 'Username: ',
                                    e('span', {}, username)
                                )
                            )
                        ),
                        e('div', { className: 'subscribers' },
                            e('p', {}, 'Subscribers: ',
                                e('span', {}, '0')
                            )
                        )
                    )
                )
            )
        );
        place.appendChild(topicElement);
    });
}

async function onSubmit(ev, form) {
    ev.preventDefault();
    const formData = new FormData(form);
    let [title, username, text] = formData.values();
    if (title == '' || username == '' || text == '') {
        alert('Error empty fields');
        return;
    }
    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            username,
            text
        })
    });
    if (response.ok == false) {
        alert('Error in post');
        return;
    }

    form.reset();
    showHomePage();
}
function onCancel(ev, form) {
    ev.preventDefault();
    form.reset();
}