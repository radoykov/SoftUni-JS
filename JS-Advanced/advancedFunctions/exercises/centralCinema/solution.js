function solve() {
    const onScreenBtn = document.querySelector("div#container button");
    const clearBtn = document.querySelector("section#archive button");


    onScreenBtn.addEventListener('click', OnScreenBtn);
    clearBtn.addEventListener('click', Clear);

    function OnScreenBtn(ev) {

        ev.preventDefault();
        let [name, hall, price] = document.querySelectorAll("div#container input");

        if (!Number(price.value)) {
            name.value = '';
            hall.value = '';
            price.value = '';
            return;
        }

        let ul = document.querySelector("section#movies ul");

        let li = Create("li");
        let span = Create("span", name.value);
        let strong = Create("strong", `Hall: ${hall.value}`);
        let div = Create("div");
        let strong2 = Create("strong", Number(price.value).toFixed(2));
        let input = Create("input");
        input.placeholder = "Tickets Sold";
        let button = Create("button", "Archive");
        button.addEventListener('click', Archive);


        div.appendChild(strong2);
        div.appendChild(input);
        div.appendChild(button);

        li.appendChild(span);
        li.appendChild(strong);
        li.appendChild(div);

        ul.appendChild(li);

        name.value = '';
        hall.value = '';
        price.value = '';
    }

    function Archive(ev) {
        ev.preventDefault();
        if (!Number(ev.target.parentNode.children[1].value)) {
            ev.target.parentNode.children[1].value = '';
            return;
        }
        //input only have .input
        let price = ev.target.parentNode.firstChild.textContent * Number(ev.target.parentNode.children[1].value);
        let name = ev.target.parentNode.parentNode.firstChild.textContent;

        ev.target.parentNode.parentNode.remove();

        let ul = document.querySelector("section#archive ul");

        let li = Create("li", null);

        let span = Create("span", name);
        let strong = Create("strong", `Total amount: ${price.toFixed(2)}`);
        let button = Create("button", "Delete");
        button.addEventListener('click', Delete);
        li.appendChild(span);
        li.appendChild(strong);
        li.appendChild(button);

        ul.appendChild(li);

    }

    function Delete(ev) {
        ev.preventDefault();

        ev.target.parentNode.remove();
    }

    function Create(el, value = null) {
        let element = document.createElement(el);
        if (element.tagName !== 'INPUT') {
            element.textContent = value;
        } else {
            element.value = value;
        }
        return element;
    }

    function Clear(ev) {
        ev.preventDefault();

        let ul = ev.target.parentNode.children[1];

        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    }

}