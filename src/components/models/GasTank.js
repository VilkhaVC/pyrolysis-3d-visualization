import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GasTank = ({ position = [0, 0, 0], onClick }) => {
  const meshRef = useRef();
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
      
      // Subtle pulsation for gas pressure when active
      if (active) {
        meshRef.current.scale.x = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.01;
        meshRef.current.scale.z = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.01;
      }
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
      {/* Main gas tank - horizontal spherical pressure vessel */}
      <mesh 
        ref={meshRef} 
        castShadow 
        receiveShadow
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#55dd99" : "#44bb88"} 
          metalness={0.6} 
          roughness={0.4}
        />
      </mesh>

      {/* Tank support */}
      <mesh position={[0, -1, 0]} castShadow>
        <cylinderGeometry args={[1.1, 1.3, 0.2, 32]} />
        <meshStandardMaterial color="#777777" />
      </mesh>
      <mesh position={[0, -1.2, 0]} castShadow>
        <boxGeometry args={[2, 0.2, 1.5]} />
        <meshStandardMaterial color="#777777" />
      </mesh>

      {/* Inlet pipe - from separation tank */}
      <mesh position={[0, 0.5, 1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial color="#999999" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Gas outlet pipe */}
      <mesh position={[0, 0.5, -1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 16]} />
        <meshStandardMaterial color="#999999" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Pressure gauge */}
      <mesh position={[0.8, 0.5, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <mesh position={[0.9, 0.5, 0]} castShadow>
        <boxGeometry args={[0.1, 0.3, 0.3]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

      {/* Pressure relief valve */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.1, 0.4, 16]} />
        <meshStandardMaterial color="#aa6644" />
      </mesh>
      <mesh position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.3]} />
        <meshStandardMaterial color="#aa6644" />
      </mesh>
      
      {/* Pressure indicator light */}
      <pointLight
        position={[0.8, 0.5, 0]}
        intensity={active ? 0.5 : 0}
        color="#22ff88"
        distance={2}
      />
      
      {/* Gas visualization particles */}
      {active && [...Array(8)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.sin(i * 0.8) * 0.6, 
            Math.cos(i * 0.7) * 0.6, 
            Math.sin(i * 0.5) * 0.6
          ]} 
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial 
            color="#aaffcc" 
            transparent 
            opacity={0.3}
            emissive="#88ffaa"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

export default GasTank;
