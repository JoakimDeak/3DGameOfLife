function createBoard(size) {

    let matrix = [];

    for (x = 0; x < size; x++) {
        matrix[x] = [];
    }
    for (x = 0; x < size; x++) {
        for (y = 0; y < size; y++) {
            matrix[x][y] = [];
        }
    }
    for (x = 0; x < size; x++) {
        for (y = 0; y < size; y++) {
            for (z = 0; z < size; z++) {
                matrix[x][y][z] = Math.round(Math.random());
            }
        }
    }

    return matrix;
}

/*
    save coords of all points that are going to flip
    pointToFlip = {1, 5, 7};
*/

function applyRules(matrix) {
    for (x = 0; x < matrix.length; x++) {
        for (y = 0; y < matrix[x].length; y++) {
            for (z = 0; z < matrix[x][y].length; z++) {
                let curPoint = createPoint(x, y, z);
                let neighbours = countNeighbours(curPoint, matrix);
                //rules go here
            }
        }
    }
}

function countNeighbours(point, matrix) {
    let neighbours = 0;
    for (x = point.x - 1; x <= point.x + 1; x++) {
        for (y = point.y - 1; y <= point.y + 1; y++) {
            for (z = point.z - 1; z <= point.z + 1; z++) {
                let curPoint = createPoint(x, y, z);
                if (isInRange(curPoint, matrix.length) && !pointIsEqual(curPoint, point)) {
                    if (matrix[x][y][z] == 1) {
                        neighbours++;
                    }
                }
            }
        }
    }
    return neighbours;
}

function pointIsEqual(point1, point2) {
    for (axis in point1) {
        if (point1[axis] != point2[axis]) {
            return false;
        }
    }
    return true;
}

function isInRange(point, maxSize) {
    for (let axis in point) {
        if (point[axis] < 0 || point[axis] >= maxSize) {
            return false;
        }
    }
    return true;
}

function createPoint(x, y, z) {
    let point = { x: x, y: y, z: z };
    return point;
}

let matrix = createBoard(5);

let test = createPoint(4, 4, 4);
console.log(countNeighbours(test, matrix));

addMatrix(matrix);