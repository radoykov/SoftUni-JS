function solve() {
    const [quickCheck, clear] = document.querySelectorAll('button');
    const output = document.querySelector('div#check p');

    quickCheck.addEventListener('click', Check);
    clear.addEventListener('click', Clear);

    function Check() {
        const arrTds = Array.from(document.querySelectorAll('td input')).map(v => Number(v.value));

        const matrix = arrTds.reduce((acc, value, index) => {
            const rowIndex = Math.floor(index / 3);
            const colIndex = index % 3;
            if (!acc[rowIndex]) {
                acc[rowIndex] = [];
            }
            acc[rowIndex][colIndex] = value;
            return acc;
        }, []);

        //iterated over matrix
        let flag = true;

        for (let i = 0; i < 3; i++) {
            const arrRow = [];
            const arrCol = [];
            for (let k = 0; k < 3; k++) {
                arrRow.push(matrix[i][k]);
                arrCol.push(matrix[k][i]);
            }

            arrRow.sort().forEach((v, i, arr) => {
                if (arr[i] === arr[i + 1]) {
                    flag = false;
                }
            });
            arrCol.sort().forEach((v, i, arr) => {
                if (arr[i] === arr[i + 1]) {
                    flag = false;
                }
            });

            if (flag == false) {
                break;
            }

        }

        //check
        const table = document.querySelector('table');
        if (flag == true) {
            table.style.border = "2px solid green";
            output.style.color = 'green';
            output.innerHTML = "You solve it! Congratulations!";
        } else {
            table.style.border = "2px solid red";
            output.style.color = 'red';
            output.innerHTML = "NOP! You are not done yet;";
        }



    }

    function Clear() {
        const arrTds = document.querySelectorAll('td input');

        for (let td of arrTds) {
            td.value = '';
        }
    }


}