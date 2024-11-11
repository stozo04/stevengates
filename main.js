// Import Three.js components
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Initial mode settings
let darkMode = true;
renderer.setClearColor(0x000000);

// Adjust camera position
camera.position.z = 10;

// Generate distinct colors using golden ratio
function generateDistinctColors(count) {
    const colors = [];
    const goldenRatio = 0.618033988749895;
    let hue = Math.random();

    for (let i = 0; i < count; i++) {
        hue = (hue + goldenRatio) % 1;
        colors.push({
            hue,
            saturation: 70,
            lightness: 65
        });
    }

    for (let i = colors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
    }

    return colors;
}

// Create particle systems
function createParticleSystems() {
    // Stars for dark mode
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

    // Confetti for light mode
    const confetti = new THREE.Group();
    const confettiColors = [
        0xFF69B4, 0x87CEEB, 0x98FB98, 0xDDA0DD, 0xF0E68C,
        0xFF8C00, 0x00FA9A, 0xFF1493, 0x00BFFF, 0xFFDAB9
    ];
    
    for (let i = 0; i < 400; i++) {
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
        confettiPiece.position.set(
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 30,
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

    confetti.visible = false;
    scene.add(stars);
    scene.add(confetti);
    
    return { stars, confetti };
}

// Create particles
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

// Create ground plane
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1.5;
plane.receiveShadow = true;
scene.add(plane);

// Cube titles and content configuration
const cubeContent = {
    "Projects": {
        title: "My Projects",
        content: "Here are some of my featured projects...",
        link: "#projects"
    },
    "Skills": {
        title: "Technical Skills",
        content: "My technical expertise includes...",
        link: "#skills"
    },
    "Portfolio": {
        title: "Portfolio",
        content: "Check out my work...",
        link: "#portfolio"
    },
    "Blog": {
        title: "Blog Posts",
        content: "Latest thoughts and tutorials...",
        link: "#blog"
    },
    "About Me": {
        title: "About Me",
        content: "Let me introduce myself...",
        link: "#about"
    },
    "Testimonials": {
        title: "Testimonials",
        content: "What others say about my work...",
        link: "#testimonials"
    },
    "Contact": {
        title: "Get in Touch",
        content: "Let's connect...",
        link: "#contact"
    },
    "Resume": {
        title: "My Resume",
        content: "Professional experience and education...",
        link: "#resume"
    },
    "Fun Facts": {
        title: "Fun Facts",
        content: "Some interesting things about me...",
        link: "#facts"
    }
};

// Create texture with distinct colors
function createTextTexture(text, colorIndex, distinctColors) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');

    const color = distinctColors[colorIndex];
    context.fillStyle = `hsl(${color.hue * 360}, ${color.saturation}%, ${color.lightness}%)`;
    context.fillRect(0, 0, canvas.width, canvas.height);

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

// Create modal for cube content
function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${content.title}</h2>
            <div class="modal-body">${content.content}</div>
            <a href="${content.link}" class="modal-link">Learn More</a>
            <button class="close-modal">Close</button>
        </div>
    `;

    modal.querySelector('.close-modal').onclick = () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    };

    document.body.appendChild(modal);
    setTimeout(() => modal.style.opacity = '1', 10);
}

// Create cubes
const cubeSize = 2;
const cubeSpacing = 2.5;
const cubes = [];
const distinctColors = generateDistinctColors(9); // 9 cubes

let titleIndex = 0;
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const title = Object.keys(cubeContent)[titleIndex];
        const textTexture = createTextTexture(title, titleIndex, distinctColors);

        const material = new THREE.MeshStandardMaterial({
            map: textTexture,
            color: 0xffffff,
            roughness: 0.5,
            metalness: 0.1,
            emissive: new THREE.Color(0x222222)
        });

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(x * cubeSpacing, y * cubeSpacing, 0);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.userData = {
            title: title,
            content: cubeContent[title],
            originalPosition: cube.position.clone(),
            originalRotation: cube.rotation.clone()
        };
        
        cubes.push(cube);
        scene.add(cube);
        titleIndex++;
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Animate stars
    if (particles.stars.visible) {
        particles.stars.children.forEach((star) => {
            star.position.x -= star.userData.speed;
            if (star.position.x < -15) {
                star.position.x = 15;
                star.position.y = (Math.random() - 0.5) * 20;
            }
        });
    }

    // Animate confetti
    if (particles.confetti.visible) {
        particles.confetti.children.forEach((confetti) => {
            confetti.position.x -= confetti.userData.horizontalSpeed;
            confetti.position.y -= confetti.userData.fallSpeed;
            
            confetti.rotation.x += confetti.userData.rotationSpeed.x;
            confetti.rotation.y += confetti.userData.rotationSpeed.y;
            confetti.rotation.z += confetti.userData.rotationSpeed.z;
            
            if (confetti.position.y < -15) {
                confetti.position.x = (Math.random() - 0.5) * 40;
                confetti.position.y = 15;
                
                confetti.userData.rotationSpeed.x = (Math.random() - 0.5) * 0.05;
                confetti.userData.rotationSpeed.y = (Math.random() - 0.5) * 0.05;
                confetti.userData.rotationSpeed.z = (Math.random() - 0.5) * 0.05;
            }
        });
    }

    // Cube interactions
    if (rotatingCube) {
        rotatingCube.rotation.x += 0.05;
        rotatingCube.rotation.y += 0.05;
    }

    // Subtle camera movement
    const time = Date.now() * 0.0005;
    camera.position.x = Math.sin(time) * 0.5;
    camera.position.y = Math.cos(time) * 0.5;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let rotatingCube = null;

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubes);
    
    if (intersects.length > 0) {
        const intersectedCube = intersects[0].object;
        if (rotatingCube !== intersectedCube) {
            rotatingCube = intersectedCube;
        }
    } else {
        rotatingCube = null;
    }
}

// Click handler
function onClick(event) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubes);
    
    if (intersects.length > 0) {
        const cube = intersects[0].object;
        createModal(cube.userData.content);
    }
}

// Toggle dark/light mode
function toggleMode() {
    darkMode = !darkMode;

    if (darkMode) {
        renderer.setClearColor(0x000000);
        ambientLight.intensity = 0.4;
        directionalLight.intensity = 0.8;
        particles.stars.visible = true;
        particles.confetti.visible = false;
        
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
        particles.stars.visible = false;
        particles.confetti.visible = true;
        
        planeMaterial.opacity = 0.3;
        planeMaterial.color = new THREE.Color(0x000000);
        document.body.style.backgroundColor = '#fff';
        toggleButton.style.backgroundColor = '#000';
        toggleButton.style.color = '#fff';
        toggleButton.textContent = "Dark Mode";
    }
}

// Event listeners
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('click', onClick);
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add modal styles
const styles = document.createElement('style');
styles.textContent = `
    .portfolio-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .modal-content {
        background: rgba(255, 255, 255, 0.95);
        padding: 2rem;
        border-radius: 15px;
        max-width: 80%;
        max-height: 80%;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }
    
    .dark-mode .modal-content {
        background: rgba(30, 30, 30, 0.95);
        color: white;
    }

    .modal-content h2 {
        margin-bottom: 1rem;
        color: #333;
        font-size: 1.8rem;
    }

    .dark-mode .modal-content h2 {
        color: #fff;
    }

    .modal-body {
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }

    .modal-link {
        display: inline-block;
        padding: 0.5rem 1rem;
        background: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        margin-right: 1rem;
        transition: background 0.3s ease;
    }

    .modal-link:hover {
        background: #0056b3;
    }

    .close-modal {
        padding: 0.5rem 1rem;
        background: #6c757d;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s ease;
    }

    .close-modal:hover {
        background: #5a6268;
    }

    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        transition: opacity 0.5s ease;
    }

    .loading-text {
        color: white;
        font-size: 2rem;
        letter-spacing: 0.2em;
    }

    #toggleButton {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    #toggleButton:hover {
        transform: scale(1.05);
    }
`;
document.head.appendChild(styles);

// Create loading screen
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading-screen';
loadingScreen.innerHTML = '<div class="loading-text">Loading...</div>';
document.body.appendChild(loadingScreen);

// Remove loading screen when everything is ready
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1000);
});

// Create mode toggle button if it doesn't exist
if (!document.getElementById('toggleButton')) {
    const toggleButton = document.createElement('button');
    toggleButton.id = 'toggleButton';
    toggleButton.textContent = 'Light Mode';
    toggleButton.style.backgroundColor = '#fff';
    toggleButton.style.color = '#000';
    document.body.appendChild(toggleButton);
    toggleButton.addEventListener('click', toggleMode);
}

// Initialize colors on page load
window.addEventListener('DOMContentLoaded', () => {
    darkMode = false;
    toggleMode();
});

// Start the animation loop
animate();

// Optional: Add keyboard controls
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'Escape':
            const modal = document.querySelector('.portfolio-modal');
            if (modal) modal.remove();
            break;
        case ' ':
            toggleMode();
            break;
    }
});

// Optional: Add touch support for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchmove', (event) => {
    if (!touchStartX || !touchStartY) return;

    const touchEndX = event.touches[0].clientX;
    const touchEndY = event.touches[0].clientY;

    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;

    // Convert touch to mouse position for raycaster
    const touch = event.touches[0];
    mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

    // Update camera position based on touch movement
    camera.position.x += deltaX * 0.01;
    camera.position.y -= deltaY * 0.01;
    camera.lookAt(scene.position);

    touchStartX = touchEndX;
    touchStartY = touchEndY;
});

document.addEventListener('touchend', () => {
    touchStartX = 0;
    touchStartY = 0;
});