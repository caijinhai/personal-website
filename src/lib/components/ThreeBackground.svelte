<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';

	let container: HTMLDivElement;
	let animationId: number;

	onMount(() => {
		// Scene setup
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
		camera.position.z = 30;

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		container.appendChild(renderer.domElement);

		// Create floating code blocks
		const codeBlocks: THREE.Mesh[] = [];
		const geometries = [
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.BoxGeometry(2, 0.5, 0.3),
			new THREE.BoxGeometry(1.5, 0.8, 0.3),
			new THREE.BoxGeometry(3, 0.4, 0.2),
			new THREE.BoxGeometry(1.2, 1.2, 1.2),
		];

		// Material with wireframe style
		const material = new THREE.MeshBasicMaterial({
			color: 0x1a1a2e,
			wireframe: true,
			transparent: true,
			opacity: 0.3
		});

		// Create 30 floating code blocks
		for (let i = 0; i < 30; i++) {
			const geo = geometries[Math.floor(Math.random() * geometries.length)];
			const mesh = new THREE.Mesh(geo, material.clone());
			
			mesh.position.x = (Math.random() - 0.5) * 60;
			mesh.position.y = (Math.random() - 0.5) * 40;
			mesh.position.z = (Math.random() - 0.5) * 20 - 10;
			
			mesh.rotation.x = Math.random() * Math.PI;
			mesh.rotation.y = Math.random() * Math.PI;
			
			mesh.userData = {
				rotationSpeedX: (Math.random() - 0.5) * 0.01,
				rotationSpeedY: (Math.random() - 0.5) * 0.01,
				floatSpeed: Math.random() * 0.002 + 0.001,
				floatOffset: Math.random() * Math.PI * 2,
				originalY: mesh.position.y
			};
			
			scene.add(mesh);
			codeBlocks.push(mesh);
		}

		// Add floating particles
		const particlesGeometry = new THREE.BufferGeometry();
		const particlesCount = 200;
		const positions = new Float32Array(particlesCount * 3);

		for (let i = 0; i < particlesCount * 3; i += 3) {
			positions[i] = (Math.random() - 0.5) * 100;
			positions[i + 1] = (Math.random() - 0.5) * 100;
			positions[i + 2] = (Math.random() - 0.5) * 50;
		}

		particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

		const particlesMaterial = new THREE.PointsMaterial({
			color: 0x64ffda,
			size: 0.1,
			transparent: true,
			opacity: 0.6
		});

		const particles = new THREE.Points(particlesGeometry, particlesMaterial);
		scene.add(particles);

		// Add grid floor
		const gridHelper = new THREE.GridHelper(100, 50, 0x64ffda, 0x1a1a2e);
		gridHelper.position.y = -15;
		gridHelper.material.opacity = 0.1;
		gridHelper.material.transparent = true;
		scene.add(gridHelper);

		// Mouse interaction
		let mouseX = 0;
		let mouseY = 0;
		let targetX = 0;
		let targetY = 0;

		const onMouseMove = (event: MouseEvent) => {
			mouseX = (event.clientX / window.innerWidth) * 2 - 1;
			mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
		};

		window.addEventListener('mousemove', onMouseMove);

		// Handle resize
		const onResize = () => {
			camera.aspect = container.clientWidth / container.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(container.clientWidth, container.clientHeight);
		};

		window.addEventListener('resize', onResize);

		// Animation
		const animate = () => {
			animationId = requestAnimationFrame(animate);

			targetX += (mouseX - targetX) * 0.05;
			targetY += (mouseY - targetY) * 0.05;

			camera.position.x += (targetX * 5 - camera.position.x) * 0.05;
			camera.position.y += (targetY * 5 - camera.position.y) * 0.05;
			camera.lookAt(scene.position);

			// Animate code blocks
			const time = Date.now() * 0.001;
			codeBlocks.forEach((block) => {
				block.rotation.x += block.userData.rotationSpeedX;
				block.rotation.y += block.userData.rotationSpeedY;
				block.position.y = block.userData.originalY + Math.sin(time * block.userData.floatSpeed * 100 + block.userData.floatOffset) * 2;
			});

			// Rotate particles slowly
			particles.rotation.y += 0.0005;
			particles.rotation.x += 0.0002;

			// Move grid
			gridHelper.position.z = (time * 2) % 2 - 15;

			renderer.render(scene, camera);
		};

		animate();

		// Cleanup
		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('resize', onResize);
			cancelAnimationFrame(animationId);
			renderer.dispose();
			container.removeChild(renderer.domElement);
		};
	});
</script>

<div bind:this={container} class="fixed inset-0 -z-10"></div>

<style>
	canvas {
		display: block;
	}
</style>
