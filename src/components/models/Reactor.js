import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Reactor = ({ position = [0, 0, 0], onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  
  // Animation to show reactor in operation
  useFrame((state) => {
    if (meshRef.current) {
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
      
      // Pulsating heat effect when active
      if (active) {
        meshRef.current.material.emissiveIntensity = 0.3 + Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
      } else {
        meshRef.current.material.emissiveIntensity = 0;
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
      {/* Main reactor body */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.2, 3, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#cc7722" : "#995522"} 
          metalness={0.7} 
          roughness={0.2}
          emissive="#ff4400"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Temperature gauge */}
      <mesh position={[1.25, 0.8, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <mesh position={[1.4, 0.8, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.1, 0.3, 0.3]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

      {/* Heating elements wrapped around reactor */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, -1 + i * 0.5, 0]} castShadow>
          <torusGeometry args={[1.3, 0.08, 16, 32]} />
          <meshStandardMaterial 
            color={active ? "#ff3300" : "#aa3300"} 
            emissive={active ? "#ff6600" : "#000000"}
            emissiveIntensity={active ? 0.8 : 0}
          />
        </mesh>
      ))}

      {/* Input pipe */}
      <mesh position={[-1.3, 0.7, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial color="#777777" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Output pipe */}
      <mesh position={[1.3, 0.7, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial color="#777777" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Support legs */}
      {[-0.8, 0.8].map((x, i) => (
        <mesh key={i} position={[x, -1.7, 0]} castShadow>
          <boxGeometry args={[0.2, 0.4, 0.2]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
      ))}
      
      {/* Heat effect light */}
      <pointLight
        position={[0, 0, 0]}
        intensity={active ? 1 : 0}
        color="#ff6622"
        distance={5}
      />
    </group>
  );
};

export default Reactor;
