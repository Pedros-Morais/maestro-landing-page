'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { colors } from '@/app/styles/colors';
import { OrbitControls } from '@react-three/drei';

const ParticleField = () => {
  const particlesCount = 2000;
  const particleSize = 0.015;
  
  // Create particle positions and velocities
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      // Create particles in a spherical distribution
      const radius = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.005;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    
    return [positions, velocities];
  }, [particlesCount]);
  
  const pointsRef = useRef<THREE.Points>(null);
  
  // Update particles on each frame
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = clock.getElapsedTime() * 0.2;
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      // Slow movement along velocity vectors
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];
      
      // Add subtle wave motion
      positions[i3] += Math.sin(time + i * 0.1) * 0.001;
      positions[i3 + 1] += Math.cos(time + i * 0.1) * 0.001;
      
      // Create boundary to keep particles in view
      const distance = Math.sqrt(
        positions[i3] ** 2 + 
        positions[i3 + 1] ** 2 + 
        positions[i3 + 2] ** 2
      );
      
      if (distance > 4) {
        const direction = new THREE.Vector3(
          positions[i3], 
          positions[i3 + 1], 
          positions[i3 + 2]
        ).normalize();
        
        positions[i3] = direction.x * 4;
        positions[i3 + 1] = direction.y * 4;
        positions[i3 + 2] = direction.z * 4;
        
        // Reverse velocity
        velocities[i3] *= -1;
        velocities[i3 + 1] *= -1;
        velocities[i3 + 2] *= -1;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.05;
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={particleSize}
        sizeAttenuation={true}
        color={colors.primary.main}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

interface ParticleAnimationProps {
  className?: string;
}

const ParticleAnimation: React.FC<ParticleAnimationProps> = ({ className }) => {
  return (
    <div className={`w-full h-full absolute inset-0 z-0 ${className || ''}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleField />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default ParticleAnimation;
