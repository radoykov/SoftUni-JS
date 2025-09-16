import e from '../../../funcCreateElement/funcCreateElement.js'

window.onload = function () {
    attachEvents();
}

function attachEvents() {
    const objSymbols = {
        "Sunny": "☀️",
        "Partly sunny": "⛅",
        "Overcast": "☁️",
        "Rain": "☔",
        "Degrees": "°"
    };
    //or
    //     const objSymbols = {
    //     "Sunny": "\u2600",
    //     "Partly sunny": "\u26C5",
    //     "Overcast": "\u2601",
    //     "Rain": "\u2614",
    //     "Degrees": "\u00B0"
    // };
    document.querySelector("input#submit").addEventListener('click', onClick);


    async function onClick(ev) {
        try {
            const response = await fetch("http://localhost:3030/jsonstore/forecaster/locations");
            const arrOfObj = await response.json();

            const obj = arrOfObj.find(obj => obj.name.toLowerCase() == ev.target.parentNode.children[0].value.toLowerCase());

            const [todayResponse, followingDaysResponse] = await Promise.all([
                fetch(`http://localhost:3030/jsonstore/forecaster/today/${obj.code}`),
                fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${obj.code}`)
            ]);
            const today = await todayResponse.json();
            const followingDays = await followingDaysResponse.json();


            const divCurr = document.querySelector("div#current");
            Array.from(divCurr.children).forEach(e => {
                if (e !== divCurr.firstElementChild) {
                    e.remove();
                }
            });
            appendCurrData(divCurr, today);

            const divUpcoming = document.querySelector("div#upcoming");
            Array.from(divUpcoming.children).forEach(e => {
                if (e !== divCurr.firstElementChild) {
                    e.remove();
                }
            });
            [...followingDays.forecast].forEach(day => appendFutureData(divUpcoming, day));

            document.querySelector("div#forecast").style.display = 'block';

        } catch (err) {
            const div = document.querySelector("div#content");
            div.appendChild(e("li", { textContent: `Error : ${err}` }));
            document.querySelector("div#forecast").style.display = 'none';
        }
    }
    function appendCurrData(div, todayData) {
        div.appendChild(e('div', { className: "forecasts" },
            e('span', { className: "condition symbol", textContent: objSymbols[todayData.forecast.condition] }),
            e('span', { className: "condition" },
                e('span', { className: "forecast-data", textContent: todayData.name }),
                e('span', { className: "forecast-data", textContent: `${todayData.forecast.low}${objSymbols.Degrees}/${todayData.forecast.high}${objSymbols.Degrees}` }),
                e('span', { className: "forecast-data", textContent: todayData.forecast.condition }))
        ));
    }
    function appendFutureData(div, upcomingData) {
        div.appendChild(e('div', { className: "forecast-info" },
            e('span', { className: "upcoming" },
                e('span', { className: "symbol", textContent: objSymbols[upcomingData.condition] }),
                e('span', { className: "forecast-data", textContent: `${upcomingData.low}${objSymbols.Degrees}/${upcomingData.high}${objSymbols.Degrees}` }),
                e('span', { className: "forecast-data", textContent: upcomingData.condition }))
        ));
    }
}
