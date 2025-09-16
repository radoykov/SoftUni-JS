function solve() {
    //add event listener
    arr = Array.from(document.querySelectorAll('ul.quiz-step.step1.current'));
    arr.map(v=> v.addEventListener('click', onClick));
    let sum = 0;
    function onClick(ev) {
        //check if user is cliked on button
        if (ev.target.tagName != 'P' && ev.target.className != 'answer-text') {
            return;
        }
        //check which question is
        const ul = ev.target.parentNode.parentNode.parentNode;

        if (ul.querySelector('h2').textContent === "Question #1: Which event occurs when the user clicks on an HTML element?") {

            if (ev.target.textContent == 'onclick') {
                sum++;
            }
            ul.parentNode.style.display = 'none';
            document.querySelectorAll('section')[1].style.display = 'block';

        } else if (ul.querySelector('h2').textContent === "Question #2: Which function converting JSON to string?") {

            if (ev.target.textContent == 'JSON.stringify()') {
                sum++;
            }

            ul.parentNode.style.display = 'none';
            document.querySelectorAll('section')[2].style.display = 'block';

        } else {

            if (ev.target.textContent == "A programming API for HTML and XML documents") {
                sum++;
            }

            ul.parentNode.style.display = 'none';
            document.querySelector("ul#results").style.display = 'block';

            const h = document.querySelector("ul#results").querySelector('h1');
            //show result
           if(sum == 3){
             h.textContent = `You are recognized as top JavaScript fan!`
           } else{
             h.textContent = `You have ${sum} right answers`;
           }
        }
    }
}