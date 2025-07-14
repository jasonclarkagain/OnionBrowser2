import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DataVisualizationProps {
  data?: number[];
  className?: string;
}

export default function DataVisualization({ 
  data = [65, 45, 80, 30, 90, 75, 55], 
  className = "" 
}: DataVisualizationProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(400, 300);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create data bars
    const bars: THREE.Mesh[] = [];
    const maxHeight = Math.max(...data);
    
    data.forEach((value, index) => {
      const height = (value / maxHeight) * 3;
      const geometry = new THREE.BoxGeometry(0.3, height, 0.3);
      
      // Color based on value
      const color = new THREE.Color().setHSL(
        0.3 - (value / maxHeight) * 0.3, // Green to red
        0.8,
        0.5 + (value / maxHeight) * 0.3
      );
      
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.8
      });
      
      const bar = new THREE.Mesh(geometry, material);
      bar.position.x = (index - data.length / 2) * 0.5;
      bar.position.y = height / 2 - 1.5;
      
      // Add glow effect outline
      const outlineGeometry = new THREE.BoxGeometry(0.32, height + 0.02, 0.32);
      const outlineMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#00ff41'),
        transparent: true,
        opacity: 0.3,
        side: THREE.BackSide
      });
      const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
      outline.position.copy(bar.position);
      
      bars.push(bar);
      scene.add(bar);
      scene.add(outline);
    });

    // Create grid
    const gridHelper = new THREE.GridHelper(5, 10, '#00ff41', '#004400');
    gridHelper.position.y = -1.5;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.3;
    scene.add(gridHelper);

    // Add floating particles
    const particles: THREE.Mesh[] = [];
    for (let i = 0; i < 50; i++) {
      const geometry = new THREE.SphereGeometry(0.01, 4, 4);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#00ff41'),
        transparent: true,
        opacity: Math.random() * 0.5 + 0.3
      });
      
      const particle = new THREE.Mesh(geometry, material);
      particle.position.x = (Math.random() - 0.5) * 6;
      particle.position.y = (Math.random() - 0.5) * 4;
      particle.position.z = (Math.random() - 0.5) * 4;
      
      (particle as any).velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        Math.random() * 0.005 + 0.002,
        (Math.random() - 0.5) * 0.01
      );
      
      particles.push(particle);
      scene.add(particle);
    }

    camera.position.set(3, 2, 4);
    camera.lookAt(0, 0, 0);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Animate bars - subtle pulse
      bars.forEach((bar, index) => {
        const scale = 1 + Math.sin(Date.now() * 0.002 + index * 0.5) * 0.05;
        bar.scale.y = scale;
      });

      // Animate particles
      particles.forEach(particle => {
        particle.position.add((particle as any).velocity);
        
        // Reset particles that go too far
        if (particle.position.y > 3) {
          particle.position.y = -3;
          particle.position.x = (Math.random() - 0.5) * 6;
          particle.position.z = (Math.random() - 0.5) * 4;
        }
      });

      // Rotate camera slightly
      const time = Date.now() * 0.0005;
      camera.position.x = Math.cos(time) * 5;
      camera.position.z = Math.sin(time) * 5;
      camera.lookAt(0, 0, 0);

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
  }, [data]);

  return (
    <div 
      ref={mountRef} 
      className={`w-full h-[300px] ${className}`}
    />
  );
}