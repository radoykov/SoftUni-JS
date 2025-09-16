import e from '../../../funcCreateElement/funcCreateElement.js'

async function loadStudents() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/students');
    const students = await response.json();
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    Object.values(students).forEach(({ firstName, lastName, facultyNumber, grade, _id }) => {
        tbody.appendChild(e('tr', {},
            e('th', { textContent: firstName }),
            e('th', { textContent: lastName }),
            e('th', { textContent: facultyNumber }),
            e('th', { textContent: grade })));
    });
}

async function functionalityForAddNewStudentLoad(ev, formElement) {
    ev.preventDefault();
    const form = new FormData(formElement);
    let [firstName, lastName, facultyNumber, grade] = [...form.values()];
    const obj = {
        firstName,
        lastName,
        facultyNumber,
        grade
    };
    if (Object.values(obj).some(val => val === '')) {
        console.log('Entry must be non-empty');
        return;
    }

    const response = await fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(obj)
    });
    if (response.ok == false) {
        alert('Error');
    }
    formElement.reset();

    loadStudents();
}

window.addEventListener('load', () => {
    loadStudents();
    const form = document.querySelector('form');
    form.addEventListener('submit', (ev) => functionalityForAddNewStudentLoad(ev, form));
});