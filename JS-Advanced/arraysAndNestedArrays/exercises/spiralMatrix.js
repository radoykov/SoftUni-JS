function spiralMatrix(rows, cols) {
    const matrix = new Array(rows).fill().map(() => new Array(cols).fill(0));
    let num = 1;
    let top = 0, bottom = rows - 1, left = 0, right = cols - 1;

    while (num <= rows * cols) {
        for (let i = left; i <= right; i++) {
            matrix[top][i] = num++;
        }
        top++;

        for (let i = top; i <= bottom; i++) {
            matrix[i][right] = num++;
        }
        right--;

        for (let i = right; i >= left; i--) {
            matrix[bottom][i] = num++;
        }
        bottom--;

        for (let i = bottom; i >= top; i--) {
            matrix[i][left] = num++;
        }
        left++;
    }

    for (const row of matrix) {
        console.log(row.join(' '));
    }
}


spiralMatrix(5, 5);
console.log('---');
spiralMatrix(3, 3);