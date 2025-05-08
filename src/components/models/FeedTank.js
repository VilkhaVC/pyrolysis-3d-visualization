import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const FeedTank = ({ position = [0, 0, 0], onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  
  // Animation
  useFrame((state) => {
    if (meshRef.current) {
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
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
      {/* Base cylinder for tank */}
      <mesh 
        ref={meshRef}
        castShadow 
        receiveShadow
      >
        <cylinderGeometry args={[1, 1, 2, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#0088ff" : "#3366aa"} 
          metalness={0.6} 
          roughness={0.2}
        />
      </mesh>

      {/* Tank lid */}
      <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.05, 1.05, 0.1, 32]} />
        <meshStandardMaterial color="#2255aa" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Inlet pipe */}
      <mesh position={[0, 0.5, 1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial color="#999999" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Stir mechanism on top */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.3, 0.2, 0.3]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.8, 8]} />
        <meshStandardMaterial color="#aaaaaa" />
      </mesh>

      {/* Level indicator */}
      <mesh position={[0.9, 0, 0]} castShadow>
        <boxGeometry args={[0.1, 1.8, 0.1]} />
        <meshStandardMaterial color="#dddddd" transparent opacity={0.7} />
      </mesh>
      
      {/* Active indicator light */}
      <pointLight
        position={[0, 1.4, 0]}
        intensity={active ? 1 : 0}
        color="#00aaff"
        distance={3}
      />
    </group>
  );
};

export default FeedTank;
