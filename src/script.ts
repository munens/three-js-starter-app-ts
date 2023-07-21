import {AxesHelper, BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import dat from "dat.gui";

const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement;

// Sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
};

// Scene
const scene = new Scene();

// Object
const cubeGeometry = new BoxGeometry(1, 1, 1);
const cubeMaterial = new MeshBasicMaterial({
	color: 0xff0000
});
const cubeMesh = new Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.set(-1, 0.25, 0)
scene.add(cubeMesh);

const cube2 = new Mesh(
	new BoxGeometry(),
	new MeshBasicMaterial({color: 0x00ff00})
);
cube2.position.set(1, 0, 0);
cube2.rotation.set(Math.PI, Math.PI / 4, Math.PI / 4);
scene.add(cube2);

const cube3 = new Mesh(
	new BoxGeometry(),
	new MeshBasicMaterial({color: 0x0000ff})
);
cube3.position.set(2.5, 0.25, 0.5);
scene.add(cube3)

const axesHelper = new AxesHelper(3);
scene.add(axesHelper)

// Camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(1, 1, 3)
scene.add(camera);

// Renderer
const renderer = new WebGLRenderer({
	canvas
});
renderer.setSize(sizes.width, sizes.height);

const orbitControls = new OrbitControls(camera, canvas);

function animate() {
	orbitControls.update();
	renderer.render(scene, camera);

	window.requestAnimationFrame(animate);
}

animate();

gui.add(cubeMesh.position, 'y', -5, 5, 0.01)
.name('cubeMesh.position.y');

gui.add(cubeMesh.material, 'wireframe')
.name('cubeMesh.material.wireframe');

gui.add(cube3.rotation, 'y', -Math.PI, Math.PI, 0.05)
.name('mesh.rotation.y');