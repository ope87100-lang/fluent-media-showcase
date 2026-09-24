/**
 * Fluent Media - 3D Interactive WebGL Background
 * Built with Three.js (r128)
 * High-performance, GPU-accelerated interactive particle constellation & 3D geometry
 */

(function init3DBackground() {
  const canvas = document.getElementById('three-bg-canvas');
  if (!canvas) return;

  // Scene, Camera & Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 85;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // --- 1. Interactive 3D Particle Cloud ---
  const particleCount = window.innerWidth < 768 ? 140 : 280;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const velocities = [];

  const colorPalette = [
    new THREE.Color(0x6366f1), // Indigo
    new THREE.Color(0x8b5cf6), // Violet
    new THREE.Color(0x06b6d4), // Cyan
    new THREE.Color(0x10b981), // Emerald
    new THREE.Color(0xf59e0b)  // Amber
  ];

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 160;
    positions[i3 + 1] = (Math.random() - 0.5) * 110;
    positions[i3 + 2] = (Math.random() - 0.5) * 80;

    const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i3] = chosenColor.r;
    colors[i3 + 1] = chosenColor.g;
    colors[i3 + 2] = chosenColor.b;

    velocities.push({
      x: (Math.random() - 0.5) * 0.04,
      y: (Math.random() - 0.5) * 0.04,
      z: (Math.random() - 0.5) * 0.02
    });
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Circular glow particle texture
  const particleCanvas = document.createElement('canvas');
  particleCanvas.width = 64;
  particleCanvas.height = 64;
  const pCtx = particleCanvas.getContext('2d');
  const gradient = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(99, 102, 241, 0.8)');
  gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
  pCtx.fillStyle = gradient;
  pCtx.fillRect(0, 0, 64, 64);
  const particleTexture = new THREE.CanvasTexture(particleCanvas);

  const particleMaterial = new THREE.PointsMaterial({
    size: 2.2,
    vertexColors: true,
    map: particleTexture,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particles = new THREE.Points(geometry, particleMaterial);
  scene.add(particles);

  // --- 2. Floating 3D Geometric Torus Knot ---
  const torusGeo = new THREE.TorusKnotGeometry(12, 3.2, 80, 16, 2, 3);
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0x4f46e5,
    wireframe: true,
    transparent: true,
    opacity: 0.14
  });
  const torusMesh = new THREE.Mesh(torusGeo, torusMat);
  torusMesh.position.set(45, -15, -20);
  scene.add(torusMesh);

  // --- 3. Floating 3D Icosahedron Core ---
  const icoGeo = new THREE.IcosahedronGeometry(18, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.08
  });
  const icoMesh = new THREE.Mesh(icoGeo, icoMat);
  icoMesh.position.set(-45, 20, -30);
  scene.add(icoMesh);

  // --- 4. Interactive Mouse / Touch Tracking ---
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - windowHalfX) * 0.05;
    mouseY = (e.clientY - windowHalfY) * 0.05;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouseX = (e.touches[0].clientX - windowHalfX) * 0.05;
      mouseY = (e.touches[0].clientY - windowHalfY) * 0.05;
    }
  }, { passive: true });

  // Scroll dynamics
  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  // Window Resize Handling
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // --- 5. Animation Loop ---
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Smooth camera lerping with mouse
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;
    camera.position.x = targetX * 0.6;
    camera.position.y = -targetY * 0.6 + (scrollY * 0.015);
    camera.lookAt(scene.position);

    // Rotate 3D Geometries
    torusMesh.rotation.x = elapsedTime * 0.2;
    torusMesh.rotation.y = elapsedTime * 0.25;
    icoMesh.rotation.x = elapsedTime * -0.15;
    icoMesh.rotation.y = elapsedTime * 0.18;

    // Animate Particles
    const posAttr = geometry.attributes.position;
    const array = posAttr.array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      array[i3] += velocities[i].x;
      array[i3 + 1] += velocities[i].y;
      array[i3 + 2] += velocities[i].z;

      // Wrap around bounds
      if (array[i3] > 80) array[i3] = -80;
      if (array[i3] < -80) array[i3] = 80;
      if (array[i3 + 1] > 60) array[i3 + 1] = -60;
      if (array[i3 + 1] < -60) array[i3 + 1] = 60;
    }

    posAttr.needsUpdate = true;
    particles.rotation.y = elapsedTime * 0.02;

    renderer.render(scene, camera);
  }

  animate();
})();
