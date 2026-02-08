import * as THREE from 'three';
import { gsap } from 'gsap';

/* ===================================
   3D Scene Setup
   =================================== */
export class WeddingScene {
    constructor() {
        this.canvas = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.rings = [];
        this.hearts = [];
        this.time = 0;

        this.init();
    }

    init() {
        // Get canvas element - matches ID in index.html
        this.canvas = document.getElementById('wedding-canvas');

        if (!this.canvas) {
            console.warn('3D canvas not found, skipping 3D scene');
            return;
        }

        // Create scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x0a0a0a, 0.002);

        // Setup camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 30;

        // Setup renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.5;

        // Add lighting
        this.setupLighting();

        // Create 3D objects
        this.createRings();
        this.createParticleSystem();
        this.createFloatingHearts();

        // Handle resize
        window.addEventListener('resize', () => this.onResize());

        // Start animation
        this.animate();
    }

    setupLighting() {
        // Ambient light - softer
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);

        // Main directional light (key light)
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
        mainLight.position.set(8, 12, 8);
        mainLight.castShadow = true;
        this.scene.add(mainLight);

        // Fill light (softer, opposite side)
        const fillLight = new THREE.DirectionalLight(0xd4a373, 0.6);
        fillLight.position.set(-6, 8, -5);
        this.scene.add(fillLight);

        // Point lights for dramatic ring highlights
        const pointLight1 = new THREE.PointLight(0xFFD700, 1.5, 40);
        pointLight1.position.set(-3, 3, 12);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xE6B8B8, 1.5, 40);
        pointLight2.position.set(3, 3, 12);
        this.scene.add(pointLight2);

        // Rim lights for edge glow on rings
        const rimLight1 = new THREE.SpotLight(0xffffff, 2);
        rimLight1.position.set(0, -5, 5);
        rimLight1.angle = Math.PI / 4;
        rimLight1.penumbra = 0.4;
        this.scene.add(rimLight1);

        // Top spotlight for overall illumination
        const topLight = new THREE.SpotLight(0xffffff, 1.8);
        topLight.position.set(0, 25, 5);
        topLight.angle = Math.PI / 5;
        topLight.penumbra = 0.3;
        topLight.castShadow = true;
        topLight.shadow.mapSize.width = 2048;
        topLight.shadow.mapSize.height = 2048;
        this.scene.add(topLight);

        // Animate point lights for dynamic effect
        gsap.to(pointLight1.position, {
            duration: 5,
            x: '+=2',
            y: '+=1',
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });

        gsap.to(pointLight2.position, {
            duration: 4.5,
            x: '-=2',
            y: '+=1',
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });
    }

    createRings() {
        // Create infinity symbol (∞) using two interlocked ring loops
        // More compact design that won't interfere with text

        const ringRadius = 1.5;      // Smaller radius for compact design
        const tubeThickness = 0.25;  // Thinner for elegance
        const ringGeometry = new THREE.TorusGeometry(
            ringRadius,
            tubeThickness,
            60,      // radial segments
            120      // tubular segments
        );

        // Premium Gold material
        const goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFD700,
            metalness: 1.0,
            roughness: 0.1,
            emissive: 0xd4af37,
            emissiveIntensity: 0.6,
            envMapIntensity: 2.5,
        });

        // Premium Rose Gold material
        const roseGoldMaterial = new THREE.MeshStandardMaterial({
            color: 0xE6B8B8,
            metalness: 1.0,
            roughness: 0.1,
            emissive: 0xd4a373,
            emissiveIntensity: 0.6,
            envMapIntensity: 2.5,
        });

        // Left loop of infinity - Gold ring
        const ring1 = new THREE.Mesh(ringGeometry, goldMaterial);
        ring1.position.set(-2.2, 0, 0);  // Left side of infinity
        ring1.rotation.y = Math.PI / 2;   // Rotated vertically
        ring1.rotation.z = Math.PI / 6;   // Tilted for 3D effect
        ring1.castShadow = true;
        ring1.receiveShadow = true;
        this.scene.add(ring1);
        this.rings.push(ring1);

        // Right loop of infinity - Rose Gold ring
        const ring2 = new THREE.Mesh(ringGeometry, roseGoldMaterial);
        ring2.position.set(2.2, 0, 0);   // Right side of infinity
        ring2.rotation.y = Math.PI / 2;   // Rotated vertically
        ring2.rotation.z = -Math.PI / 6;  // Tilted opposite for interlocking
        ring2.castShadow = true;
        ring2.receiveShadow = true;
        this.scene.add(ring2);
        this.rings.push(ring2);

        // Create connection bridge at center (infinity crossover point)
        this.createInfinityCrossover();

        // Add elegant sparkles around the infinity symbol
        this.createInfinitySparkles();

        // Entrance animation - rings coming together to form infinity
        gsap.from(ring1.position, {
            duration: 2.5,
            x: -15,
            y: 8,
            z: -10,
            ease: 'power3.out',
            delay: 0.2
        });

        gsap.from(ring1.rotation, {
            duration: 2,
            z: Math.PI * 2,
            ease: 'power2.out',
            delay: 0.2
        });

        gsap.from(ring2.position, {
            duration: 2.5,
            x: 15,
            y: -8,
            z: 10,
            ease: 'power3.out',
            delay: 0.4
        });

        gsap.from(ring2.rotation, {
            duration: 2,
            z: -Math.PI * 2,
            ease: 'power2.out',
            delay: 0.4
        });

        // Synchronized gentle floating - subtle movement
        gsap.to(ring1.position, {
            duration: 5,
            y: '+=0.15',
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });

        gsap.to(ring2.position, {
            duration: 5,
            y: '+=0.15',
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });

        // Slow synchronized rotation of entire infinity symbol
        const infinityGroup = new THREE.Group();
        infinityGroup.add(ring1);
        infinityGroup.add(ring2);
        this.scene.add(infinityGroup);

        gsap.to(infinityGroup.rotation, {
            duration: 30,
            y: Math.PI * 2,
            ease: 'none',
            repeat: -1
        });

        // Store for later reference
        this.infinityGroup = infinityGroup;
    }

    // Create visual crossover effect at infinity symbol center
    createInfinityCrossover() {
        // Glowing connector at the crossover point
        const crossoverGeometry = new THREE.SphereGeometry(0.4, 32, 32);
        const crossoverMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0xFFE4B5,
            emissiveIntensity: 0.8,
            transparent: true,
            opacity: 0.9
        });

        const crossover = new THREE.Mesh(crossoverGeometry, crossoverMaterial);
        crossover.position.set(0, 0, 0);
        this.scene.add(crossover);

        // Pulsing glow animation
        gsap.to(crossoverMaterial, {
            duration: 2.5,
            emissiveIntensity: 1.2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });

        gsap.to(crossover.scale, {
            duration: 2.5,
            x: 1.3,
            y: 1.3,
            z: 1.3,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });

        // Add subtle rotating ring flare
        const flareGeometry = new THREE.RingGeometry(0.5, 1.0, 32);
        const flareMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFD700,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });

        const flare = new THREE.Mesh(flareGeometry, flareMaterial);
        flare.position.set(0, 0, 0);
        this.scene.add(flare);

        gsap.to(flare.rotation, {
            duration: 10,
            z: Math.PI * 2,
            ease: 'none',
            repeat: -1
        });

        // Add second counter-rotating flare
        const flare2 = flare.clone();
        this.scene.add(flare2);

        gsap.to(flare2.rotation, {
            duration: 8,
            z: -Math.PI * 2,
            ease: 'none',
            repeat: -1
        });
    }

    // Create elegant sparkles along the infinity path
    createInfinitySparkles() {
        const sparkleCount = 50;
        const positions = new Float32Array(sparkleCount * 3);
        const sizes = new Float32Array(sparkleCount);

        for (let i = 0; i < sparkleCount; i++) {
            // Create sparkles along infinity symbol path
            const t = (i / sparkleCount) * Math.PI * 2;

            // Lemniscate of Bernoulli (infinity curve) formula
            const scale = 3;
            const x = (scale * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
            const y = (scale * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
            const z = (Math.random() - 0.5) * 0.5;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            sizes[i] = Math.random() * 0.15 + 0.05;
        }

        const sparkleGeometry = new THREE.BufferGeometry();
        sparkleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        sparkleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const sparkleMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 0.1,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true,
            map: this.createSparkleTexture()
        });

        const infinitySparkles = new THREE.Points(sparkleGeometry, sparkleMaterial);
        this.scene.add(infinitySparkles);

        // Gentle rotation
        gsap.to(infinitySparkles.rotation, {
            duration: 20,
            y: Math.PI * 2,
            ease: 'none',
            repeat: -1
        });

        // Twinkle effect
        gsap.to(sparkleMaterial, {
            duration: 2,
            opacity: 0.4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });
    }

    // Create texture for sparkles
    createSparkleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    createParticleSystem() {
        // Create multiple particle systems with different properties
        const particleSystems = [
            { count: 500, size: 0.1, color: 0xd4a373, speed: 0.5 },
            { count: 300, size: 0.15, color: 0xf4d5d5, speed: 0.3 },
            { count: 200, size: 0.2, color: 0xd4af37, speed: 0.7 }
        ];

        particleSystems.forEach(config => {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(config.count * 3);
            const velocities = new Float32Array(config.count * 3);

            for (let i = 0; i < config.count * 3; i += 3) {
                positions[i] = (Math.random() - 0.5) * 100;
                positions[i + 1] = (Math.random() - 0.5) * 100;
                positions[i + 2] = (Math.random() - 0.5) * 50;

                velocities[i] = (Math.random() - 0.5) * config.speed;
                velocities[i + 1] = Math.random() * config.speed * 0.5;
                velocities[i + 2] = (Math.random() - 0.5) * config.speed;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

            const material = new THREE.PointsMaterial({
                color: config.color,
                size: config.size,
                transparent: true,
                opacity: 0.6,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });

            const particleSystem = new THREE.Points(geometry, material);
            this.scene.add(particleSystem);
            this.particles.push({ system: particleSystem, config });
        });
    }

    createFloatingHearts() {
        // Create heart shape
        const heartShape = new THREE.Shape();
        heartShape.moveTo(0, 0);
        heartShape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
        heartShape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
        heartShape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
        heartShape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);

        const extrudeSettings = {
            depth: 0.2,
            bevelEnabled: true,
            bevelSegments: 2,
            steps: 2,
            bevelSize: 0.05,
            bevelThickness: 0.05
        };

        const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

        // Create multiple hearts
        for (let i = 0; i < 15; i++) {
            const material = new THREE.MeshStandardMaterial({
                color: Math.random() > 0.5 ? 0xf4d5d5 : 0x9b5d73,
                metalness: 0.3,
                roughness: 0.4,
                transparent: true,
                opacity: 0.7,
                emissive: 0xf4d5d5,
                emissiveIntensity: 0.3
            });

            const heart = new THREE.Mesh(geometry, material);

            // Random position
            heart.position.set(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 20 - 10
            );

            // Random rotation
            heart.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            // Random scale
            const scale = Math.random() * 0.5 + 0.3;
            heart.scale.set(scale, scale, scale);

            this.scene.add(heart);
            this.hearts.push(heart);

            // Animate heart
            this.animateHeart(heart, i);
        }
    }

    animateHeart(heart, index) {
        // Floating animation
        gsap.to(heart.position, {
            duration: 3 + Math.random() * 3,
            y: heart.position.y + (Math.random() - 0.5) * 10,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: index * 0.2
        });

        // Rotation animation
        gsap.to(heart.rotation, {
            duration: 5 + Math.random() * 5,
            x: heart.rotation.x + Math.PI * 2,
            y: heart.rotation.y + Math.PI * 2,
            ease: 'none',
            repeat: -1
        });
    }

    updateParticles() {
        this.particles.forEach(({ system, config }) => {
            const positions = system.geometry.attributes.position.array;
            const velocities = system.geometry.attributes.velocity.array;

            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i] * 0.1;
                positions[i + 1] += velocities[i + 1] * 0.1;
                positions[i + 2] += velocities[i + 2] * 0.1;

                // Reset particles that go out of bounds
                if (Math.abs(positions[i]) > 50) {
                    positions[i] = (Math.random() - 0.5) * 100;
                }
                if (positions[i + 1] > 50) {
                    positions[i + 1] = -50;
                }
                if (Math.abs(positions[i + 2]) > 25) {
                    positions[i + 2] = (Math.random() - 0.5) * 50;
                }
            }

            system.geometry.attributes.position.needsUpdate = true;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.time += 0.01;

        // Rotate rings
        this.rings.forEach((ring, index) => {
            ring.rotation.x += 0.002 * (index % 2 === 0 ? 1 : -1);
            ring.rotation.y += 0.003 * (index % 2 === 0 ? 1 : -1);
        });

        // Update particles
        this.updateParticles();

        // Subtle camera movement
        this.camera.position.x = Math.sin(this.time * 0.1) * 2;
        this.camera.position.y = Math.cos(this.time * 0.15) * 1;
        this.camera.lookAt(0, 0, 0);

        // Render
        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Method to animate camera to specific position
    moveCameraTo(x, y, z, duration = 2) {
        gsap.to(this.camera.position, {
            duration,
            x,
            y,
            z,
            ease: 'power2.inOut'
        });
    }

    // Method to add custom animations based on scroll
    onScroll(scrollProgress) {
        // Adjust scene based on scroll
        this.rings.forEach((ring, index) => {
            ring.position.y = scrollProgress * 5 * (index % 2 === 0 ? 1 : -1);
        });
    }
}
