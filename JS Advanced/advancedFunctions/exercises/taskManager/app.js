function solve() {
    const addBtn = document.querySelector("button#add");
    addBtn.addEventListener('click', AddBtnOn);

    function AddBtnOn(ev) {
        ev.preventDefault();
        let task = document.querySelector("input#task");
        let description = document.querySelector("textarea#description");
        let date = document.querySelector("input#date");

        if (task.value === '' || description.value === '' || date.value === '') { return; }

        const sectionOpen = document.querySelectorAll('section')[1];
        const div = sectionOpen.children[1];

        let article = Create("article");
        let h3 = Create("h3", task.value);
        let p1 = Create("p", `Description: ${description.value}`);
        let p2 = Create("p", `Due Date: ${date.value}`);

        let divIn = Create("div", null, "flex");
        let buttonStart = Create("button", "Strat", "green");
        let buttonDelete = Create("button", "Delete", "red");

        Append(buttonStart, divIn);
        Append(buttonDelete, divIn);

        Append(h3, article);
        Append(p1, article);
        Append(p2, article);
        Append(divIn, article);

        Append(article, div);

        task.value = '';
        description.value = '';
        date.value = '';

        buttonStart.addEventListener('click', BtnOpenStart);
        buttonDelete.addEventListener('click', btnDeleteOn);

    }

    function BtnOpenStart(ev) {
        ev.preventDefault();

        const sectionInProgress = document.querySelectorAll('section')[2];
        const divInProgress = sectionInProgress.children[1];

        const articleCurrent = ev.target.parentNode.parentNode;

        const divWithBtns = articleCurrent.children[3];

        divWithBtns.removeChild(divWithBtns.firstChild);
        divWithBtns.removeChild(divWithBtns.firstChild);

        let buttonDelete = Create("button", "Delete", "red");
        let buttonFinish = Create("button", "Finish", "orange");

        buttonDelete.addEventListener('click', btnDeleteOn);
        buttonFinish.addEventListener('click', BtnInProgressFinish);
        
        Append(buttonDelete, divWithBtns);
        Append(buttonFinish, divWithBtns);

        Append(articleCurrent, divInProgress);
    }

    function BtnInProgressFinish(ev){
        ev.preventDefault();

        const sectionComplete = document.querySelectorAll('section')[3];
        const divComplete = sectionComplete.children[1];

        const articleCurrent = ev.target.parentNode.parentNode;

        articleCurrent.children[3].remove();

        Append(articleCurrent, divComplete);
    }

    function btnDeleteOn(ev) {
        ev.preventDefault();
        ev.target.parentNode.parentNode.remove();
    }

    function Create(el, value = null, classEl = null) {
        let element = document.createElement(el);
        if (element.tagName !== 'INPUT') {
            element.textContent = value;
        } else {
            element.value = value;
        }

        element.className = classEl;
        return element;
    }

    function Append(child, parent) {
        parent.appendChild(child);
    }
}