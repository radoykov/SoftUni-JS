function lockedProfile() {
    document.querySelector('main').addEventListener('click', onClick);

    function onClick(ev) {
        if (ev.target.tagName == 'BUTTON') {
            const isLocked = ev.target.parentNode.querySelector('input[type=radio]:checked').value === 'lock';
            const div = ev.target.parentNode.querySelector('div');

            if (ev.target.textContent == 'Show more') {
                if (isLocked == false) {
                    div.style.display = 'block';
                    ev.target.textContent = 'Hide it';
                }
                //else we can not show private information
                
            } else if (ev.target.textContent == 'Hide it') {
                if (isLocked == false) {
                    div.style.display = 'none';
                    ev.target.textContent = 'Show more';
                }
                //else it is locked after showing profile we can not close it
            }
        }
    }
}