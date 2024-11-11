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

// Create both particle systems but hide one initially
function createParticleSystems() {
    // Stars for dark mode (keeping the same)
    const stars = new THREE.Group();
    const starGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const starMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.6
    });

    for (let i = 0; i < 200; i++) {
        const star = new THREE.Mesh(starGeometry, starMaterial);
        star.position.set(
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 20,
            -5
        );
        star.userData = {
            speed: Math.random() * 0.03 + 0.02
        };
        stars.add(star);
    }

    // Enhanced confetti for light mode
    const confetti = new THREE.Group();
    const confettiColors = [
        0xFF69B4, // Pink
        0x87CEEB, // Sky Blue
        0x98FB98, // Light Green
        0xDDA0DD, // Plum
        0xF0E68C, // Khaki
        0xFF8C00, // Dark Orange
        0x00FA9A, // Medium Spring Green
        0xFF1493, // Deep Pink
        0x00BFFF, // Deep Sky Blue
        0xFFDAB9  // Peach
    ];
    
    const confettiCount = 400;
    
    for (let i = 0; i < confettiCount; i++) {
        let confettiGeometry;
        const shapeType = Math.random();
        
        if (shapeType < 0.33) {
            confettiGeometry = new THREE.PlaneGeometry(0.1, 0.15);
        } else if (shapeType < 0.66) {
            confettiGeometry = new THREE.PlaneGeometry(0.1, 0.1);
        } else {
            confettiGeometry = new THREE.CircleGeometry(0.05, 8);
        }

        const confettiMaterial = new THREE.MeshBasicMaterial({
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            transparent: true,
            opacity: 0.8 + Math.random() * 0.2,
            side: THREE.DoubleSide
        });

        const confettiPiece = new THREE.Mesh(confettiGeometry, confettiMaterial);
        
        // Initially distribute confetti across the entire visible area
        confettiPiece.position.set(
            (Math.random() - 0.5) * 40,  // Full width
            (Math.random() - 0.5) * 30,  // Full height
            -5 + (Math.random() - 0.5) * 2
        );
        
        confettiPiece.rotation.set(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
        );
        
        confettiPiece.userData = {
            horizontalSpeed: Math.random() * 0.02 + 0.01,
            fallSpeed: Math.random() * 0.04 + 0.02,
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.05,
                y: (Math.random() - 0.5) * 0.05,
                z: (Math.random() - 0.5) * 0.05
            }
        };
        
        confetti.add(confettiPiece);
    }

    // Initially show stars (dark mode) and hide confetti
    confetti.visible = false;
    
    scene.add(stars);
    scene.add(confetti);
    
    return { stars, confetti };
}

// THEN Create particles immediately
const particles = createParticleSystems();

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

// Titles for each cube position in the grid
const titles = [
    "Projects", "Skills", "Portfolio",
    "Blog", "About Me", "Testimonials",
    "Contact", "Resume", "Fun Facts"
];

// Add this helper function before creating the cubes
function generateDistinctColors(count) {
    const colors = [];
    const goldenRatio = 0.618033988749895;
    let hue = Math.random();

    // Generate distinct colors using the golden ratio method
    for (let i = 0; i < count; i++) {
        hue = (hue + goldenRatio) % 1;
        colors.push({
            hue,
            saturation: 70,
            lightness: 65
        });
    }

    // Shuffle the colors
    for (let i = colors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
    }

    return colors;
}

// Helper function to create a texture with text, adjusting font size based on text length
function createTextTexture(text, colorIndex, distinctColors) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');

    // Use the pre-generated distinct color
    const color = distinctColors[colorIndex];
    context.fillStyle = `hsl(${color.hue * 360}, ${color.saturation}%, ${color.lightness}%)`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Rest of your text rendering code remains the same
    let fontSize = 48;
    if (text.length > 7) fontSize = 40;
    context.font = `bold ${fontSize}px Arial`;
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    context.shadowColor = 'white';
    context.shadowBlur = 4;
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    return new THREE.CanvasTexture(canvas);
}



// Updated cube size and spacing
const cubeSize = 2;
const cubeSpacing = 2.5;
const cubes = [];
// Generate distinct colors first
const distinctColors = generateDistinctColors(titles.length);

// Create the grid of cubes and assign titles
let titleIndex = 0;
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

        // Create a texture with the corresponding title
        const textTexture = createTextTexture(titles[titleIndex], titleIndex, distinctColors);
        titleIndex++;

        // Apply the texture to the cube with enhanced material properties
        const material = new THREE.MeshStandardMaterial({
            map: textTexture,
            color: 0xffffff, // Use white as base color to not tint the texture
            roughness: 0.5,
            metalness: 0.1,
            emissive: new THREE.Color(0x222222) // Add slight emission for better visibility
        });

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(x * cubeSpacing, y * cubeSpacing, 0);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cubes.push(cube);
        scene.add(cube);
    }
}

// Initialize colors immediately after page load
window.addEventListener('DOMContentLoaded', () => {
    // Force one toggle cycle to ensure proper color initialization
    darkMode = false; // Temporarily set to false
    toggleMode();     // Toggle to dark mode with proper colors
});

// Rotation flag
let rotatingCube = null;

// Raycaster for detecting clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function animate() {
    requestAnimationFrame(animate);

    // Animate stars (keeping the same)
    if (particles.stars.visible) {
        particles.stars.children.forEach((star) => {
            star.position.x -= star.userData.speed;
            if (star.position.x < -15) {
                star.position.x = 15;
                star.position.y = (Math.random() - 0.5) * 20;
            }
        });
    }

    // Natural confetti animation
    if (particles.confetti.visible) {
        particles.confetti.children.forEach((confetti) => {
            confetti.position.x -= confetti.userData.horizontalSpeed;
            confetti.position.y -= confetti.userData.fallSpeed;
            
            confetti.rotation.x += confetti.userData.rotationSpeed.x;
            confetti.rotation.y += confetti.userData.rotationSpeed.y;
            confetti.rotation.z += confetti.userData.rotationSpeed.z;
            
            // Reset position when out of view, maintain continuous flow
            if (confetti.position.y < -15) {
                confetti.position.x = (Math.random() - 0.5) * 40;
                confetti.position.y = 15;  // Reset to just above the visible area
                
                // Randomize rotation speeds when resetting
                confetti.userData.rotationSpeed.x = (Math.random() - 0.5) * 0.05;
                confetti.userData.rotationSpeed.y = (Math.random() - 0.5) * 0.05;
                confetti.userData.rotationSpeed.z = (Math.random() - 0.5) * 0.05;
            }
        });
    }

    // Your existing cube rotation code
    if (rotatingCube) {
        rotatingCube.rotation.x += 0.05;
        rotatingCube.rotation.y += 0.05;
    }

    renderer.render(scene, camera);
}

// Handle mouse move events
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Check for intersections with cubes
    const intersects = raycaster.intersectObjects(cubes);
    if (intersects.length > 0) {
        // If the currently intersected cube is different from the rotatingCube, set it to rotate
        if (rotatingCube !== intersects[0].object) {
            rotatingCube = intersects[0].object;
        }
    } else {
        // No cubes are intersected, stop rotating
        rotatingCube = null;
    }
}


// Dark/Light mode toggle function
function toggleMode() {
    darkMode = !darkMode;

    if (darkMode) {
        renderer.setClearColor(0x000000);
        ambientLight.intensity = 0.4;
        directionalLight.intensity = 0.8;

        // Show stars, hide confetti
        particles.stars.visible = true;
        particles.confetti.visible = false;

        // Your existing dark mode code...
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

        // Hide stars, show confetti
        particles.stars.visible = false;
        particles.confetti.visible = true;

        // Your existing light mode code...
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
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Button click event listener for toggling mode
const toggleButton = document.getElementById('toggleButton');
toggleButton.addEventListener('click', toggleMode);

window.addEventListener('mousemove', onMouseMove);
let hoveredCube = null;

// Start the animation loop
animate();

