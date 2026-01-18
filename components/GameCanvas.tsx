'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import VoxelGrid from './VoxelGrid';
import * as THREE from 'three';

// v4.4 SPEC: Full-screen canvas (100vw × 100vh) with light blue background (#ADD8E6)
// Camera: Orthographic isometric [10,10,10] with 45° intro spin over 2.5s
// Ground: #8fb895 at y:-0.002, 400×400 plane for precision grounding
// Field: Centered with HUD offset calculation to avoid top/bottom bar overlap
// Camera Intro Animation Component
function CameraIntro() {
  const { camera } = useThree();
  const animationProgress = useRef(0);
  const hasAnimated = useRef(false);
  const startVec = useRef(new THREE.Vector3(10, 10, 10).applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 4));
  const targetVec = useRef(new THREE.Vector3(10, 10, 10));

  useFrame((state, delta) => {
    if (hasAnimated.current) return;

    animationProgress.current += delta / 2.5; // 2.5 seconds duration

    if (animationProgress.current < 1) {
      // Ease-out function: 1 - (1-t)^3
      const t = animationProgress.current;
      const easeOut = 1 - Math.pow(1 - t, 3);

      const pos = new THREE.Vector3().lerpVectors(startVec.current, targetVec.current, easeOut);
      camera.position.copy(pos);

      camera.lookAt(0, 0, 0);
    } else {
      hasAnimated.current = true;
      camera.position.copy(targetVec.current);
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

export default function GameCanvas() {
  const [ready, setReady] = useState(false);
  const [centerOffset, setCenterOffset] = useState(0);

  useLayoutEffect(() => {
    const updateOffsets = () => {
      const top = document.getElementById('hud-layer-top');
      const bottom = document.getElementById('command-center-bar');
      const topH = top?.clientHeight ?? 0;
      const bottomH = bottom?.clientHeight ?? 0;
      const available = window.innerHeight - topH - bottomH;
      const imbalance = topH - bottomH;
      setCenterOffset((imbalance / 2) / 50); // scale down to world units
    };
    updateOffsets();
    window.addEventListener('resize', updateOffsets);
    return () => window.removeEventListener('resize', updateOffsets);
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        orthographic
        camera={{
          zoom: 50,
          position: [14.142, 10, 0], // Start position rotated -45° around Y
          near: 0.1,
          far: 1000
        }}
        shadows
        style={{ width: '100%', height: '100%', background: '#ADD8E6' }}
        onCreated={() => setReady(true)}
      >
        {/* Camera Intro Animation */}
        <CameraIntro />

        {/* Softer lighting to reduce shadow darkness */}
        <ambientLight intensity={0.9} />
        <directionalLight 
          position={[10, 15, 5]} 
          intensity={0.85} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-bias={-0.0005}
        />
        <directionalLight 
          position={[-5, 10, -5]} 
          intensity={0.1}
        />

        {/* Ground Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.002, 0]} receiveShadow>
          <planeGeometry args={[400, 400]} />
          <meshStandardMaterial color="#8fb895" roughness={0.88} />
        </mesh>

        {/* Voxel Farm Grid centered with HUD offset */}
        <group position={[0, centerOffset, 0]}>
          <VoxelGrid />
        </group>

        {/* Camera Controls with damping and constraints */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={0.05}
          minZoom={30}
          maxZoom={100}
          maxPolarAngle={Math.PI / 3} // Lock upper constraint
          minPolarAngle={Math.PI / 4} // Lock lower constraint (isometric)
        />
      </Canvas>

      {/* Loading Overlay */}
      <AnimatePresence>
        {!ready && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: ready ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#ADD8E6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                border: '4px solid rgba(75, 85, 99, 0.2)',
                borderTopColor: '#4b5563'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
