function orbit(width, height, x, y) {

    const matrix = new Array(height).fill(0).map(() => new Array(width).fill(0));

    matrix[x][y] = 1;

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (matrix[row][col] === 0) {

                const distance = Math.max(Math.abs(row - y), Math.abs(col - x));
                matrix[row][col] = 1 + distance;
            }
        }
    }

    const result = matrix.map(row => row.join(' ')).join('\n');
    return result;
}

console.log(orbit(4, 4, 0, 0));
console.log('----');
console.log(orbit(5, 5, 2, 2));
console.log('----');
console.log(orbit(3, 3, 2, 2));