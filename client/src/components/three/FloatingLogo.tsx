import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FloatingLogoProps {
  className?: string;
}

export default function FloatingLogo({ className = "" }: FloatingLogoProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 200 / 200, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create shield geometry
    const shieldGeometry = new THREE.CylinderGeometry(0.8, 1.2, 0.3, 6);
    const shieldMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00ff41'),
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);

    // Create inner core
    const coreGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00ff41'),
      transparent: true,
      opacity: 0.6
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);

    // Create orbiting rings
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const ringGeometry = new THREE.TorusGeometry(0.5 + i * 0.2, 0.02, 8, 16);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#00ff41'),
        transparent: true,
        opacity: 0.4
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      (ring as any).rotationSpeed = 0.005 + Math.random() * 0.01;
      rings.push(ring);
      scene.add(ring);
    }

    scene.add(shield);
    scene.add(core);
    camera.position.z = 3;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Rotate shield
      shield.rotation.y += 0.01;
      shield.rotation.x = Math.sin(Date.now() * 0.001) * 0.2;

      // Pulse core
      const scale = 1 + Math.sin(Date.now() * 0.003) * 0.1;
      core.scale.setScalar(scale);

      // Rotate rings
      rings.forEach(ring => {
        ring.rotation.x += (ring as any).rotationSpeed;
        ring.rotation.y += (ring as any).rotationSpeed * 0.7;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`w-50 h-50 ${className}`}
    />
  );
}