import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MatrixBackgroundProps {
  className?: string;
}

export default function MatrixBackground({ className = "" }: MatrixBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0.1);
    mountRef.current.appendChild(renderer.domElement);

    // Create matrix rain effect
    const particles: THREE.Mesh[] = [];
    const particleCount = 100;

    // Create simple geometric particles for performance
    for (let i = 0; i < particleCount; i++) {
      const geometry = new THREE.SphereGeometry(0.05, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(`hsl(${120 + Math.random() * 60}, 100%, ${50 + Math.random() * 30}%)`),
        transparent: true,
        opacity: Math.random() * 0.8 + 0.2
      });

      const particle = new THREE.Mesh(geometry, material);
      particle.position.x = (Math.random() - 0.5) * 20;
      particle.position.y = Math.random() * 20 - 10;
      particle.position.z = (Math.random() - 0.5) * 10;
      
      // Add custom properties for animation
      (particle as any).velocity = Math.random() * 0.02 + 0.01;
      (particle as any).rotationSpeed = (Math.random() - 0.5) * 0.02;

      particles.push(particle);
      scene.add(particle);
    }

    // Create floating geometric shapes
    const geometries = [
      new THREE.OctahedronGeometry(0.1),
      new THREE.TetrahedronGeometry(0.1),
      new THREE.IcosahedronGeometry(0.1)
    ];

    const shapes: THREE.Mesh[] = [];
    for (let i = 0; i < 20; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#00ff41'),
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });

      const shape = new THREE.Mesh(geometry, material);
      shape.position.x = (Math.random() - 0.5) * 15;
      shape.position.y = (Math.random() - 0.5) * 15;
      shape.position.z = (Math.random() - 0.5) * 8;

      (shape as any).rotationX = Math.random() * 0.02;
      (shape as any).rotationY = Math.random() * 0.02;
      (shape as any).rotationZ = Math.random() * 0.02;

      shapes.push(shape);
      scene.add(shape);
    }

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Animate matrix particles
      particles.forEach(particle => {
        particle.position.y -= (particle as any).velocity;
        particle.rotation.z += (particle as any).rotationSpeed;

        if (particle.position.y < -10) {
          particle.position.y = 10;
          particle.position.x = (Math.random() - 0.5) * 20;
        }

        // Fade effect
        const material = particle.material as THREE.MeshBasicMaterial;
        material.opacity = Math.sin(Date.now() * 0.001 + particle.position.x) * 0.3 + 0.5;
      });

      // Animate geometric shapes
      shapes.forEach(shape => {
        shape.rotation.x += (shape as any).rotationX;
        shape.rotation.y += (shape as any).rotationY;
        shape.rotation.z += (shape as any).rotationZ;

        // Floating motion
        shape.position.y += Math.sin(Date.now() * 0.001 + shape.position.x) * 0.001;
      });

      // Camera subtle movement
      camera.position.x = Math.sin(Date.now() * 0.0005) * 0.5;
      camera.position.y = Math.cos(Date.now() * 0.0003) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
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
      style={{ 
        background: 'linear-gradient(45deg, rgba(0,0,0,0.9) 0%, rgba(0,20,0,0.8) 100%)'
      }}
    />
  );
}