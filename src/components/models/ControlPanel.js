import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ControlPanel = ({ position = [0, 0, 0], onClick }) => {
  const meshRef = useRef();
  const screenRef = useRef();
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
    
    // Screen animation
    if (screenRef.current && active) {
      const time = state.clock.getElapsedTime();
      // Changing screen color to simulate data display
      screenRef.current.material.emissiveIntensity = 0.8 + Math.sin(time * 3) * 0.2;
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
      {/* Main control panel cabinet */}
      <mesh 
        ref={meshRef} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[2, 2.5, 0.8]} />
        <meshStandardMaterial 
          color={hovered ? "#667788" : "#556677"} 
          metalness={0.6} 
          roughness={0.4}
        />
      </mesh>

      {/* Control panel screen */}
      <mesh 
        ref={screenRef}
        position={[0, 0.5, 0.41]} 
        castShadow
      >
        <boxGeometry args={[1.5, 1, 0.05]} />
        <meshStandardMaterial 
          color="#112233" 
          metalness={0.2} 
          roughness={0.3}
          emissive={active ? "#00aaff" : "#003366"}
          emissiveIntensity={active ? 0.8 : 0.2}
        />
      </mesh>

      {/* Control buttons and switches */}
      {[...Array(6)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            -0.6 + (i % 3) * 0.6, 
            -0.4 - Math.floor(i / 3) * 0.5, 
            0.41
          ]} 
          castShadow
        >
          <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial 
            color={active && i === 0 ? "#22ff22" : (i === 0 ? "#55bb55" : "#dd3333")} 
            metalness={0.7} 
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Status indicator lights */}
      {[...Array(4)].map((_, i) => (
        <mesh 
          key={i} 
          position={[-0.6 + i * 0.4, 0, 0.41]} 
          castShadow
        >
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial 
            color={active ? 
              (i === 0 ? "#22ff22" : (i === 1 ? "#ffaa22" : (i === 2 ? "#ff2222" : "#2222ff"))) : 
              "#444444"
            } 
            emissive={active ? 
              (i === 0 ? "#22ff22" : (i === 1 ? "#ffaa22" : (i === 2 ? "#ff2222" : "#2222ff"))) : 
              "#000000"
            }
            emissiveIntensity={active ? 0.8 : 0}
          />
        </mesh>
      ))}

      {/* Control panel base */}
      <mesh position={[0, -1.3, 0]} castShadow>
        <boxGeometry args={[2.2, 0.1, 1]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Data cable conduits */}
      <mesh position={[0.8, -1.2, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      <mesh position={[0.8, -1.4, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </group>
  );
};

export default ControlPanel;
