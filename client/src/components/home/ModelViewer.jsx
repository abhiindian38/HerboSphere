import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Model = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);
  scene.scale.set(1.5, 1.5, 1.5);
  
  return <primitive object={scene} />;
};

const ModelViewer = ({ modelUrl }) => {
  return (
    <Canvas style={{ width: '100%', height: '500px' }}>
      <ambientLight intensity={0.8} color="#ffffff" />
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={1.5} 
        color="#ffffff" 
        castShadow 
      />
      <spotLight 
        position={[15, 20, 10]} 
        angle={0.3} 
        intensity={2} 
        penumbra={1} 
        castShadow 
      />

      <Suspense fallback={null}>
        <Model modelUrl={modelUrl} />
      </Suspense>

      <OrbitControls 
        autoRotate 
        autoRotateSpeed={0.5} 
        enableZoom={true} 
        minDistance={2} 
        maxDistance={10} 
        target={[0, 0, 0]}
      />
    </Canvas>
  );
};

export default ModelViewer;
