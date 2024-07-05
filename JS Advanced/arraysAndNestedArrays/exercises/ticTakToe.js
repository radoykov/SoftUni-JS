function ticTakToe(arr) {
    matrix = [['false', 'false', 'false'], ['false', 'false', 'false'], ['false', 'false', 'false']];
    let flag = false;
    let whoIS = -1;
    for (let i = 0; i < arr.length; i++) {
        whoIS++;
        let a, b;
        a = arr[i][0];
        b = arr[i][2];
        a = parseInt(a);
        b = parseInt(b);

        if (whoIS % 2 == 0) {
            if (matrix[a][b] == 'false') {
                matrix[a][b] = 'X';
            } else {
                console.log("This place is already taken. Please choose another!");
                whoIS++;
            }
        } else if (whoIS % 2 != 0) {
            if (matrix[a][b] == 'false') {
                matrix[a][b] = 'O';
            } else {
                console.log("This place is already taken. Please choose another!");
                whoIS++
            }
        }

        flag = check(matrix);


        if (flag == true) {
            break;
        }
    }
    if (flag == false) {
        console.log("The game ended! Nobody wins :(");
    }
    printMatrix(matrix);

}
function check(matrix) {
    let str1 = '';
    let str2 = '';
    let dia1 = '';
    let dia2 = '';

    for (let i = 0; i < 3; i++) {
        dia1 += matrix[i][i];
        dia2 += matrix[i][matrix.length - 1 - i];

        for (let k = 0; k < 3; k++) {
            str1 += matrix[i][k];
            str2 += matrix[k][i];
        }
        if (str1 == 'XXX' || str2 == 'XXX') {
            console.log(`Player X wins!`);
            return true;
        } else if (str1 == 'OOO' || str2 == 'OOO') {
            console.log(`Player O wins!`);
            return true;

        }
        str1 = '';
        str2 = '';
    }

    if (dia1 == 'XXX' || dia2 == 'XXX') {
        console.log(`Player X wins`);
        return true;
    } else if (dia1 == 'OOO' || dia2 == 'OOO') {
        console.log(`Player O wins`);
        return true;
    }
    return false;
}
function printMatrix(matrix) {
    for (let i = 0; i < 3; i++) {
        console.log(`${matrix[i][0]}\t${matrix[i][1]}\t${matrix[i][2]} `)
    }
}

ticTakToe(["0 1", "0 0", "0 2", "2 0", "1 0", "1 1", "1 2", "2 2", "2 1", "0 0"]);
ticTakToe(["0 0", "0 0", "1 1", "0 1", "1 2", "0 2", "2 2", "1 2", "2 2", "2 1"]);
ticTakToe(["0 1", "0 0", "0 2", "2 0", "1 0", "1 2", "1 1", "2 1", "2 2", "0 0"]);