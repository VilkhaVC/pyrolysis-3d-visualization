import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SeparationTank = ({ position = [0, 0, 0], onClick }) => {
  const meshRef = useRef();
  const liquidRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  
  // Animation effects
  useFrame((state) => {
    if (meshRef.current) {
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
    
    // Liquid level animation
    if (liquidRef.current && active) {
      const time = state.clock.getElapsedTime();
      liquidRef.current.position.y = -0.4 + Math.sin(time * 0.5) * 0.05;
      // Simulate liquid movement
      liquidRef.current.material.roughness = 0.2 + Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        setActive(!active);
        onClick && onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Main separation tank - vertical cylindrical vessel */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 2.5, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#aabbcc" : "#8899aa"} 
          metalness={0.7} 
          roughness={0.3}
          transparent={true}
          opacity={0.85}
        />
      </mesh>

      {/* Liquid inside the tank */}
      <mesh 
        ref={liquidRef}
        position={[0, -0.4, 0]} 
        castShadow 
        receiveShadow
      >
        <cylinderGeometry args={[0.95, 0.95, 1.5, 32]} />
        <meshStandardMaterial 
          color="#443322" 
          metalness={0.2} 
          roughness={0.3}
          transparent={true}
          opacity={0.8}
        />
      </mesh>

      {/* Tank top */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <cylinderGeometry args={[1.05, 1.05, 0.1, 32]} />
        <meshStandardMaterial color="#778899" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Tank bottom */}
      <mesh position={[0, -1.3, 0]} castShadow>
        <cylinderGeometry args={[1.05, 1.05, 0.1, 32]} />
        <meshStandardMaterial color="#778899" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Input pipe (from condenser) */}
      <mesh position={[-1.1, 0.7, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 16]} />
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Gas output pipe (to gas tank) */}
      <mesh position={[0, 1.4, -0.5]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 16]} />
        <meshStandardMaterial color="#777777" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Oil output pipe (to oil tank) */}
      <mesh position={[1.1, -0.8, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 16]} />
        <meshStandardMaterial color="#777777" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Level gauge */}
      <mesh position={[0.95, 0, 0]} castShadow>
        <boxGeometry args={[0.05, 2, 0.05]} />
        <meshStandardMaterial color="#dddddd" transparent opacity={0.7} />
      </mesh>
      
      {/* Level indicator - moves with liquid level */}
      <mesh 
        position={[0.95, active ? -0.4 : -0.8, 0.05]} 
        castShadow
      >
        <boxGeometry args={[0.07, 0.07, 0.07]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>

      {/* Support legs */}
      {[-0.7, 0.7].map((x, i) => (
        <group key={i} position={[x, -1.5, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.2, 0.4, 0.2]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default SeparationTank;
