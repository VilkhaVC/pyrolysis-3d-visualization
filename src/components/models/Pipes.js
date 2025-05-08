import React from 'react';
import { Tube } from '@react-three/drei';
import * as THREE from 'three';

// Process layout coordinates - must match with PyrolysisScene.js
const LAYOUT = {
  feedTank: [-6, 0, -2],
  reactor: [-2, 0, 0],
  condenser: [2, 0, 0],
  separationTank: [6, 0, 0],
  gasTank: [6, 0, -4],
  oilTank: [8, 0, 0],
  controlPanel: [-7, 0, 4]
};

// Create curved pipe paths connecting components
const createPipePath = (start, end, height = 1, segments = 20) => {
  const points = [];
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    
    // Use quadratic bezier curve for smooth pipe paths
    if (i === 0) {
      points.push(new THREE.Vector3(start[0], start[1], start[2]));
    } else if (i === segments) {
      points.push(new THREE.Vector3(end[0], end[1], end[2]));
    } else {
      const elevation = Math.sin(t * Math.PI) * height;
      
      // Interpolate between start and end points with elevation
      points.push(new THREE.Vector3(
        start[0] + (end[0] - start[0]) * t,
        start[1] + elevation,
        start[2] + (end[2] - start[2]) * t
      ));
    }
  }
  
  // Create a smooth curve path
  return new THREE.CatmullRomCurve3(points);
};

const Pipes = () => {
  // Define pipe connections
  const connections = [
    {
      name: "feedTank-to-reactor",
      start: [LAYOUT.feedTank[0] + 1, LAYOUT.feedTank[1] + 0.5, LAYOUT.feedTank[2]],
      end: [LAYOUT.reactor[0] - 1, LAYOUT.reactor[1] + 0.5, LAYOUT.reactor[2]],
      color: "#6699aa"
    },
    {
      name: "reactor-to-condenser",
      start: [LAYOUT.reactor[0] + 1, LAYOUT.reactor[1] + 0.5, LAYOUT.reactor[2]],
      end: [LAYOUT.condenser[0] - 1.5, LAYOUT.condenser[1] + 0.5, LAYOUT.condenser[2]],
      color: "#dd7744"
    },
    {
      name: "condenser-to-separation",
      start: [LAYOUT.condenser[0] + 1.5, LAYOUT.condenser[1] - 0.3, LAYOUT.condenser[2]],
      end: [LAYOUT.separationTank[0] - 1, LAYOUT.separationTank[1] + 0.5, LAYOUT.separationTank[2]],
      color: "#4488aa"
    },
    {
      name: "separation-to-gas",
      start: [LAYOUT.separationTank[0], LAYOUT.separationTank[1] + 1, LAYOUT.separationTank[2] - 0.5],
      end: [LAYOUT.gasTank[0], LAYOUT.gasTank[1] + 0.5, LAYOUT.gasTank[2]],
      color: "#66aa88"
    },
    {
      name: "separation-to-oil",
      start: [LAYOUT.separationTank[0] + 1, LAYOUT.separationTank[1] - 0.8, LAYOUT.separationTank[2]],
      end: [LAYOUT.oilTank[0] - 1, LAYOUT.oilTank[1] + 0.5, LAYOUT.oilTank[2]],
      color: "#445566"
    },
    {
      name: "control-connections",
      start: [LAYOUT.controlPanel[0] + 1, LAYOUT.controlPanel[1], LAYOUT.controlPanel[2]],
      end: [LAYOUT.reactor[0] - 1, LAYOUT.reactor[1] - 0.5, LAYOUT.reactor[2]],
      color: "#333333"
    }
  ];
  
  return (
    <group>
      {connections.map((connection) => {
        const path = createPipePath(connection.start, connection.end, 0.8);
        
        return (
          <Tube
            key={connection.name}
            args={[path, 60, 0.15, 8, false]}
          >
            <meshStandardMaterial 
              color={connection.color} 
              metalness={0.8} 
              roughness={0.2}
            />
          </Tube>
        );
      })}
    </group>
  );
};

export default Pipes;
