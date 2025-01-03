'use client';

import { ResumeModal, SocialModal } from '@/components/ui/modals';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Button } from "@/components/ui/button";
import { useTheme } from 'next-themes';
import { ModeToggle } from '@/components/mode-toggle/page';

interface PortfolioItem {
  title: string;
  content: string;
  link: string;
}

const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const portfolioContent: Record<string, PortfolioItem> = {
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
  "Blogs": {
    title: "Blog Posts",
    content: "Latest thoughts and tutorials...",
    link: "#blog"
  },
  "About": {
    title: "About Me",
    content: "Let me introduce myself...",
    link: "#about"
  },
  "Resume": {
    title: "My Resume",
    content: "Coming Soon...",
    link: "#resume"
  },
  "Social": {
    title: "Social Media",
    content: "Connect with me online...",
    link: "#social"
  }
};

const createParticleSystems = (THREE: any) => {
  // Stars for dark mode
  const stars = new THREE.Group();
  const starGeometry = new THREE.SphereGeometry(0.03, 8, 8);
  const starMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.8
  });

  for (let i = 0; i < 300; i++) {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 40,
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

    const confettiMaterial = new THREE.MeshPhysicalMaterial({
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      transparent: true,
      opacity: 0.8,
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

  return { stars, confetti };
};

// Generate distinct colors using golden ratio
const generateDistinctColors = (count: number) => {
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

const createTextTexture = (text: string, colorIndex: number, distinctColors: any) => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext('2d')!;

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
  console.log('complete')
  return new THREE.CanvasTexture(canvas);
};

const createCubeMaterial = (textTexture: THREE.Texture) => {
  return new THREE.MeshPhysicalMaterial({
    map: textTexture,

    // Reduced metalness to make it less reflective and show the texture better
    metalness: 0.3,

    // Reduced roughness to make it shinier
    roughness: 0.2,

    // Increased clearcoat for more shine
    clearcoat: 1.0,

    // Reduced clearcoat roughness for more glossiness
    clearcoatRoughness: 0.1,

    // Increased reflectivity
    reflectivity: 0.8,

    // Increased environment map intensity
    envMapIntensity: 1.2,

    side: THREE.FrontSide,
    transparent: false,
  });
}

const PortfolioScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme(); // Use theme context
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const sceneRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const cubesRef = useRef<any[]>([]);
  const particlesRef = useRef<any>(null);
  const animationFrameRef = useRef<number>();
  const router = useRouter();

  useEffect(() => {
    if (!containerRef.current || !THREE) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    // Initial Dark Mode
    containerRef.current.appendChild(renderer.domElement);
    renderer.setClearColor(resolvedTheme ? 0x000000 : 0xffffff, 1);

    // Adjust camera position
    camera.position.z = 10;

    // Mouse interaction variables
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Lighting
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

    // Create particles
    const particles = createParticleSystems(THREE);
    scene.add(particles.stars);
    scene.add(particles.confetti);
    particles.stars.visible = resolvedTheme;
    particles.confetti.visible = !resolvedTheme;
    particlesRef.current = particles;

    // Create cubes
    const cubeSize = 2;
    const cubeSpacing = 4;
    const cubes: any[] = [];
    const distinctColors = generateDistinctColors(9);

    const items = Object.keys(portfolioContent);
    const cols = 3;
    const rows = Math.ceil(items.length / cols);
    const totalWidth = (cols - 1) * cubeSpacing;
    const totalHeight = (rows - 1) * cubeSpacing;

    items.forEach((title, index) => {
      const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize, 2, 2, 2);
      const textTexture = createTextTexture(title, index, distinctColors);
      const material = createCubeMaterial(textTexture);

      const cube = new THREE.Mesh(geometry, material);

      // Calculate grid position
      const col = index % cols;
      const row = Math.floor(index / cols);

      // Center the grid
      const x = (col * cubeSpacing) - (totalWidth / 2);
      const y = -(row * cubeSpacing) + (totalHeight / 2);

      cube.position.set(x, y, 0);
      cube.userData = {
        title,
        originalY: y,
        bounceOffset: Math.random() * Math.PI * 2,
        bounceSpeed: 0.002 + Math.random() * 0.001,
        targetScale: 1.0
      };
      cubes.push(cube);
      scene.add(cube);
    });

    // Store refs
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    cubesRef.current = cubes;

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubes);

      // Reset all cubes first
      cubes.forEach(cube => {
        cube.scale.setScalar(1.0);
      });

      if (intersects.length > 0) {
        const cube = intersects[0].object;
        // Scale up the hovered cube
        cube.scale.setScalar(1.2);
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'default';
      }
    };

    const onClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubes);
      const acceptedLink = ["About", "Projects", "Blogs", "Skills"];

      if (intersects.length > 0) {
        const cube = intersects[0].object;
        const selectedTitle = cube.userData.title;
        console.log('title ', selectedTitle)
        if (acceptedLink.includes(selectedTitle)) {
          router.push(`/${slugify(selectedTitle)}`)
        } else {
          setActiveItem(selectedTitle);
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    // Animation
    const animate = () => {
      // Animate particles
      if (particles.stars.visible) {
        particles.stars.children.forEach((star: any) => {
          star.position.x -= star.userData.speed;
          if (star.position.x < -25) {
            star.position.x = 25;
            star.position.y = (Math.random() - 0.5) * 40;
          }
          const pulse = Math.sin(Date.now() * star.userData.pulseSpeed + star.userData.pulseOffset) * 0.2 + 0.8;
          star.scale.setScalar(pulse);
        });
      }

      if (particles.confetti.visible) {
        particles.confetti.children.forEach((confetti: any) => {
          confetti.position.x -= confetti.userData.horizontalSpeed;
          confetti.position.y -= confetti.userData.fallSpeed;
          confetti.rotation.x += confetti.userData.rotationSpeed.x;
          confetti.rotation.y += confetti.userData.rotationSpeed.y;
          confetti.rotation.z += confetti.userData.rotationSpeed.z;

          if (confetti.position.y < -15) {
            confetti.position.x = (Math.random() - 0.5) * 40;
            confetti.position.y = 15;
          }
        });
      }

      // Animate bouncing effect to all cubes continuously
      cubes.forEach((cube: any) => {
        // Just do the bouncing animation for all cubes
        const time = Date.now() * cube.userData.bounceSpeed;
        const bounce = Math.sin(time + cube.userData.bounceOffset) * 0.1;
        cube.position.y = cube.userData.originalY + bounce;
      });
      renderer.setClearColor(resolvedTheme ? 0x000000 : 0xffffff, 1);
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);

      cubes.forEach(cube => {
        cube.geometry.dispose();
        cube.material.dispose();
        if (cube.material.map) {
          cube.material.map.dispose();
        }
      });

      particles.stars.children.forEach((star: any) => {
        star.geometry.dispose();
        star.material.dispose();
      });

      particles.confetti.children.forEach((confetti: any) => {
        confetti.geometry.dispose();
        confetti.material.dispose();
      });

      renderer.dispose();
    };
  }, [resolvedTheme]);

  // Update particle visibility when dark mode changes
  useEffect(() => {
    if (particlesRef.current) {
      particlesRef.current.stars.visible = resolvedTheme === 'dark';
      particlesRef.current.confetti.visible = resolvedTheme !== 'dark';
    }
  }, [resolvedTheme]);

  return (
    <div className="relative w-full h-screen">
      <div ref={containerRef} className="absolute inset-0" />
      <div className="fixed top-4 right-4 z-10">
      <ModeToggle />
  
      </div>

      {activeItem && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setActiveItem(null)}
        >
          {activeItem === 'Social' ? (
            <SocialModal
            darkMode={resolvedTheme ?? "light"}
              onClose={() => setActiveItem(null)}
            />
          ) : activeItem === 'Resume' ? (
            <ResumeModal
            darkMode={resolvedTheme ?? "light"}
              onClose={() => setActiveItem(null)}
            />
          ) : (
            // Your existing default modal content
            <div
              className={`
          max-w-md w-full p-6 rounded-xl shadow-lg transform transition-all duration-300
          animate-slide-up backdrop-blur-sm
          ${resolvedTheme
                  ? 'bg-gray-800/90 text-white'
                  : 'bg-white/90 text-gray-900'
                }
        `}
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">
                {portfolioContent[activeItem].title}
              </h2>
              <p className="mb-6 opacity-90">
                {portfolioContent[activeItem].content}
              </p>
              <div className="flex justify-end gap-4">

                <a href={portfolioContent[activeItem].link}
                  target="_blank" rel="noopener noreferrer"
                  className={`
              px-4 py-2 rounded-lg font-semibold transition-colors duration-300
              ${resolvedTheme
                      ? 'bg-white text-gray-900 hover:bg-gray-200'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                    }
            `}
                >
                  Connect
                </a>
                <button
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-2 rounded-lg font-semibold bg-gray-500 
                      text-white transition-colors duration-300 hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioScene;