function sumTable() {
    const rows = document.querySelectorAll("table tr");
    let sum = 0;
    for (let i = 1; i < rows.length - 1; i++) {
        sum += Number(rows[i].lastChild.textContent);
    }
    document.getElementById('sum').textContent = sum;
}