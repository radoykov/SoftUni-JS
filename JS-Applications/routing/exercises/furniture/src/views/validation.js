export function validation() {
    let [make, model, year, description, price, image, material] = [...document.querySelectorAll('input')];
    let flag = true;

    make.value.length < 4 ? makeInvalid(make) : makeValid(make);
    model.value.length < 4 ? makeInvalid(model) : makeValid(model);
    Number(year.value) > 1950 && Number(year.value) < 2050 ? makeValid(year) : makeInvalid(year);
    description.value.length > 10 ? makeValid(description) : makeInvalid(description);
    Number(price.value) > 0 ? makeValid(price) : makeInvalid(price);
    image.value == '' ? makeInvalid(image) : makeValid(image);
    makeValid(material);


    function makeValid(item) {
        item.classList.add('is-valid');
        item.classList.remove('is-invalid');
    }
    function makeInvalid(item) {
        flag = false;
        item.classList.add('is-invalid');
        item.classList.remove('is-valid');
    }
    return {
        flag: flag,
        obj: { make: make.value, model: model.value, year: Number(year.value), description: description.value, price: Number(price.value), img: image.value, material: material.value }
    };
}