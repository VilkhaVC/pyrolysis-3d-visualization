import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './App.css';

// Import components
import PyrolysisScene from './components/PyrolysisScene';
import InfoPanel from './components/InfoPanel';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div className="App">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [10, 6, 10], fov: 50 }}>
        <color attach="background" args={['#222']} />
        <fog attach="fog" args={['#222', 30, 100]} />
        <ambientLight intensity={0.2} />
        <directionalLight
          castShadow
          position={[10, 20, 15]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <spotLight intensity={0.5} position={[-10, 20, -10]} angle={0.15} penumbra={1} castShadow />
        
        <Suspense fallback={null}>
          <PyrolysisScene setSelectedComponent={setSelectedComponent} />
          {/* Using a simple color environment instead of HDR */}
          <ambientLight intensity={0.5} />
          <hemisphereLight intensity={0.7} color="#88ccff" groundColor="#080820" />
        </Suspense>
        
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <PerspectiveCamera makeDefault position={[10, 6, 10]} fov={50} />
      </Canvas>
      
      {showInfo && <InfoPanel selectedComponent={selectedComponent} setShowInfo={setShowInfo} />}
      {!showInfo && (
        <button 
          className="show-info-button" 
          onClick={() => setShowInfo(true)}
        >
          Show Info
        </button>
      )}
      
      <div className="title-header">
        <h1>Proses Pirolisis Oli Bekas - 3D Visualization</h1>
      </div>
      
      <LoadingScreen />
    </div>
  );
}

export default App;
