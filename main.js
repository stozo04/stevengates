// Import Three.js components
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Initial mode settings
let darkMode = true;
renderer.setClearColor(0x000000); // Start with a black background

// Adjust camera position
camera.position.z = 10;

// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

// Create the ground plane to receive shadows
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1.5;
plane.receiveShadow = true;
scene.add(plane);

// Create a canvas texture with "About Me" text
const canvas = document.createElement('canvas');
canvas.width = 256;
canvas.height = 256;
const context = canvas.getContext('2d');

// Draw text on the canvas
context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height); // Background color
context.font = '48px Arial';
context.fillStyle = 'black';
context.textAlign = 'center';
context.textBaseline = 'middle';
context.fillText('About Me', canvas.width / 2, canvas.height / 2);

const textTexture = new THREE.CanvasTexture(canvas);

// Updated cube size and spacing
const cubeSize = 1.5; // Larger cube size
const cubeSpacing = 2.0; // Spacing between cubes to maintain the same gap
const cubes = [];

// Create the grid of cubes with the center cube showing "About Me"
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

        // Check for the center cube (where "About Me" text should appear)
        let material;
        if (x === 0 && y === 0) {
            // Apply text texture to the center cube
            material = new THREE.MeshStandardMaterial({
                map: textTexture,
                roughness: 0.5,
                metalness: 0.1
            });
        } else {
            // Random color for other cubes
            material = new THREE.MeshStandardMaterial({
                color: Math.random() * 0xffffff,
                roughness: 0.5,
                metalness: 0.1
            });
        }

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(x * cubeSpacing, y * cubeSpacing, 0); // Use cubeSpacing to maintain gap
        cube.castShadow = true;
        cube.receiveShadow = true;
        cubes.push(cube);
        scene.add(cube);
    }
}

// Rotation flag
let rotatingCube = null;

// Raycaster for detecting clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    // Rotate the selected cube if one is active
    if (rotatingCube) {
        rotatingCube.rotation.x += 0.05;
        rotatingCube.rotation.y += 0.05;
    }
}

// Handle mouse click events
function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(cubes);
    if (intersects.length > 0) {
        if (rotatingCube === intersects[0].object) {
            rotatingCube = null;
        } else {
            rotatingCube = intersects[0].object;
        }
    }
}

// Dark/Light mode toggle function
function toggleMode() {
    darkMode = !darkMode;

    if (darkMode) {
        renderer.setClearColor(0x000000);
        ambientLight.intensity = 0.4;
        directionalLight.intensity = 0.8;

        cubes.forEach(cube => {
            if (!cube.material.map) {
                const vibrantColor = Math.random() * 0x7fffff + 0x808080;
                cube.material.color.setHex(vibrantColor);
            }
        });

        planeMaterial.opacity = 0.2;
        planeMaterial.color = new THREE.Color(0x333366);

        document.body.style.backgroundColor = '#000';
        toggleButton.style.backgroundColor = '#fff';
        toggleButton.style.color = '#000';
        toggleButton.textContent = "Light Mode";
    } else {
        renderer.setClearColor(0xffffff);
        ambientLight.intensity = 0.6;
        directionalLight.intensity = 0.9;

        cubes.forEach(cube => {
            if (!cube.material.map) {
                const darkColor = Math.random() * 0x444444 + 0x222222;
                cube.material.color.setHex(darkColor);
            }
        });

        planeMaterial.opacity = 0.3;
        planeMaterial.color = new THREE.Color(0x000000);

        document.body.style.backgroundColor = '#fff';
        toggleButton.style.backgroundColor = '#000';
        toggleButton.style.color = '#fff';
        toggleButton.textContent = "Dark Mode";
    }
}

// Event listeners for clicks and window resize
window.addEventListener('click', onClick);
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Button click event listener for toggling mode
const toggleButton = document.getElementById('toggleButton');
toggleButton.addEventListener('click', toggleMode);

// Start the animation loop
animate();
