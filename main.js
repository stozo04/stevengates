// Import Three.js components
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
document.body.appendChild(renderer.domElement);

// Initial mode settings
let darkMode = true;
renderer.setClearColor(0x000000);

// Adjust camera position
camera.position.z = 10;

// Mouse interaction variables
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let rotatingCube = null;

// Drag interaction variables
let isDragging = false;
let selectedCube = null;
let dragStartPosition = new THREE.Vector3();
let dragPlane = new THREE.Plane();
let dragOffset = new THREE.Vector3();

// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight1.position.set(5, 5, 5);
directionalLight1.castShadow = false;
directionalLight1.shadow.mapSize.width = 2048;
directionalLight1.shadow.mapSize.height = 2048;
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0x00ffff, 0.5);
directionalLight2.position.set(-5, -5, -5);
scene.add(directionalLight2);

const pointLight1 = new THREE.PointLight(0xff00ff, 0.5, 20);
pointLight1.position.set(0, 5, 5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x00ff00, 0.5, 20);
pointLight2.position.set(5, 0, 5);
scene.add(pointLight2);

// Create ground plane
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.ShadowMaterial({ 
    opacity: 0.3,
    transparent: true 
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1.5;
plane.receiveShadow = true;
scene.add(plane);

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

// Create particle systems with modern effects
function createParticleSystems() {
    // Stars for dark mode
    const stars = new THREE.Group();
    const starGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const starMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    });

    // Increased vertical range for stars (-20 to 20 instead of -20 to 20)
    for (let i = 0; i < 200; i++) {
        const star = new THREE.Mesh(starGeometry, starMaterial);
        star.position.set(
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 40, // Increased vertical range
            -5
        );
        star.scale.setScalar(Math.random() * 0.5 + 0.5);
        star.userData = {
            speed: Math.random() * 0.03 + 0.02,
            pulseSpeed: Math.random() * 0.02 + 0.01,
            pulseOffset: Math.random() * Math.PI * 2
        };
        stars.add(star);
    }

    // Modern confetti for light mode
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

        const confettiMaterial = new THREE.MeshPhysicalMaterial({
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            transparent: true,
            opacity: 0.8 + Math.random() * 0.2,
            side: THREE.DoubleSide,
            metalness: 0.2,
            roughness: 0.3,
            clearcoat: 0.4
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

// Cube content configuration
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

// Create modern texture with gradient
function createTextTexture(text, colorIndex, distinctColors) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');

    // Create gradient background
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    const color = distinctColors[colorIndex];
    const hslColor = `hsl(${color.hue * 360}, ${color.saturation}%, ${color.lightness}%)`;
    const endHue = ((color.hue * 360 + 30) % 360);
    const endColor = `hsl(${endHue}, ${Math.min(color.saturation + 10, 100)}%, ${Math.max(color.lightness - 10, 0)}%)`;
    
    gradient.addColorStop(0, hslColor);
    gradient.addColorStop(1, endColor);
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle pattern
    context.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        context.fillRect(x, y, 2, 2);
    }

    // Modern text styling
    let fontSize = 64;
    if (text.length > 7) fontSize = 52;
    context.font = `900 ${fontSize}px Inter, system-ui, -apple-system, sans-serif`; // Made font weight heavier
    context.fillStyle = 'rgba(255, 255, 255, 1)'; // Made text fully opaque
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
     // Stronger text shadow for better contrast
     context.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Increased shadow opacity
     context.shadowBlur = 20;                     // Increased blur
     context.shadowOffsetX = 3;                   // Increased offset
     context.shadowOffsetY = 3;
    
   // Draw text twice for stronger effect
   context.fillText(text, canvas.width / 2, canvas.height / 2);
   context.shadowBlur = 0;  // Remove shadow for second pass
   context.fillText(text, canvas.width / 2, canvas.height / 2); // Draw text again

    return new THREE.CanvasTexture(canvas);
}

// Create modern cube material
function createCubeMaterial(textTexture) {
    return new THREE.MeshPhysicalMaterial({
        map: textTexture,
        metalness: 0.8,
        roughness: 0.3,
        clearcoat: 0.8,
        clearcoatRoughness: 0.8,
        reflectivity: 0.5,
        envMapIntensity: 0.8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1.0        // Changed from 0.98 to 1.0 for full opacity
    });
}

// Create cubes
const cubeSize = 2;
const cubeSpacing = 4;
const cubes = [];
const distinctColors = generateDistinctColors(9);

let titleIndex = 0;
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize, 2, 2, 2);
        const title = Object.keys(cubeContent)[titleIndex];
        const textTexture = createTextTexture(title, titleIndex, distinctColors);
        const material = createCubeMaterial(textTexture);

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(x * cubeSpacing, y * cubeSpacing, 0);
        cube.castShadow = false;
        cube.receiveShadow = false;

        cube.userData = {
            title: title,
            content: cubeContent[title],
            originalPosition: cube.position.clone(),
            originalRotation: cube.rotation.clone(),
            floatOffset: Math.random() * Math.PI * 2,
            floatSpeed: 0.001 + Math.random() * 0.001
        };
        
        cubes.push(cube);
        scene.add(cube);
        titleIndex++;
    }
}

// Drag functionality
function getIntersectionPoint(event) {
    const intersectionPoint = new THREE.Vector3();
    const mousePosition = new THREE.Vector2();
    
    mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mousePosition, camera);
    raycaster.ray.intersectPlane(dragPlane, intersectionPoint);
    
    return intersectionPoint;
}

function startDrag(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubes);
    
    if (intersects.length > 0) {
        isDragging = true;
        selectedCube = intersects[0].object;
        
        dragPlane.setFromNormalAndCoplanarPoint(
            camera.getWorldDirection(dragPlane.normal),
            selectedCube.position
        );
        
        const intersectionPoint = getIntersectionPoint(event);
        dragOffset.copy(selectedCube.position).sub(intersectionPoint);
        dragStartPosition.copy(selectedCube.position);
        
        document.body.style.cursor = 'grabbing';
    }
}

function updateDrag(event) {
    if (!isDragging || !selectedCube) return;

    const intersectionPoint = getIntersectionPoint(event);
    selectedCube.position.copy(intersectionPoint.add(dragOffset));
    
    selectedCube.position.clamp(
        new THREE.Vector3(-10, -10, -5),
        new THREE.Vector3(10, 10, 5)
    );
}

function endDrag() {
    if (isDragging && selectedCube) {
        const distance = selectedCube.position.distanceTo(dragStartPosition);
        if (distance > 15) {
            gsap.to(selectedCube.position, {
                x: dragStartPosition.x,
                y: dragStartPosition.y,
                z: dragStartPosition.z,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
        }
        
        document.body.style.cursor = 'default';
    }
    
    isDragging = false;
    selectedCube = null;
}

// Event listeners
window.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', (event) => {
    updateDrag(event);
    
    if (!isDragging) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(cubes);
        
        if (intersects.length > 0) {
            const intersectedCube = intersects[0].object;
            if (rotatingCube !== intersectedCube) {
                rotatingCube = intersectedCube;
                document.body.style.cursor = 'grab';
            }
        } else {
            rotatingCube = null;
            document.body.style.cursor = 'default';
        }
    }
});
window.addEventListener('mouseup', endDrag);

// Touch support
document.addEventListener('touchstart', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    startDrag({
        clientX: touch.clientX,
        clientY: touch.clientY
    });
});

document.addEventListener('touchmove', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    updateDrag({
        clientX: touch.clientX,
        clientY: touch.clientY
    });
});

document.addEventListener('touchend', (event) => {
    event.preventDefault();
    endDrag();
});

// Modal handling
function createModal(content) {
    const modal = document.getElementById('portfolioModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalLink = document.getElementById('modalLink');

    modalTitle.textContent = content.title;
    modalBody.textContent = content.content;
    modalLink.href = content.link;
    
    modal.classList.add('active');

    const closeButton = modal.querySelector('.close-modal');
    closeButton.onclick = () => {
        modal.classList.remove('active');
    };

    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    };
}

// Click handler
function onClick(event) {
    if (!isDragging) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(cubes);
        
        if (intersects.length > 0) {
            const cube = intersects[0].object;
            createModal(cube.userData.content);
        }
    }
}

// Toggle dark/light mode
function toggleMode() {
    darkMode = !darkMode;

    if (darkMode) {
        renderer.setClearColor(0x000000);
        ambientLight.intensity = 0.5;
        directionalLight1.intensity = 0.8;
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
        ambientLight.intensity = 0.7;
        directionalLight1.intensity = 0.9;
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

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Animate stars with pulsing effect
    if (particles.stars.visible) {
        particles.stars.children.forEach((star) => {
            star.position.x -= star.userData.speed;
            
            // Reset star position when it goes out of bounds
            if (star.position.x < -15) {
                star.position.x = 15;
                star.position.y = (Math.random() - 0.5) * 40; // Match the creation range
            }

            // Add vertical movement
            star.position.y -= star.userData.speed * 0.5; // Gentle downward drift
            
            // Reset if star goes below the view
            if (star.position.y < -20) {
                star.position.y = 20;
                star.position.x = (Math.random() - 0.5) * 30;
            }
            
            // Add pulsing effect
            const pulse = Math.sin(Date.now() * star.userData.pulseSpeed + star.userData.pulseOffset) * 0.2 + 0.8;
            star.scale.setScalar(pulse);
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

    // Animate cubes
    cubes.forEach(cube => {
        if (!isDragging || cube !== selectedCube) {
            // Floating animation
            const time = Date.now() * cube.userData.floatSpeed;
            cube.position.y = cube.userData.originalPosition.y + 
                Math.sin(time + cube.userData.floatOffset) * 0.1;
            
            // Subtle rotation when hovering
            if (cube === rotatingCube) {
                cube.rotation.x += 0.02;
                cube.rotation.y += 0.02;
            }
        }
    });

    // Update drag plane
    if (isDragging && selectedCube) {
        dragPlane.setFromNormalAndCoplanarPoint(
            camera.getWorldDirection(dragPlane.normal),
            selectedCube.position
        );
    }

    // Camera movement
    const time = Date.now() * 0.0005;
    camera.position.x = Math.sin(time) * 0.3; // Reduced from 0.5 to 0.3
    camera.position.y = 2 + Math.cos(time) * 0.3; // Keep base Y position at 2
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // Look at center of scene

    renderer.render(scene, camera);
}

// Initialize
const toggleButton = document.getElementById('toggleButton');
toggleButton.textContent = darkMode ? 'Light Mode' : 'Dark Mode';
toggleButton.addEventListener('click', toggleMode);

window.addEventListener('click', onClick);
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'Escape':
            const modal = document.getElementById('portfolioModal');
            modal.classList.remove('active');
            break;
        case ' ':
            toggleMode();
            break;
    }
});

// Start animation
animate();