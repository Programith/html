/*

@Programith

*/

var height,
    width,
    container,
    scene,
    camera,
    renderer,
    dominos = [],
    cameraLookAt = new THREE.Vector3(0, 0, 0),
    cameraTarget = new THREE.Vector3(0, 0, 800);
const COLORS = ["#F7A541", "#F45D4C", "#FA2E59", "#4783c3", "#9c6cb7"];

function initStage() {
    width = window.innerWidth;
    height = window.innerHeight;
    container = document.getElementById("stage");
}

function initScene() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
}

function initCamera() {
    fieldOfView = 75;
    aspectRatio = width / height;
    nearPlane = 1;
    farPlane = 30000;
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    camera.position.z = 800;
    camera.position.y = 300;
}

function createLights() {
    shadowLight = new THREE.DirectionalLight(0xffffff, 2);
    shadowLight.position.set(20, 0, 10);
    shadowLight.castShadow = true;
    shadowLight.shadowDarkness = 0.01;
    scene.add(shadowLight);

    light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(-70, 100, 20);
    scene.add(light);

    backLight = new THREE.DirectionalLight(0xffffff, 0.8);
    backLight.position.set(0, 0, -20);
    scene.add(backLight);
}

function Domino() {
    this.vx = Math.random() * 0.05;
    this.vy = Math.random() * 0.05;
}

Domino.prototype.init = function (i) {
    this.i = i;
    var domino = new THREE.Object3D();
    var geometryCore = new THREE.BoxGeometry(50, 100, 20);
    var materialCore = new THREE.MeshLambertMaterial({
        color: COLORS[i % COLORS.length],
        shading: THREE.FlatShading,
    });
    var box = new THREE.Mesh(geometryCore, materialCore);
    var x = Math.cos(Math.PI * 2 * (i / 30)) * 240;
    var z = Math.sin(Math.PI * 2 * (i / 30)) * 240;
    domino.position.x = x;
    domino.position.z = z;
    geometryCore.applyMatrix(new THREE.Matrix4().makeTranslation(0, 100, 0));
    domino.rotation.y = -Math.atan2(z, x);
    domino.rotation.z = Math.atan2(z, x);

    domino.add(box);
    this.domino = domino;
};

Domino.prototype.update = function () {
    this.i += 0.09;
    var x = Math.cos(Math.PI * 2 * (this.i / 30)) * 240;
    var z = Math.sin(Math.PI * 2 * (this.i / 30)) * 240;
    this.domino.position.x = x;
    this.domino.position.z = z;
    this.domino.rotation.y = -Math.atan2(z, x);
    this.domino.rotation.z = Math.atan2(z, x);
};

function render() {
    renderer.render(scene, camera);
}

function updateDominos() {
    for (var i = 0, l = dominos.length; i < l; i++) {
        dominos[i].update();
    }
}

function setDominos() {
    for (var i = 0; i < 30; i++) {
        var d = new Domino();
        d.init(i);
        console.log(d.domino);
        scene.add(d.domino);
        dominos[i] = d;
    }
}

function animate() {
    requestAnimationFrame(animate);
    updateDominos();
    render();
}

$(document).ready(function () {
    initStage();
    initScene();
    initCamera();
    createLights();
    setDominos();
    animate();
});