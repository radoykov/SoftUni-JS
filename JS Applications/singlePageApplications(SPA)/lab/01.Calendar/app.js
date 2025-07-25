const objMonthToDate = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sept': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12
};

const yearsSection = document.getElementById('years');
const monthsObj = [...document.querySelectorAll('section.monthCalendar')].reduce((acc, c) => {
    acc[c.id.slice(5)] = c;
    return acc;
}, {});
const daysObj = [...document.querySelectorAll('section.daysCalendar')].reduce((acc, c) => {
    acc[c.id.slice(6)] = c;
    return acc;
}, {});

let monthsSection;


const body = document.querySelector('body');

function calendar() {
    yearsSection.addEventListener('click', onYear);
    body.innerHTML = '';
    body.appendChild(yearsSection);
    body.classList.remove('hidden');
}

function onYear(ev) {
    if (ev.target.tagName != 'TD' && ev.target.tagName != 'DIV') return;

    if (ev.target.tagName == 'TD') {
        monthsSection = monthsObj[ev.target.firstElementChild.textContent];
        monthsSection.addEventListener('click', onMonth);

    } else {
        monthsSection = monthsObj[ev.target.textContent];
        monthsSection.addEventListener('click', onMonth);
    }
    body.innerHTML = '';
    body.appendChild(monthsSection);
}

function onMonth(ev) {
    if (ev.target.tagName != 'TD' && ev.target.tagName != 'DIV' && ev.target.tagName != 'CAPTION') return;

    if (ev.target.tagName == 'CAPTION') {
        body.innerHTML = '';
        body.appendChild(yearsSection);
        return;
    }

    let monthNum;
    monthNum = objMonthToDate[ev.target.tagName == 'TD' ? ev.target.firstElementChild.textContent : ev.target.textContent];

    let key = ev.target;
    while (key.tagName != 'TABLE') {
        key = key.parentNode;
    }
    key = key.firstElementChild.textContent;
    let daysSection = daysObj[`${key}-${monthNum}`];
    body.innerHTML = '';
    body.appendChild(daysSection);
    daysSection.addEventListener('click', onDay);
}

function onDay(ev) {
    if (ev.target.tagName == 'CAPTION') {
        body.innerHTML = '';
        body.appendChild(monthsSection);
        return;
    }
}

calendar();