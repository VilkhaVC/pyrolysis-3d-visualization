import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Condenser = ({ position = [0, 0, 0], onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  
  // Animation for hover effect
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
      {/* Main condenser body - horizontal heat exchanger */}
      <mesh 
        ref={meshRef} 
        rotation={[0, 0, Math.PI / 2]} 
        castShadow 
        receiveShadow
      >
        <cylinderGeometry args={[0.7, 0.7, 3, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#88bbdd" : "#66aacc"} 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>

      {/* End caps */}
      {[-1.5, 1.5].map((x, i) => (
        <mesh 
          key={i} 
          position={[x, 0, 0]} 
          rotation={[0, 0, Math.PI / 2]} 
          castShadow
        >
          <cylinderGeometry args={[0.75, 0.75, 0.1, 32]} />
          <meshStandardMaterial color="#5599bb" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Input pipe (hot vapor) */}
      <mesh position={[-1.6, 0.4, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 16]} />
        <meshStandardMaterial 
          color={active ? "#ee6622" : "#cc5522"} 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>

      {/* Output pipe (condensed liquid) */}
      <mesh position={[1.6, -0.4, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 16]} />
        <meshStandardMaterial 
          color="#4488aa" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>

      {/* Cooling water inlet */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 16]} />
        <meshStandardMaterial color="#6699cc" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Cooling water outlet */}
      <mesh position={[0, -0.8, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 16]} />
        <meshStandardMaterial color="#44ccff" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Support brackets */}
      {[-0.8, 0.8].map((x, i) => (
        <mesh key={i} position={[x, -0.9, 0]} castShadow>
          <boxGeometry args={[0.2, 0.3, 0.2]} />
          <meshStandardMaterial color="#555555" />
        </mesh>
      ))}
      
      {/* Condensation particle effect */}
      {active && [...Array(10)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            1.2 + Math.sin(i * 0.5) * 0.2, 
            -0.3 + Math.cos(i * 0.3) * 0.2, 
            Math.sin(i) * 0.2
          ]} 
          castShadow
        >
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial 
            color="#88ccff" 
            transparent 
            opacity={0.7} 
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

export default Condenser;
