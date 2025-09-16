function diagonal(matrixRows) {
    let matrix = matrixRows.map(row => row.split(' ').map(Number));

    let sum1 = 0;
    let sum2 = 0;

    for (let i = 0; i < matrix.length; i++) {
        sum1 += matrix[i][i];
        sum2 += matrix[i][matrix.length - 1 - i];
    }

    if (sum1 == sum2) {
        for (let i = 0; i < matrix.length; i++) {
            for (let k = 0; k < matrix.length; k++) {
                if (i != k && i != matrix.length - 1 - k) {
                    matrix[i][k] = sum1;
                }
            }
        }
        printMatrix(matrix);

    } else {
        printMatrix(matrix);
    }
}

function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(' '));
    }
}

diagonal(['5 3 12 3 1', '11 4 23 2 5', '101 12 3 21 10', '1 4 5 2 2', '5 22 33 11 1']);
console.log('-----');
diagonal(['1 1 1', '1 1 1', '1 1 0']);