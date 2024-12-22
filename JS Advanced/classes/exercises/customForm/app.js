let result = (function () {

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


    class Form {
        constructor(...textBoxes) {
            this._element = document.createElement('div');
            this._element.className = 'form';

            this._textboxes = [...textBoxes];

            this._textboxes.forEach(textbox => {
                if (!(textbox instanceof Textbox)) {
                    throw new Error("Error invalid textbox");
                }
                textbox.elements.forEach(el => this._element.appendChild(el));
            });


        }

        submit() {
            let istrue = true;
            this._textboxes.forEach(el => {
                if (el.isValid()) {
                    el._elements.forEach(val => val.style.border = "2px solid green");
                } else {
                    istrue = false;
                    el._elements.forEach(val => val.style.border = "2px solid red");
                }
            });

            return istrue;
        }

        attach(selector) {
            const parent = document.querySelector(selector);
            if (parent) {
                parent.appendChild(this._element);
            }
        }
    }

    return {
        Textbox: Textbox,
        Form: Form
    }
}())

let Textbox = result.Textbox;
let Form = result.Form;
let username = new Textbox("#username", /[^a-zA-Z0-9]/);
let password = new Textbox("#password", /[^a-zA-Z]/);
username.value = "username";
password.value = "password2";
let form = new Form(username, password);
