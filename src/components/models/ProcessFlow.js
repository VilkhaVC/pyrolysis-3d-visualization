import React from 'react';
import { Line, Text } from '@react-three/drei';
import * as THREE from 'three';

// Process layout coordinates - must match with PyrolysisScene.js
const LAYOUT = {
  feedTank: [-6, 0, -2],
  reactor: [-2, 0, 0],
  condenser: [2, 0, 0],
  separationTank: [6, 0, 0],
  gasTank: [6, 0, -4],
  oilTank: [8, 0, 0]
};

// Create flow arrows to indicate process direction
const FlowArrow = ({ start, end, color = "#ffffff", label = "", labelOffset = [0, 0.3, 0] }) => {
  // Calculate direction vector
  const direction = new THREE.Vector3(
    end[0] - start[0],
    end[1] - start[1],
    end[2] - start[2]
  ).normalize();
  
  // Calculate midpoint for arrow and label position
  const midpoint = [
    start[0] + (end[0] - start[0]) * 0.5,
    start[1] + (end[1] - start[1]) * 0.5,
    start[2] + (end[2] - start[2]) * 0.5
  ];
  
  // Arrow head size
  const arrowHead = 0.1;
  
  // Create arrow points
  const points = [
    new THREE.Vector3(...start),
    new THREE.Vector3(...midpoint)
  ];
  
  // Create arrowhead
  const arrowHeadPoints = [
    new THREE.Vector3(
      midpoint[0] - direction.x * arrowHead - direction.z * arrowHead * 0.5,
      midpoint[1] - direction.y * arrowHead,
      midpoint[2] - direction.z * arrowHead + direction.x * arrowHead * 0.5
    ),
    new THREE.Vector3(...midpoint),
    new THREE.Vector3(
      midpoint[0] - direction.x * arrowHead + direction.z * arrowHead * 0.5,
      midpoint[1] - direction.y * arrowHead,
      midpoint[2] - direction.z * arrowHead - direction.x * arrowHead * 0.5
    )
  ];
  
  return (
    <group>
      <Line 
        points={points} 
        color={color} 
        lineWidth={2}
      />
      <Line 
        points={arrowHeadPoints} 
        color={color} 
        lineWidth={2}
      />
      
      {label && (
        <Text
          position={[
            midpoint[0] + labelOffset[0],
            midpoint[1] + labelOffset[1],
            midpoint[2] + labelOffset[2]
          ]}
          fontSize={0.2}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  );
};

const ProcessFlow = () => {
  // Define process flow connections and labels
  const flows = [
    {
      start: [LAYOUT.feedTank[0] + 0.5, LAYOUT.feedTank[1] + 0.2, LAYOUT.feedTank[2] - 0.5],
      end: [LAYOUT.reactor[0] - 0.5, LAYOUT.reactor[1] + 0.2, LAYOUT.reactor[2] - 0.5],
      color: "#66ccff",
      label: "Oli Bekas",
      labelOffset: [0, 0.4, 0]
    },
    {
      start: [LAYOUT.reactor[0] + 0.5, LAYOUT.reactor[1] + 0.2, LAYOUT.reactor[2] - 0.5],
      end: [LAYOUT.condenser[0] - 0.5, LAYOUT.condenser[1] + 0.2, LAYOUT.condenser[2] - 0.5],
      color: "#ffaa44",
      label: "Uap Hidrokarbon",
      labelOffset: [0, 0.4, 0]
    },
    {
      start: [LAYOUT.condenser[0] + 0.5, LAYOUT.condenser[1] + 0.2, LAYOUT.condenser[2] - 0.5],
      end: [LAYOUT.separationTank[0] - 0.5, LAYOUT.separationTank[1] + 0.2, LAYOUT.separationTank[2] - 0.5],
      color: "#44aaff",
      label: "Kondensat",
      labelOffset: [0, 0.4, 0]
    },
    {
      start: [LAYOUT.separationTank[0], LAYOUT.separationTank[1] + 0.5, LAYOUT.separationTank[2] - 0.2],
      end: [LAYOUT.gasTank[0], LAYOUT.gasTank[1] + 0.5, LAYOUT.gasTank[2] + 0.5],
      color: "#88ffaa",
      label: "Gas",
      labelOffset: [0, 0.4, 0]
    },
    {
      start: [LAYOUT.separationTank[0] + 0.5, LAYOUT.separationTank[1] - 0.2, LAYOUT.separationTank[2] - 0.5],
      end: [LAYOUT.oilTank[0] - 0.5, LAYOUT.oilTank[1] - 0.2, LAYOUT.oilTank[2] - 0.5],
      color: "#aa6622",
      label: "Minyak",
      labelOffset: [0, 0.4, 0]
    }
  ];
  
  return (
    <group>
      {flows.map((flow, index) => (
        <FlowArrow 
          key={index}
          start={flow.start}
          end={flow.end}
          color={flow.color}
          label={flow.label}
          labelOffset={flow.labelOffset}
        />
      ))}
      
      {/* Process temperature indicators */}
      <Text
        position={[LAYOUT.reactor[0], LAYOUT.reactor[1] + 1.8, LAYOUT.reactor[2]]}
        fontSize={0.25}
        color="#ff4422"
        anchorX="center"
        anchorY="middle"
      >
        400-600°C
      </Text>
      
      <Text
        position={[LAYOUT.condenser[0], LAYOUT.condenser[1] + 1.5, LAYOUT.condenser[2]]}
        fontSize={0.25}
        color="#44aaff"
        anchorX="center"
        anchorY="middle"
      >
        25-40°C
      </Text>
    </group>
  );
};

export default ProcessFlow;
