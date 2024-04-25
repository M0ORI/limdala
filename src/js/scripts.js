import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';


const renderer = new THREE.WebGLRenderer({ antialias: true });
const canvasContainer = document.getElementById('canvas-container');
canvasContainer.appendChild(renderer.domElement);

const canvas = renderer.domElement;
canvas.width = 500;
canvas.height = 500 ; // Alto deseado

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    5.5,
    window.innerWidth / window.innerHeight,
    0.5,
    200
);
renderer.setClearColor(0x02111b);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(6, 2, 6);

orbit.update();

//const grid = new THREE.GridHelper(30, 30);
//scene.add(grid);

const gltfLoader = new GLTFLoader();

const rgbeLoader = new RGBELoader();

renderer.outputEncoding = THREE.LinearEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
// Obtener las dimensiones del contenedor
const containerWidth = canvasContainer.clientWidth;
const containerHeight = canvasContainer.clientHeight;

// Actualizar la relación de aspecto de la cámara y el tamaño del renderizador
camera.aspect = containerWidth / containerHeight;
camera.updateProjectionMatrix();
renderer.setSize(containerWidth, containerHeight);

let myModel;
rgbeLoader.load('../static/hdrFree.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    gltfLoader.load('../static/Brain.glb', function (gltf) { 
        
        const model = gltf.scene;
        model.center;
        scene.add(model);
       
        myModel = model;
    });
});
const light = new THREE.AmbientLight( 0x02111b , 20);
        scene.add(light);
function animate(time) {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);




