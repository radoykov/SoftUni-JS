function createRecipe() {
    document.querySelector('form').addEventListener('submit', onCreate);
}
async function onCreate(ev) {
    ev.preventDefault();
    const dataFromForm = new FormData(ev.target);
    let [name, img, ingredients, preparation] = dataFromForm.values();
    const obj = {
        name: name,
        img: img,
        ingredients: ingredients.split('\n').map(l => l.trim()).filter(l => l != ''),
        steps: preparation.split('\n').map(l => l.trim()).filter(l => l != '')
    };
    const token = sessionStorage.getItem('authToken');
    if (token == null) {
        alert('Error token is null in create!');
        return;
    }

    const response = await fetch('http://localhost:3030/data/recipes', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(obj)
    }
    );
    if (response.ok == false) {
        alert('Error server not responded!');
    }
    window.location.replace('http://127.0.0.1:5500/cookBookApp/lesson-03/base/index.html');

    form.reset();
}
createRecipe();