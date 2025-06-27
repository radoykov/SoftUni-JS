import e from '../../funcCreateElement/funcCreateElement.js';

export function solution() {
    document.querySelector("button").addEventListener('click', (ev) => {
        let input = ev.target.parentNode.firstElementChild;
        if (input.value.length == 0) return;

        const ulGifts = document.querySelectorAll("section.card")[1].children[1];

        const li = e('li', { className: 'gift', textContent: input.value },
            e('button', { id: 'sendButton', textContent: 'Send' }),
            e('button', { id: 'discardButton', textContent: 'Discard' }));

        li.children[0].addEventListener('click', (ev) => {
            let li = ev.target.parentNode;
            const ulSend = document.querySelectorAll("section.card")[2].children[1];
            ulSend.appendChild(e('li', { className: 'gift', textContent: li.textContent.slice(0, li.textContent.indexOf("SendDiscard"))}));
            li.remove();
        });
        li.children[1].addEventListener('click', (ev) => {
            let li = ev.target.parentNode;
            const ulDiscard = document.querySelectorAll("section.card")[3].children[1];
            ulDiscard.appendChild(e('li', { className: 'gift', textContent: li.textContent.slice(0, li.textContent.indexOf("SendDiscard"))}));
            li.remove();
        });

        ulGifts.appendChild(li);
        input.value = '';

        const sorted = [...ulGifts.children].sort((a, b) => a.textContent.localeCompare(b.textContent));
        sorted.forEach(el => ulGifts.appendChild(el));
    });
}