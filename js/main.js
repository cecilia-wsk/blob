import '../css/style.css';
import * as THREE from 'three'; 
import * as dat from 'dat.gui'; 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');
// Debug
const gui = new dat.GUI()
// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( '#202232' );

// Object
const geometry = new THREE.IcosahedronGeometry(7, 100);

const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: 0.15 },
        uNoiseDensity: { value: 2 },
        uNoiseStrength: { value: Math.PI },
        uFrequency: { value: 4 },
        uAmplitude: { value: 4 },
        uIntensity: { value: 0.3 },
    },
    wireframe: true,
    transparent: true,
    blending: THREE.AdditiveBlending
})


gui.add(material.uniforms.uSpeed, 'value').min(0).max(1).step(0.001).name('speed');
gui.add(material.uniforms.uNoiseDensity, 'value').min(0).max(10).step(0.001).name('noise_density');
gui.add(material.uniforms.uNoiseStrength, 'value').min(0).max(10).step(0.001).name('noise_strength');
gui.add(material.uniforms.uFrequency, 'value').min(0).max(10).step(0.001).name('frequency');
gui.add(material.uniforms.uAmplitude, 'value').min(0).max(10).step(0.001).name('amplitude');
gui.add(material.uniforms.uIntensity, 'value').min(0).max(1).step(0.001).name('intensity');


const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width * 2 - 1;
    mouse.y = - (event.clientY / sizes.height * 2 - 1);
})

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, 0, 25);
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update control
    controls.update()

    // Update mesh
    //mesh.rotation.x += 0.005;
    //mesh.rotation.y += 0.005;

    // Update material
    material.uniforms.uTime.value = elapsedTime;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()