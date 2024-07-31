function create(words) {
    content = document.getElementById('content');

    words.forEach(value => {
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = value;
        p.style.display = 'none';
        div.appendChild(p);
        content.appendChild(div);
    });

    content.addEventListener('click', (ev) => {
        if (ev.target.tagName == 'DIV' || ev.target.tagName == 'P') {
            const p = ev.target.children[0] || ev.target;
            const isVisible = p.style.display == 'block';
            p.style.display = isVisible ? 'none' : 'block';
        }
    });
}