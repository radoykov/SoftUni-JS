function equalN(matrix) {
    let count = 0;
    for (let i = 0; i < matrix[0].length; i++) {
        for (let k = 0; k < matrix.length - 1; k++) {
           if(matrix[k][i] === matrix[k+1][i]){
            count++;
           }
        }

    }
    return count;
}

console.log(equalN([['2', '3', '4', '7', '0'],
['4', '0', '5', '3', '4'],
['2', '3', '5', '4', '2'],
['9', '8', '7', '5', '4']]
));

console.log(equalN([['test', 'yes', 'yo', 'ho'],
['well', 'done', 'yo', '6'],
['not', 'done', 'yet', '5']]
));