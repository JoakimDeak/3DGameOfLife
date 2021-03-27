const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.x = 20;
camera.position.y = 20;
camera.position.z = 20;
camera.lookAt(0, 0, 0);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(10, 20, 0);
scene.add(dirLight);
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

function clearMatrix() {
    for (i = scene.children.length - 1; i >= 0; i--) {
        let curChild = scene.children[i];
        if (curChild.type == "Mesh") {
            scene.remove(curChild);
        }
    }
}

function createCube(x, y, z) {
    x = x || 0;
    y = y || 0;
    z = z || 0;

    let geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshPhongMaterial({ color: 0x00cc00 });
    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    return cube;
}

function moveCamera(x, y, z) {
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
    camera.lookAt(0, 0, 0);
}

function renderMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            for (let k = 0; k < matrix[0][0].length; k++) {
                if (matrix[i][j][k] == 1) {
                    createCube(i, j, k);
                }
            }
        }
    }
}

function init() {
    window.matrix = createMatrix(13);
    update();
}

async function update() {
    clearMatrix();
    matrix = applyNextItt(matrix);
    renderMatrix(matrix);
    renderer.render(scene, camera);
    await new Promise(r => setTimeout(r, 200));
    requestAnimationFrame(update);
}

init();