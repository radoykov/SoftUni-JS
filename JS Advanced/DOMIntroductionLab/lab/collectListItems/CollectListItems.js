function extractText() {
    const items = [...document.getElementsByTagName('li')];
    const result = document.getElementById('result');

    const text = items.map(el => el.textContent);

    result.value = text.join('\n');
}
