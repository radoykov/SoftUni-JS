function attachEvents() {
    document.querySelector('input#submit').addEventListener('click', async (event) => {
        let nameInput = document.querySelector('input[name="author"]');
        let textInput = document.querySelector('input[name="content"]');
        sendMessage({
            author: nameInput.value,
            content: textInput.value,
        });
        nameInput.value = '';
        textInput.value = '';

    });

    document.querySelector('input#refresh').addEventListener('click', getMessages);
    getMessages();
}

async function sendMessage(message) {
    const response = await fetch('http://localhost:3030/jsonstore/messenger', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(message),
    });

    if (response.ok == false) {
        console.log('Error with post.');
    }
}

async function getMessages() {
    const response = await fetch('http://localhost:3030/jsonstore/messenger');
    const data = await response.json();
    const textArea = document.querySelector("textarea");
    textArea.value = Object.values(data)
        .map(({ author, content }) => `${author}: ${content}`)
        .join("\n");
}

attachEvents();