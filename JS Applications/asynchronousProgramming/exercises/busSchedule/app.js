function solve() {
    const inputDepart = document.querySelector("input#depart");
    const inputArrive = document.querySelector("input#arrive");
    const divInfo = document.querySelector("div#info");
    const currArr = [1287, 1308, 1327, 2334];

    async function depart() {

        try {
            const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${currArr.shift()}`);
            const data = await response.json();

            divInfo.textContent = `Next stop ${data.name}`;
            inputDepart.disabled = true;
            inputArrive.disabled = false;


        } catch (err) {
            divInfo.textContent = "Error";
            inputDepart.disabled = true;
            inputArrive.disabled = true;
        }
    }

    async function arrive() {
        try {
            const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${currArr.shift()}`);
            const data = await response.json();

            divInfo.textContent = `Arriving at ${data.name}`;
            inputArrive.disabled = true;
            inputDepart.disabled = false;


        } catch (err) {
            divInfo.textContent = "Error";
            inputDepart.disabled = true;
            inputArrive.disabled = true;
        }
    }

    return {
        depart,
        arrive
    };
}

let result = solve();