function deleteByEmail() {
    const input = document.getElementsByName("email")[0].value;
    const result = document.getElementById('result');

    let parts = document.querySelectorAll('#customers tr td:nth-child(2)')

    for (let part of parts) {
        if (part.textContent === input) {
            part.parentElement.remove();
            result.textContent = "Deleted.";
            return;
        }
    }
    result.textContent = "Not found.";
}