function generateReport() {
    let textarea = document.getElementById('output');
    let header = document.querySelectorAll('table thead tr th input');
    let bodyRows = document.querySelectorAll('table tbody tr');

    const result = [];
    for (let rows of bodyRows) {
        let obj = {};
        for (let i = 0; i< header.length; i++) {
            if (header[i].checked == true) {
                obj[header[i].parentElement.textContent] = rows.children[i].textContent;
            }
        }
        result.push(obj);
    }
    textarea.value = JSON.stringify(result);
}