import * as THREE from 'three';
import { data } from './data.ts';

let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, points: THREE.Points;

/*
interface Point {
	x: number,
	y: number,
	z: number,
}
*/

export function generateMask() {
	/*
	 * We want to either recolour or block certain points from a mesh
	 */
}

export function renderPointCloud() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 4;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	const geometry = new THREE.BufferGeometry();
	const vertices = [];

	let faceMeshData = data;

	for (let i = 0; i < faceMeshData.length; i++) {
		const x = faceMeshData[i].x;
		const y = faceMeshData[i].y;
		const z = faceMeshData[i].z;

		vertices.push(x, y, z);
	}

	geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

	const material = new THREE.PointsMaterial({
		color: 0x00ffff,
		size: 3,
		blending: THREE.AdditiveBlending,
		transparent: true,
		sizeAttenuation: false
	});

	points = new THREE.Points(geometry, material);
	scene.add(points);
}

export function animatePointCloud() {
	requestAnimationFrame(animatePointCloud);
	renderer.render(scene, camera);
	points.rotation.x += 0.01;
	points.rotation.y += 0.01;
}

