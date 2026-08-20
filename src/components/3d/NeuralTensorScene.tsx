import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const NeuralTensorScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for rotation
    const neuralGroup = new THREE.Group();
    scene.add(neuralGroup);

    // 1. Create Neural Nodes (Points)
    const particleCount = window.innerWidth < 768 ? 65 : 130;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color('#06b6d4');
    const violetColor = new THREE.Color('#8b5cf6');
    const tempColor = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      // Distribute in a spherical tensor cloud
      const radius = 12 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Blend between cyan and violet
      tempColor.lerpColors(cyanColor, violetColor, Math.random());
      colors[i * 3] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom circle texture
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(34, 211, 238, 0.8)');
      gradient.addColorStop(0.8, 'rgba(139, 92, 246, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      map: createCircleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    neuralGroup.add(particleSystem);

    // 2. Dynamic Synaptic Connections (Lines)
    const maxConnections = particleCount * 4;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    neuralGroup.add(lineSystem);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
      mouseX = x;
      mouseY = y;
      targetRotationY = x * 0.4;
      targetRotationX = -y * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth group rotation
      neuralGroup.rotation.y += 0.002;
      neuralGroup.rotation.x += (targetRotationX - neuralGroup.rotation.x) * 0.05;
      neuralGroup.rotation.y += (targetRotationY - neuralGroup.rotation.y) * 0.05;

      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      // Harmonic wave oscillation of nodes
      for (let i = 0; i < particleCount; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];

        const wave = Math.sin(elapsedTime * 1.5 + i * 0.3) * 0.4;
        posArray[i * 3] = ox + wave * 0.5;
        posArray[i * 3 + 1] = oy + Math.cos(elapsedTime * 1.2 + i * 0.2) * 0.4;
        posArray[i * 3 + 2] = oz + wave * 0.5;
      }
      posAttr.needsUpdate = true;

      // Update dynamic connecting lines
      let connectionIndex = 0;
      const connectionDistLimit = 5.5;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDistLimit && connectionIndex < maxConnections) {
            linePositions[connectionIndex * 6] = posArray[i * 3];
            linePositions[connectionIndex * 6 + 1] = posArray[i * 3 + 1];
            linePositions[connectionIndex * 6 + 2] = posArray[i * 3 + 2];

            linePositions[connectionIndex * 6 + 3] = posArray[j * 3];
            linePositions[connectionIndex * 6 + 4] = posArray[j * 3 + 1];
            linePositions[connectionIndex * 6 + 5] = posArray[j * 3 + 2];

            connectionIndex++;
          }
        }
      }

      lineGeometry.setDrawRange(0, connectionIndex * 2);
      (lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
      aria-hidden="true"
    />
  );
};
