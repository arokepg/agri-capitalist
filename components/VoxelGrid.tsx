'use client';

import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '@/store/GameStore';
import { CropVoxelByType } from './CropVoxels';
import { AnimalVoxelByType } from './AnimalVoxels';
import { StructureVoxel } from './StructureVoxels';
import { animated, useSpring, useSprings } from '@react-spring/three';

function AnimatedAsset({ children, type, content, isNew, shouldDestroy, shouldHarvest }: { 
  children: React.ReactNode; 
  type: string; 
  content: string; 
  isNew?: boolean;
  shouldDestroy?: boolean;
  shouldHarvest?: boolean;
}) {
  const [showRipple, setShowRipple] = useState(false);
  const [showPoof, setShowPoof] = useState(false);

  // Stage 1-2-3: v4.4 SPEC - Drop from sky (y:5) with elastic bounce (scale 1.2 → 1.0) + ripple
  const placementSpring = useSpring({
    from: { scale: isNew ? 0 : 1, posY: isNew ? 5 : 0 },
    to: async (next) => {
      if (isNew) {
        // Stage 2: Elastic bounce to 1.2 overshoot
        await next({ scale: 1.2, posY: 0 });
        // Stage 3: Settle to 1.0 + trigger ripple
        await next({ scale: 1.0, posY: 0 });
        setShowRipple(true);
        setTimeout(() => setShowRipple(false), 600);
      } else {
        await next({ scale: 1, posY: 0 });
      }
    },
    config: { tension: 280, friction: 12 }
  });

  // Destruction animation: shake, scale to 0, rise up
  const destructionSpring = useSpring({
    from: { scale: 1, posY: 0, rotZ: 0 },
    to: async (next) => {
      if (shouldDestroy) {
        // Stage 1: Shake
        await next({ rotZ: 0.1 });
        await next({ rotZ: -0.1 });
        await next({ rotZ: 0.1 });
        await next({ rotZ: 0 });
        // Stage 2: Scale to 0 and rise
        setShowPoof(true);
        await next({ scale: 0, posY: 2, rotZ: 0 });
      }
    },
    config: { tension: 300, friction: 20 }
  });

  // Harvest disappearance: sink into ground
  const harvestSpring = useSpring({
    from: { scale: 1, posY: 0 },
    to: shouldHarvest ? { scale: 0, posY: -2 } : { scale: 1, posY: 0 },
    config: { duration: 500 }
  });

  const [rippleSpring, rippleApi] = useSpring(() => ({
    o: 0,
    config: { duration: 600 }
  }));

  const [poofSprings, poofApi] = useSprings(5, () => ({
    posY: 0,
    scale: 0.1,
    opacity: 0
  }));

  useEffect(() => {
    if (showRipple) {
      rippleApi.start({ from: { o: 0.8 }, to: { o: 0 } });
    }
  }, [showRipple, rippleApi]);

  useEffect(() => {
    if (showPoof) {
      poofApi.start((index) => ({
        from: { posY: 0, scale: 0.1, opacity: 0.8 },
        to: { posY: 1.5, scale: 0.3, opacity: 0 },
        delay: index * 60,
        config: { duration: 800 }
      }));
    }
  }, [showPoof, poofApi]);

  const finalSpring = shouldDestroy ? destructionSpring : shouldHarvest ? harvestSpring : placementSpring;

  return (
    <>
      <animated.group 
        scale={finalSpring.scale} 
        position-y={finalSpring.posY}
        rotation-z={shouldDestroy ? destructionSpring.rotZ : 0}
      >
        {children}
      </animated.group>

      {/* Stage 3: Impact ripple on placement (v4.4 SPEC) */}
      {showRipple && (
        <animated.mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[0.3, 0.6, 32]} />
          <animated.meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={rippleSpring.o}
            emissive="#ffffff"
            emissiveIntensity={0.6}
          />
        </animated.mesh>
      )}

      {/* Stage 3: Smoke poof particles on destruction */}
      {showPoof && poofSprings.map((poofSpring, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <animated.mesh 
            key={i} 
            position-x={Math.cos(angle) * 0.3}
            position-y={poofSpring.posY}
            position-z={Math.sin(angle) * 0.3}
            scale={poofSpring.scale}
          >
            <sphereGeometry args={[0.15, 8, 8]} />
            <animated.meshStandardMaterial 
              color="#f8fafc" 
              transparent 
              opacity={poofSpring.opacity}
            />
          </animated.mesh>
        );
      })}
    </>
  );
}

interface VoxelTileProps {
  x: number;
  z: number;
  type: 'EMPTY' | 'CROP' | 'LIVESTOCK' | 'STRUCTURE';
  content: string | null;
  health: number;
  livestockCount: number;
  isDrought: boolean;
}

function VoxelTile({ x, z, type, content, health, livestockCount, isDrought }: VoxelTileProps) {
  const [hovered, setHovered] = useState(false);
  const [isNewAsset, setIsNewAsset] = useState(false);
  const [shouldDestroy, setShouldDestroy] = useState(false);
  const prevContentRef = useRef<string | null>(null);
  const armedItem = useGameStore(state => state.armedItem);
  const interactionMode = useGameStore(state => state.interactionMode);
  const placeArmedItem = useGameStore(state => state.placeArmedItem);
  const liquidateAsset = useGameStore(state => state.liquidateAsset);
  const renovateAsset = useGameStore(state => state.renovateAsset);

  // Detect new asset placement and destruction
  useEffect(() => {
    // New asset placed
    if (content && prevContentRef.current !== content) {
      setIsNewAsset(true);
      const timer = setTimeout(() => setIsNewAsset(false), 1500);
      return () => clearTimeout(timer);
    }
    // Asset destroyed (had content, now null)
    if (!content && prevContentRef.current) {
      setShouldDestroy(true);
      const timer = setTimeout(() => {
        setShouldDestroy(false);
        prevContentRef.current = content;
      }, 2000);
      return () => clearTimeout(timer);
    }
    prevContentRef.current = content;
  }, [content]);
  
  // New Color Palette: #99ff66 healthy, #d2b48c dry
  const getColor = () => {
    if (type === 'EMPTY') {
      if (isDrought) {
        return hovered ? '#c4a57b' : '#d2b48c'; // Dry grass
      }
      return hovered ? '#a8ff77' : '#99ff66'; // Healthy grass
    }
    if (type === 'CROP') {
      return '#FFD700'; // Sunny yellow wheat
    }
    if (type === 'LIVESTOCK') {
      return '#e8d4b8'; // Light tan for pens
    }
    if (type === 'STRUCTURE') {
      return '#94a3b8'; // Gray for structures
    }
    return '#99ff66';
  };

  const handleClick = () => {
    if (interactionMode === 'PLANT' && type === 'EMPTY' && armedItem) {
      placeArmedItem(x, z);
    } else if (interactionMode === 'SELL' && type !== 'EMPTY') {
      liquidateAsset(x, z);
    } else if (interactionMode === 'RENOVATE' && type === 'STRUCTURE') {
      renovateAsset(x, z);
    }
  };

  return (
    <group position={[x, 0, z]}>
      {/* Base tile with cheerful colors */}
      <mesh
        position={[0, 0, 0]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.95, 0.25, 0.95]} />
        <meshStandardMaterial 
          color={getColor()} 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Hover highlight ring */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.13, 0]}
        scale={1}
      >
        <ringGeometry args={[0.55, 0.65, 32]} />
        <meshStandardMaterial
          color="#60a5fa"
          transparent
          opacity={hovered ? 0.35 : 0}
          emissive="#60a5fa"
          emissiveIntensity={hovered ? 0.4 : 0}
        />
      </mesh>

      {/* Crop voxels with scale-pop animation */}
      {type === 'CROP' && content && (
        <AnimatedAsset type="crop" content={content} isNew={isNewAsset} shouldDestroy={shouldDestroy}>
          <CropVoxelByType cropType={content} />
        </AnimatedAsset>
      )}

      {/* Livestock voxels with scale-pop animation */}
      {type === 'LIVESTOCK' && livestockCount > 0 && content && (
        <>
          {Array.from({ length: Math.min(livestockCount, 4) }).map((_, i) => (
            <AnimatedAsset key={`${content}-${i}`} type="animal" content={`${content}-${i}`} isNew={isNewAsset} shouldDestroy={shouldDestroy}>
              <AnimalVoxelByType animalType={content} index={i} />
            </AnimatedAsset>
          ))}
        </>
      )}

      {/* Structure voxels with scale-pop animation */}
      {type === 'STRUCTURE' && content && (
        <AnimatedAsset type="structure" content={content} isNew={isNewAsset} shouldDestroy={shouldDestroy}>
          <StructureVoxel structureType={content} />
        </AnimatedAsset>
      )}
    </group>
  );
}

export default function VoxelGrid() {
  const grid = useGameStore(state => state.grid);
  const gridSize = useGameStore(state => state.gridSize);
  const isDrought = useGameStore(state => state.isDrought);

  const half = (gridSize - 1) / 2;

  return (
    <group position={[-half, 0, -half]}>
      {grid.map(tile => (
        <VoxelTile
          key={tile.id}
          x={tile.x}
          z={tile.z}
          type={tile.type}
          content={tile.content}
          health={tile.health}
          livestockCount={tile.livestockCount}
          isDrought={isDrought}
        />
      ))}
    </group>
  );
}
