import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const OilTank = ({ position = [0, 0, 0], onClick }) => {
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
    
    // Animate liquid level
    if (liquidRef.current && active) {
      const time = state.clock.getElapsedTime();
      // Subtle wave effect on the oil surface
      liquidRef.current.material.roughness = 0.1 + Math.sin(time * 1.5) * 0.05;
      
      // Slowly increase level when active
      if (liquidRef.current.scale.y < 0.8) {
        liquidRef.current.scale.y += 0.001;
        liquidRef.current.position.y = -1.25 + liquidRef.current.scale.y;
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
      {/* Main oil storage tank - vertical cylindrical vessel */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.2, 3, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#447799" : "#336688"} 
          metalness={0.6} 
          roughness={0.3}
          transparent={true}
          opacity={0.9}
        />
      </mesh>

      {/* Oil inside tank */}
      <mesh 
        ref={liquidRef}
        position={[0, -0.8, 0]} 
        castShadow
      >
        <cylinderGeometry args={[1.15, 1.15, 1, 32]} />
        <meshStandardMaterial 
          color="#332211" 
          metalness={0.3} 
          roughness={0.1}
          transparent={true}
          opacity={0.9}
        />
      </mesh>

      {/* Tank top */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <cylinderGeometry args={[1.25, 1.25, 0.1, 32]} />
        <meshStandardMaterial color="#446688" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Access hatch on top */}
      <mesh position={[0, 1.65, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
        <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.7, 0]} castShadow>
        <torusGeometry args={[0.4, 0.05, 16, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Input pipe - from separation tank */}
      <mesh position={[-1.3, 0.5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 16]} />
        <meshStandardMaterial color="#777777" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Output pipe with valve */}
      <mesh position={[0, -1.6, 1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 16]} />
        <meshStandardMaterial color="#777777" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -1.6, 0.7]} castShadow>
        <boxGeometry args={[0.3, 0.2, 0.2]} />
        <meshStandardMaterial color={active ? "#22aa22" : "#aa2222"} />
      </mesh>

      {/* Level gauge */}
      <mesh position={[1.1, 0, 0]} castShadow>
        <boxGeometry args={[0.05, 2.7, 0.05]} />
        <meshStandardMaterial color="#dddddd" transparent opacity={0.6} />
      </mesh>
      
      {/* Level indicator - moves with oil level */}
      <mesh 
        position={[1.1, active ? -0.8 + (liquidRef.current?.scale.y || 0) * 0.8 : -1.3, 0.05]} 
        castShadow
      >
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#ff8800" />
      </mesh>

      {/* Support base */}
      <mesh position={[0, -1.6, 0]} castShadow>
        <cylinderGeometry args={[1.3, 1.5, 0.2, 32]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      <mesh position={[0, -1.8, 0]} castShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
    </group>
  );
};

export default OilTank;
