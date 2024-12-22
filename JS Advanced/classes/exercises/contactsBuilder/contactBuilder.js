class Contact {

    constructor(firstName, lastName, phone, email) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;

        this._online = false;
    }

    render(id) {
        const place = document.getElementById(id);
        const article = Create('article');
        const div1 = Create('div', `${this.firstName} ${this.lastName}`, 'title');
        const div2 = Create('div', '', 'info');
        const btn = Create('button', 'ℹ');
        const span1 = Create('span', `☎ ${this.phone}`);
        const span2 = Create('span', `✉ ${this.email}`);

        div1.appendChild(btn);
        div2.appendChild(span1);
        div2.appendChild(span2);
        article.appendChild(div1);
        article.appendChild(div2);
        place.appendChild(article);

        div2.style.display = 'none';
        btn.addEventListener('click', () => {
            div2.style.display = (div2.style.display === 'none') ? 'block' : 'none';
        });

        Object.defineProperty(this, 'online', {
            set: (value) => {
                this._online = value;
                if (value) {
                    div1.classList.add('online');
                } else {
                    div1.classList.remove('online');
                }
            },
                get: () => {
                    return this._online;
                }
        
        });
    }


};

function Create(el, value = null, classEl = null) {
    const element = document.createElement(el);
    if (element.tagName !== 'INPUT') {
        element.textContent = value;
    } else {
        element.value = value;
    }
    element.className = classEl;
    return element;
}

function people() {
    const contacts = [
        new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
        new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
        new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
    ];
    contacts.forEach(c => c.render('main'));

    // After 1 second, change the online status to true
    setTimeout(() => contacts[1].online = true, 2000);
}
