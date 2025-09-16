function attachEventsListeners() {
    const main = document.querySelector('main');

    main.addEventListener('click', onClick);

    function onClick(ev) {
        if (ev.target.tagName === 'INPUT' && ev.target.type === 'button') {
            const parent = ev.target.parentNode;
            const value = Number(parent.children[1].value);
            const type = parent.children[1].id;

            if (ev.target.id != 'secondsBtn') {
                if (type == 'days') {
                    document.querySelector('div input#hours').value = value * 24;

                } else if (type == 'hours') {
                    document.querySelector('div input#minutes').value = value * 60;


                } else if (type == 'minutes') {
                    document.querySelector('div input#seconds').value = value * 60;

                }
            }
        }
    }
}