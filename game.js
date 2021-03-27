function createMatrix(size) {

    let matrix = [];

    for (let x = 0; x < size; x++) {
        matrix[x] = [];
    }
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            matrix[x][y] = [];
        }
    }
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            for (let z = 0; z < size; z++) {
                matrix[x][y][z] = Math.round(Math.random());
            }
        }
    }

    return matrix;
}

function getChanges(matrix) {
    let points = [];
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[x].length; y++) {
            for (let z = 0; z < matrix[x][y].length; z++) {
                let curPoint = createPoint(x, y, z);
                let neighbours = countNeighbours(curPoint, matrix);
                if (matrix[x][y][z] == 1) {
                    if (neighbours > 8 || neighbours < 5) {
                        points.push(curPoint);
                    }
                } else if (neighbours == 6) {
                    points.push(curPoint);
                }
            }
        }
    }
    return points;
}

function applyNextItt(matrix) {
    let points = getChanges(matrix);
    for (let i = 0; i < points.length; i++) {
        let curPoint = points[i];
        matrix[curPoint.x][curPoint.y][curPoint.z] = !matrix[curPoint.x][curPoint.y][curPoint.z];
    }
    return matrix;
}

function countNeighbours(point, matrix) {
    let neighbours = 0;
    for (let x = point.x - 1; x <= point.x + 1; x++) {
        for (let y = point.y - 1; y <= point.y + 1; y++) {
            for (let z = point.z - 1; z <= point.z + 1; z++) {
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
