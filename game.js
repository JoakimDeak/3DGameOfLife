function createBoard(size) {

    let matrix = [];

    for (i = 0; i < size; i++) {
        matrix[i] = [];
    }
    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            matrix[i][j] = [];
        }
    }
    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            for (k = 0; k < size; k++) {
                matrix[i][j][k] = Math.round(Math.random());
            }
        }
    }

    return matrix;
}

let matrix = createBoard(10);

addMatrix(matrix);