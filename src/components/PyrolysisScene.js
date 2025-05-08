import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

// Process components
import FeedTank from './models/FeedTank';
import Reactor from './models/Reactor';
import Condenser from './models/Condenser';
import SeparationTank from './models/SeparationTank';
import GasTank from './models/GasTank';
import OilTank from './models/OilTank';
import Pipes from './models/Pipes';
import ControlPanel from './models/ControlPanel';
import ProcessFlow from './models/ProcessFlow';

// Process layout coordinates
const LAYOUT = {
  feedTank: [-6, 0, -2],
  reactor: [-2, 0, 0],
  condenser: [2, 0, 0],
  separationTank: [6, 0, 0],
  gasTank: [6, 0, -4],
  oilTank: [8, 0, 0],
  controlPanel: [-7, 0, 4],
  floor: [0, -1, 0]
};

function PyrolysisScene({ setSelectedComponent }) {
  const groupRef = useRef();
  
  // Optional animation
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing animation for the scene
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
    }
  });

  // Handler for component selection
  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
  };

  return (
    <group ref={groupRef}>
      {/* Floor/base for the setup */}
      <mesh 
        position={LAYOUT.floor} 
        rotation={[-Math.PI / 2, 0, 0]} 
        receiveShadow
      >
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Process equipment */}
      <FeedTank 
        position={LAYOUT.feedTank} 
        onClick={() => handleComponentSelect({
          name: 'Feed Tank',
          description: 'Tangki penyimpanan oli bekas yang akan diproses melalui pirolisis.',
          function: 'Menyimpan dan menyediakan umpan oli bekas ke dalam reaktor.',
          specs: 'Kapasitas 200 liter, dilengkapi dengan pengaduk dan pemanas awal.'
        })}
      />
      
      <Reactor 
        position={LAYOUT.reactor} 
        onClick={() => handleComponentSelect({
          name: 'Reaktor Pirolisis',
          description: 'Tempat proses pirolisis terjadi dengan pemanasan dan dekomposisi termal pada suhu tinggi (400-600°C).',
          function: 'Mengkonversi oli bekas menjadi uap hidrokarbon melalui dekomposisi termal tanpa kehadiran oksigen.',
          specs: 'Reaktor stainless steel dengan kapasitas 100 liter, pemanas eksternal hingga 600°C, dilengkapi sensor suhu dan tekanan.'
        })}
      />
      
      <Condenser 
        position={LAYOUT.condenser} 
        onClick={() => handleComponentSelect({
          name: 'Kondenser',
          description: 'Alat penukar panas untuk mengubah uap hidrokarbon menjadi cairan.',
          function: 'Mendinginkan uap hasil pirolisis sehingga terkondensasi menjadi cairan.',
          specs: 'Shell and tube heat exchanger dengan media pendingin air, kapasitas pendinginan 10 kW.'
        })}
      />
      
      <SeparationTank 
        position={LAYOUT.separationTank} 
        onClick={() => handleComponentSelect({
          name: 'Tangki Pemisah',
          description: 'Memisahkan fase cair dan gas dari hasil kondensasi.',
          function: 'Memisahkan produk menjadi fraksi cair (minyak) dan gas yang tidak terkondensasi.',
          specs: 'Kapasitas 100 liter, dilengkapi dengan katup pemisah dan sensor level.'
        })}
      />
      
      <GasTank 
        position={LAYOUT.gasTank} 
        onClick={() => handleComponentSelect({
          name: 'Tangki Gas',
          description: 'Menampung gas hasil proses pirolisis yang tidak terkondensasi.',
          function: 'Menyimpan gas hidrokarbon ringan yang dapat digunakan sebagai bahan bakar.',
          specs: 'Kapasitas 50 liter, tekanan maksimal 10 bar, dilengkapi pressure relief valve.'
        })}
      />
      
      <OilTank 
        position={LAYOUT.oilTank} 
        onClick={() => handleComponentSelect({
          name: 'Tangki Minyak',
          description: 'Menampung produk minyak hasil pirolisis.',
          function: 'Menyimpan minyak pirolisis yang dapat digunakan sebagai bahan bakar alternatif.',
          specs: 'Kapasitas 150 liter, dilengkapi dengan pompa transfer dan filter.'
        })}
      />
      
      <ControlPanel 
        position={LAYOUT.controlPanel} 
        onClick={() => handleComponentSelect({
          name: 'Panel Kontrol',
          description: 'Sistem kontrol dan monitoring seluruh proses pirolisis.',
          function: 'Mengatur dan memantau parameter proses seperti suhu, tekanan, dan aliran.',
          specs: 'PLC-based control system dengan HMI touchscreen, data logging dan alarm system.'
        })}
      />
      
      {/* Connecting pipes between components */}
      <Pipes />

      {/* Process flow indicators (arrows, etc) */}
      <ProcessFlow />

      {/* Labels for major components */}
      <Html position={[...LAYOUT.feedTank, 1.5]} distanceFactor={15}>
        <div className="equipment-label">Feed Tank</div>
      </Html>
      <Html position={[...LAYOUT.reactor, 1.5]} distanceFactor={15}>
        <div className="equipment-label">Reactor</div>
      </Html>
      <Html position={[...LAYOUT.condenser, 1.5]} distanceFactor={15}>
        <div className="equipment-label">Condenser</div>
      </Html>
      <Html position={[...LAYOUT.separationTank, 1.5]} distanceFactor={15}>
        <div className="equipment-label">Separation Tank</div>
      </Html>
    </group>
  );
}

export default PyrolysisScene;
