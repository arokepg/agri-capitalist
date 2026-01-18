'use client';

// v5.4 SPEC: ALL ANIMALS ARE STATIC - NO HOPPING ANIMATIONS
// ANIMALS: Duck (white, orange beak) | Fish (silver, water plane) | Pig (pink, curled tail) | Shrimp (translucent orange, antennae)
// Placement/Destruction/Harvest animations handled by parent VoxelGrid AnimatedAsset wrapper

interface AnimalVoxelProps {
  animalType: string;
  index: number;
}

// DUCK - White low-poly body with orange beak
function DuckVoxel({ index }: { index: number }) {
  const positions = [[0, 0], [0.3, 0.3], [-0.3, 0.3], [0.3, -0.3]];
  const [offsetX, offsetZ] = positions[index] || [0, 0];

  return (
    <group position={[offsetX, 0.28, offsetZ]}>
      {/* White body - rounded/oval shape */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.2, 0.18, 0.26]} />
        <meshStandardMaterial color="#fafafa" roughness={0.75} metalness={0.05} />
      </mesh>
      
      {/* Wing details on sides */}
      <mesh position={[0.12, 0, 0]} castShadow>
        <boxGeometry args={[0.05, 0.16, 0.24]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.8} metalness={0} />
      </mesh>
      <mesh position={[-0.12, 0, 0]} castShadow>
        <boxGeometry args={[0.05, 0.16, 0.24]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.8} metalness={0} />
      </mesh>
      
      {/* Head - white, slightly smaller */}
      <mesh position={[0, 0.14, 0.14]} castShadow>
        <boxGeometry args={[0.16, 0.16, 0.16]} />
        <meshStandardMaterial color="#fafafa" roughness={0.75} metalness={0.05} />
      </mesh>
      
      {/* Orange beak pointing forward */}
      <mesh position={[0, 0.14, 0.23]} castShadow>
        <boxGeometry args={[0.06, 0.05, 0.08]} />
        <meshStandardMaterial color="#f97316" roughness={0.65} metalness={0.15} />
      </mesh>
      
      {/* Black eye spots */}
      <mesh position={[0.05, 0.16, 0.19]} castShadow>
        <boxGeometry args={[0.025, 0.025, 0.02]} />
        <meshStandardMaterial color="#18181b" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[-0.05, 0.16, 0.19]} castShadow>
        <boxGeometry args={[0.025, 0.025, 0.02]} />
        <meshStandardMaterial color="#18181b" roughness={0.5} metalness={0.3} />
      </mesh>
      
      {/* Orange webbed feet */}
      <mesh position={[-0.06, -0.1, 0]} castShadow>
        <boxGeometry args={[0.05, 0.12, 0.05]} />
        <meshStandardMaterial color="#f97316" roughness={0.75} metalness={0.1} />
      </mesh>
      <mesh position={[0.06, -0.1, 0]} castShadow>
        <boxGeometry args={[0.05, 0.12, 0.05]} />
        <meshStandardMaterial color="#f97316" roughness={0.75} metalness={0.1} />
      </mesh>
      
      {/* Webbed foot pads */}
      <mesh position={[-0.06, -0.17, 0.02]} castShadow>
        <boxGeometry args={[0.07, 0.02, 0.1]} />
        <meshStandardMaterial color="#ea580c" roughness={0.8} metalness={0.05} />
      </mesh>
      <mesh position={[0.06, -0.17, 0.02]} castShadow>
        <boxGeometry args={[0.07, 0.02, 0.1]} />
        <meshStandardMaterial color="#ea580c" roughness={0.8} metalness={0.05} />
      </mesh>
      
      {/* Small tail feathers */}
      <mesh position={[0, 0.06, -0.16]} rotation={[-Math.PI / 6, 0, 0]} castShadow>
        <boxGeometry args={[0.14, 0.12, 0.04]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.8} metalness={0} />
      </mesh>
    </group>
  );
}
// FISH - Animated silver fish beneath a water plane
function FishVoxel({ index }: { index: number }) {
  const positions = [[0, 0], [0.3, 0.3], [-0.3, 0.3], [0.3, -0.3]];
  const [offsetX, offsetZ] = positions[index] || [0, 0];

  return (
    <group position={[offsetX, 0.25, offsetZ]}>
      {/* Water surface plane - semi-transparent blue */}
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <boxGeometry args={[0.45, 0.02, 0.45]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          roughness={0.1} 
          metalness={0.4} 
          transparent 
          opacity={0.6} 
        />
      </mesh>
      
      {/* Fish body - sleek silver, swimming beneath surface */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[0.22, 0.08, 0.12]} />
        <meshStandardMaterial color="#d1d5db" roughness={0.3} metalness={0.7} />
      </mesh>
      
      {/* Fish head - pointed */}
      <mesh position={[0, 0.05, 0.08]} castShadow>
        <boxGeometry args={[0.18, 0.07, 0.08]} />
        <meshStandardMaterial color="#e5e7eb" roughness={0.3} metalness={0.7} />
      </mesh>
      
      {/* Tail fin - wider at end */}
      <mesh position={[0, 0.05, -0.1]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.14, 0.1, 0.04]} />
        <meshStandardMaterial color="#9ca3af" roughness={0.35} metalness={0.65} />
      </mesh>
      
      {/* Top dorsal fin */}
      <mesh position={[0, 0.1, 0.02]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.1, 0.06, 0.04]} />
        <meshStandardMaterial color="#9ca3af" roughness={0.35} metalness={0.65} />
      </mesh>
      
      {/* Side pectoral fins */}
      <mesh position={[0.09, 0.04, 0.03]} rotation={[0, Math.PI / 6, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.08, 0.05, 0.02]} />
        <meshStandardMaterial color="#a1a1aa" roughness={0.35} metalness={0.65} />
      </mesh>
      <mesh position={[-0.09, 0.04, 0.03]} rotation={[0, -Math.PI / 6, -Math.PI / 4]} castShadow>
        <boxGeometry args={[0.08, 0.05, 0.02]} />
        <meshStandardMaterial color="#a1a1aa" roughness={0.35} metalness={0.65} />
      </mesh>
      
      {/* Eye spots - black dots */}
      <mesh position={[0.06, 0.06, 0.09]} castShadow>
        <boxGeometry args={[0.02, 0.02, 0.02]} />
        <meshStandardMaterial color="#18181b" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[-0.06, 0.06, 0.09]} castShadow>
        <boxGeometry args={[0.02, 0.02, 0.02]} />
        <meshStandardMaterial color="#18181b" roughness={0.5} metalness={0.3} />
      </mesh>
      
      {/* Water depth indicator - darker blue beneath */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[0.4, 0.15, 0.4]} />
        <meshStandardMaterial 
          color="#1e40af" 
          roughness={0.2} 
          metalness={0.3} 
          transparent 
          opacity={0.4} 
        />
      </mesh>
    </group>
  );
}

function PigVoxel({ index }: { index: number }) {
  const positions = [[0, 0], [0.3, 0.3], [-0.3, 0.3], [0.3, -0.3]];
  const [offsetX, offsetZ] = positions[index] || [0, 0];

  return (
    <group position={[offsetX, 0.32, offsetZ]}>
      {/* Round pink body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.24, 0.2, 0.32]} />
        <meshStandardMaterial color="#fda4af" roughness={0.65} metalness={0.15} />
      </mesh>
      
      {/* Belly */}
      <mesh position={[0, -0.08, 0]} castShadow>
        <boxGeometry args={[0.22, 0.06, 0.3]} />
        <meshStandardMaterial color="#fecdd3" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Pig head */}
      <mesh position={[0, 0.08, 0.24]} castShadow>
        <boxGeometry args={[0.18, 0.18, 0.18]} />
        <meshStandardMaterial color="#fb7185" roughness={0.65} metalness={0.15} />
      </mesh>
      
      {/* Large snout */}
      <mesh position={[0, 0.08, 0.34]} castShadow>
        <boxGeometry args={[0.14, 0.12, 0.06]} />
        <meshStandardMaterial color="#f43f5e" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Nostrils */}
      <mesh position={[0.04, 0.1, 0.37]} castShadow>
        <boxGeometry args={[0.03, 0.04, 0.02]} />
        <meshStandardMaterial color="#be123c" roughness={0.8} metalness={0} />
      </mesh>
      <mesh position={[-0.04, 0.1, 0.37]} castShadow>
        <boxGeometry args={[0.03, 0.04, 0.02]} />
        <meshStandardMaterial color="#be123c" roughness={0.8} metalness={0} />
      </mesh>
      
      {/* Triangle ears */}
      <mesh position={[-0.1, 0.18, 0.22]} rotation={[Math.PI / 8, 0, -Math.PI / 4]} castShadow>
        <boxGeometry args={[0.1, 0.08, 0.03]} />
        <meshStandardMaterial color="#fb7185" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[0.1, 0.18, 0.22]} rotation={[Math.PI / 8, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.1, 0.08, 0.03]} />
        <meshStandardMaterial color="#fb7185" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Eye details */}
      <mesh position={[0.05, 0.12, 0.3]} castShadow>
        <boxGeometry args={[0.03, 0.03, 0.02]} />
        <meshStandardMaterial color="#18181b" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[-0.05, 0.12, 0.3]} castShadow>
        <boxGeometry args={[0.03, 0.03, 0.02]} />
        <meshStandardMaterial color="#18181b" roughness={0.5} metalness={0.3} />
      </mesh>
      
      {/* Short legs with hooves */}
      {[
        [-0.1, -0.12, -0.1],
        [0.1, -0.12, -0.1],
        [-0.1, -0.12, 0.1],
        [0.1, -0.12, 0.1]
      ].map((pos, i) => (
        <group key={i}>
          <mesh position={pos as [number, number, number]} castShadow>
            <boxGeometry args={[0.06, 0.14, 0.06]} />
            <meshStandardMaterial color="#fda4af" roughness={0.7} metalness={0.1} />
          </mesh>
          <mesh position={[pos[0], pos[1] - 0.1, pos[2]]} castShadow>
            <boxGeometry args={[0.07, 0.04, 0.07]} />
            <meshStandardMaterial color="#f43f5e" roughness={0.8} metalness={0.05} />
          </mesh>
        </group>
      ))}
      
      {/* Curly tail */}
      <mesh position={[0, 0.1, -0.2]} rotation={[Math.PI / 3, 0, 0]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.04]} />
        <meshStandardMaterial color="#fb7185" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[0.03, 0.15, -0.22]} rotation={[Math.PI / 2, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.04, 0.06, 0.04]} />
        <meshStandardMaterial color="#fb7185" roughness={0.7} metalness={0.1} />
      </mesh>
    </group>
  );
}

// SHRIMP - Translucent orange shells with thin antennae
function ShrimpVoxel({ index }: { index: number }) {
  const positions = [[0, 0], [0.3, 0.3], [-0.3, 0.3], [0.3, -0.3]];
  const [offsetX, offsetZ] = positions[index] || [0, 0];

  return (
    <group position={[offsetX, 0.2, offsetZ]}>
      {/* Water surface - transparent blue shimmer */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[0.4, 0.02, 0.4]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          roughness={0.15} 
          metalness={0.35} 
          transparent 
          opacity={0.55} 
        />
      </mesh>
      
      {/* Shrimp body - segmented translucent orange shell */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh 
          key={`segment-${i}`} 
          position={[0, 0.02 - i * 0.015, 0.08 - i * 0.04]} 
          castShadow
        >
          <boxGeometry args={[0.08 + i * 0.01, 0.05, 0.035]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#fb923c" : "#fdba74"} 
            roughness={0.25} 
            metalness={0.2} 
            transparent 
            opacity={0.85} 
          />
        </mesh>
      ))}
      
      {/* Head segment - larger, more opaque */}
      <mesh position={[0, 0.03, 0.11]} castShadow>
        <boxGeometry args={[0.1, 0.06, 0.05]} />
        <meshStandardMaterial 
          color="#f97316" 
          roughness={0.3} 
          metalness={0.25} 
          transparent 
          opacity={0.9} 
        />
      </mesh>
      
      {/* Long thin antennae extending forward and up */}
      <mesh position={[0.03, 0.08, 0.13]} rotation={[Math.PI / 6, 0, Math.PI / 8]} castShadow>
        <boxGeometry args={[0.015, 0.15, 0.015]} />
        <meshStandardMaterial color="#c2410c" roughness={0.6} metalness={0.15} />
      </mesh>
      <mesh position={[-0.03, 0.08, 0.13]} rotation={[Math.PI / 6, 0, -Math.PI / 8]} castShadow>
        <boxGeometry args={[0.015, 0.15, 0.015]} />
        <meshStandardMaterial color="#c2410c" roughness={0.6} metalness={0.15} />
      </mesh>
      
      {/* Shorter antennae - middle pair */}
      <mesh position={[0.02, 0.06, 0.13]} rotation={[Math.PI / 4, 0, Math.PI / 12]} castShadow>
        <boxGeometry args={[0.012, 0.1, 0.012]} />
        <meshStandardMaterial color="#ea580c" roughness={0.6} metalness={0.15} />
      </mesh>
      <mesh position={[-0.02, 0.06, 0.13]} rotation={[Math.PI / 4, 0, -Math.PI / 12]} castShadow>
        <boxGeometry args={[0.012, 0.1, 0.012]} />
        <meshStandardMaterial color="#ea580c" roughness={0.6} metalness={0.15} />
      </mesh>
      
      {/* Swimming legs (pleopods) - small segments on sides */}
      {Array.from({ length: 4 }).map((_, i) => (
        <group key={`legs-${i}`}>
          <mesh 
            position={[0.06, 0.01 - i * 0.015, 0.06 - i * 0.04]} 
            rotation={[0, 0, Math.PI / 3]}
            castShadow
          >
            <boxGeometry args={[0.04, 0.01, 0.01]} />
            <meshStandardMaterial 
              color="#fb923c" 
              roughness={0.4} 
              metalness={0.1} 
              transparent 
              opacity={0.7} 
            />
          </mesh>
          <mesh 
            position={[-0.06, 0.01 - i * 0.015, 0.06 - i * 0.04]} 
            rotation={[0, 0, -Math.PI / 3]}
            castShadow
          >
            <boxGeometry args={[0.04, 0.01, 0.01]} />
            <meshStandardMaterial 
              color="#fb923c" 
              roughness={0.4} 
              metalness={0.1} 
              transparent 
              opacity={0.7} 
            />
          </mesh>
        </group>
      ))}
      
      {/* Tail fan - three segments */}
      <mesh position={[0, -0.05, -0.1]} rotation={[Math.PI / 6, 0, 0]} castShadow>
        <boxGeometry args={[0.12, 0.08, 0.02]} />
        <meshStandardMaterial 
          color="#fdba74" 
          roughness={0.25} 
          metalness={0.2} 
          transparent 
          opacity={0.8} 
        />
      </mesh>
      
      {/* Black eye spots */}
      <mesh position={[0.03, 0.05, 0.13]} castShadow>
        <boxGeometry args={[0.015, 0.015, 0.015]} />
        <meshStandardMaterial color="#18181b" roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[-0.03, 0.05, 0.13]} castShadow>
        <boxGeometry args={[0.015, 0.015, 0.015]} />
        <meshStandardMaterial color="#18181b" roughness={0.4} metalness={0.4} />
      </mesh>
      
      {/* Deeper water layer beneath */}
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <boxGeometry args={[0.35, 0.18, 0.35]} />
        <meshStandardMaterial 
          color="#1e40af" 
          roughness={0.25} 
          metalness={0.25} 
          transparent 
          opacity={0.35} 
        />
      </mesh>
    </group>
  );
}

// Selector component
export function AnimalVoxelByType({ animalType, index }: AnimalVoxelProps) {
  switch(animalType) {
    case 'duck':
      return <DuckVoxel index={index} />;
    case 'fish':
      return <FishVoxel index={index} />;
    case 'pig':
      return <PigVoxel index={index} />;
    case 'shrimp':
      return <ShrimpVoxel index={index} />;
    default:
      return <DuckVoxel index={index} />;
  }
}
