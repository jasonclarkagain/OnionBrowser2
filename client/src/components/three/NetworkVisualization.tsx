import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NetworkVisualizationProps {
  className?: string;
}

export default function NetworkVisualization({ className = "" }: NetworkVisualizationProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(600, 400);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create network nodes
    const nodes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];
    const nodePositions: THREE.Vector3[] = [];

    // Node types with different colors
    const nodeTypes = [
      { color: '#ff4444', size: 0.15, name: 'Client' },      // Red - Client
      { color: '#00ff41', size: 0.12, name: 'Proxy' },       // Green - Proxy servers
      { color: '#4488ff', size: 0.1, name: 'Target' },       // Blue - Target servers
      { color: '#ffaa00', size: 0.08, name: 'Router' }       // Orange - Network routers
    ];

    // Create network topology
    const networkLayout = [
      { pos: [-4, 0, 0], type: 0 }, // Client
      { pos: [-2, 1, -1], type: 3 }, // Router
      { pos: [-2, -1, 1], type: 3 }, // Router
      { pos: [0, 0, 0], type: 1 }, // Main proxy
      { pos: [1, 1.5, -0.5], type: 1 }, // Proxy node
      { pos: [1, -1.5, 0.5], type: 1 }, // Proxy node
      { pos: [3, 0.5, -1], type: 3 }, // Router
      { pos: [3, -0.5, 1], type: 3 }, // Router
      { pos: [5, 0, 0], type: 2 }, // Target server
    ];

    // Create nodes
    networkLayout.forEach((layout, index) => {
      const nodeType = nodeTypes[layout.type];
      const geometry = new THREE.SphereGeometry(nodeType.size, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(nodeType.color),
        transparent: true,
        opacity: 0.8
      });

      const node = new THREE.Mesh(geometry, material);
      node.position.set(layout.pos[0], layout.pos[1], layout.pos[2]);
      
      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(nodeType.size * 1.5, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(nodeType.color),
        transparent: true,
        opacity: 0.2
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(node.position);

      nodes.push(node);
      nodePositions.push(node.position.clone());
      scene.add(node);
      scene.add(glow);

      // Add pulsing animation data
      (node as any).originalScale = nodeType.size;
      (glow as any).glowNode = true;
    });

    // Create connections between nodes
    const connectionPairs = [
      [0, 1], [0, 2], // Client to routers
      [1, 3], [2, 3], // Routers to main proxy
      [3, 4], [3, 5], // Main proxy to proxy nodes
      [4, 6], [5, 7], // Proxy nodes to exit routers
      [6, 8], [7, 8], // Exit routers to target
    ];

    connectionPairs.forEach(([startIdx, endIdx]) => {
      const startPos = nodePositions[startIdx];
      const endPos = nodePositions[endIdx];
      
      const geometry = new THREE.BufferGeometry().setFromPoints([startPos, endPos]);
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color('#00ff41'),
        transparent: true,
        opacity: 0.4
      });
      
      const line = new THREE.Line(geometry, material);
      connections.push(line);
      scene.add(line);
    });

    // Create data packets
    const packets: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.SphereGeometry(0.03, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#ffffff'),
        transparent: true,
        opacity: 0.9
      });
      
      const packet = new THREE.Mesh(geometry, material);
      packet.position.copy(nodePositions[0]); // Start at client
      
      (packet as any).pathIndex = 0;
      (packet as any).progress = Math.random();
      (packet as any).path = [0, 1, 3, 4, 6, 8]; // Route through network
      (packet as any).speed = 0.01 + Math.random() * 0.02;
      
      packets.push(packet);
      scene.add(packet);
    }

    camera.position.set(2, 3, 6);
    camera.lookAt(0, 0, 0);

    // Animation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Animate nodes - pulsing effect
      nodes.forEach((node, index) => {
        const scale = (node as any).originalScale * (1 + Math.sin(Date.now() * 0.003 + index) * 0.1);
        node.scale.setScalar(scale);
      });

      // Animate connections - flowing effect
      connections.forEach((connection, index) => {
        const material = connection.material as THREE.LineBasicMaterial;
        material.opacity = 0.3 + Math.sin(Date.now() * 0.004 + index * 0.5) * 0.2;
      });

      // Animate data packets
      packets.forEach(packet => {
        const pathData = packet as any;
        const currentNodeIndex = pathData.path[pathData.pathIndex];
        const nextNodeIndex = pathData.path[pathData.pathIndex + 1];
        
        if (nextNodeIndex !== undefined) {
          const startPos = nodePositions[currentNodeIndex];
          const endPos = nodePositions[nextNodeIndex];
          
          pathData.progress += pathData.speed;
          
          if (pathData.progress >= 1) {
            pathData.progress = 0;
            pathData.pathIndex++;
            
            if (pathData.pathIndex >= pathData.path.length - 1) {
              pathData.pathIndex = 0;
              pathData.progress = 0;
            }
          }
          
          // Interpolate position
          packet.position.lerpVectors(startPos, endPos, pathData.progress);
        }
      });

      // Rotate camera slightly
      const time = Date.now() * 0.0003;
      camera.position.x = 2 + Math.cos(time) * 1;
      camera.position.z = 6 + Math.sin(time) * 1;
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
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`w-full h-[400px] flex items-center justify-center ${className}`}
    />
  );
}