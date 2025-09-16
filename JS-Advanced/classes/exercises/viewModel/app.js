class Textbox {
    constructor(selector, regexp) {
        this._elements = Array.from(document.querySelectorAll(selector));
        this._invalidSymbols = regexp;
        this._value = '';

        this._elements.forEach(element => {
            element.addEventListener('input', (ev) => {
                this.value = ev.target.value;
                this._elements.map(el => el.value = this.value);
            });
        });
    }

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
    }

    get elements() {
        return this._elements;
    }

    isValid() {
        return !this._invalidSymbols.test(this.value);
    }
}

let textbox = new Textbox(".textbox", /[^a-zA-Z0-9]/);
let inputs = Array.from(document.querySelectorAll('.textbox'));

// inputs.on('input', function () { 
//     console.log(textbox.value); 
// });
inputs.forEach(e => { e.addEventListener('input', () => {
    console.log(textbox.value);});

})