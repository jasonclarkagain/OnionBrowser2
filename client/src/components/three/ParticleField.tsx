import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleFieldProps {
  className?: string;
}

export default function ParticleField({ className = "" }: ParticleFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 600, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, 600);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create particle system
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Velocity
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      // Color (matrix green variations)
      const greenIntensity = Math.random() * 0.5 + 0.5;
      colors[i * 3] = 0; // R
      colors[i * 3 + 1] = greenIntensity; // G
      colors[i * 3 + 2] = greenIntensity * 0.3; // B
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Create connecting lines between nearby particles
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#00ff41'),
      transparent: true,
      opacity: 0.1
    });

    const maxDistance = 3;
    const lines: THREE.Vector3[] = [];

    const updateConnections = () => {
      lines.length = 0;
      const positionAttribute = particles.geometry.attributes.position;
      
      for (let i = 0; i < particleCount; i++) {
        const x1 = positionAttribute.getX(i);
        const y1 = positionAttribute.getY(i);
        const z1 = positionAttribute.getZ(i);

        for (let j = i + 1; j < particleCount; j++) {
          const x2 = positionAttribute.getX(j);
          const y2 = positionAttribute.getY(j);
          const z2 = positionAttribute.getZ(j);

          const distance = Math.sqrt(
            (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2
          );

          if (distance < maxDistance) {
            lines.push(new THREE.Vector3(x1, y1, z1));
            lines.push(new THREE.Vector3(x2, y2, z2));
          }
        }
      }

      lineGeometry.setFromPoints(lines);
    };

    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSystem);

    camera.position.z = 10;

    let connectionUpdateCounter = 0;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Update particle positions
      const positionAttribute = particles.geometry.attributes.position;
      
      for (let i = 0; i < particleCount; i++) {
        let x = positionAttribute.getX(i);
        let y = positionAttribute.getY(i);
        let z = positionAttribute.getZ(i);

        x += velocities[i * 3];
        y += velocities[i * 3 + 1];
        z += velocities[i * 3 + 2];

        // Boundary checking
        if (x > 10 || x < -10) velocities[i * 3] *= -1;
        if (y > 10 || y < -10) velocities[i * 3 + 1] *= -1;
        if (z > 10 || z < -10) velocities[i * 3 + 2] *= -1;

        positionAttribute.setXYZ(i, x, y, z);
      }

      positionAttribute.needsUpdate = true;

      // Update connections less frequently for performance
      connectionUpdateCounter++;
      if (connectionUpdateCounter % 10 === 0) {
        updateConnections();
      }

      // Rotate the entire system
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      // Camera movement
      const time = Date.now() * 0.0002;
      camera.position.x = Math.sin(time) * 2;
      camera.position.y = Math.cos(time * 0.7) * 1;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / 600;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ height: '600px' }}
    />
  );
}