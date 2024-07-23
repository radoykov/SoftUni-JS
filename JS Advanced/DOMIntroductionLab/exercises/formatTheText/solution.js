function solve() {
    const input = document.getElementById('input').value;

    const arr = input.split('.').filter((p) => p.length > 0);


    let i = 0;
    let str = '';

    for (let part of arr) {
        if (i == 3) {
            document.getElementById('output').innerHTML += `<p>${str}</p>`;
            i = 1;
            str ='';
        }
        str += part;
        str += '. ';
        i++;
    }
    document.getElementById('output').innerHTML += `<p>${str}</p>`;
}