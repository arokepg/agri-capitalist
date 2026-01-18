'use client';

import * as THREE from 'three';

// Unique Voxel Meshes for Each Crop Type
// Paddy Rice | Sugarcane | Dragon Fruit | Durian

interface CropVoxelProps {
  cropType: string;
}

// PADDY RICE - Densely packed golden-yellow stalks with wind-sway animation
function PaddyRiceVoxel({ cropType }: CropVoxelProps) {
  return (
    <group>
      {/* Dense cluster of golden-yellow rice stalks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.08 + Math.random() * 0.05;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const height = 0.5 + Math.random() * 0.1;
        
        return (
          <group key={`stalk-${i}`} position={[x, 0, z]}>
            {/* Stalk */}
            <mesh position={[0, height / 2, 0]} castShadow>
              <boxGeometry args={[0.025, height, 0.025]} />
              <meshStandardMaterial color="#d4af37" roughness={0.7} metalness={0.1} />
            </mesh>
            {/* Grain head */}
            <mesh position={[0, height, 0]} castShadow>
              <boxGeometry args={[0.04, 0.08, 0.04]} />
              <meshStandardMaterial color="#fbbf24" roughness={0.6} metalness={0.15} />
            </mesh>
          </group>
        );
      })}
      
      {/* Center cluster for density */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={`center-${i}`} position={[Math.random() * 0.04 - 0.02, 0.3, Math.random() * 0.04 - 0.02]} castShadow>
          <boxGeometry args={[0.03, 0.6, 0.03]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.7} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

// SUGARCANE - Tall, segmented green stalks with sharp leaves
function SugarcaneVoxel({ cropType }: CropVoxelProps) {
  return (
    <group>
      {/* Main tall segmented stalk */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`segment-${i}`} position={[0, 0.15 + i * 0.18, 0]} castShadow>
          <boxGeometry args={[0.1, 0.16, 0.1]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#15803d" : "#16a34a"} 
            roughness={0.6} 
            metalness={0.1} 
          />
        </mesh>
      ))}
      
      {/* Segment rings (nodes) */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={`ring-${i}`} position={[0, 0.23 + i * 0.18, 0]} castShadow>
          <boxGeometry args={[0.12, 0.02, 0.12]} />
          <meshStandardMaterial color="#14532d" roughness={0.8} metalness={0} />
        </mesh>
      ))}
      
      {/* Sharp leaves at top - pointing upward and outward */}
      {[
        { angle: 0, height: 1.15 },
        { angle: Math.PI / 2, height: 1.12 },
        { angle: Math.PI, height: 1.14 },
        { angle: (3 * Math.PI) / 2, height: 1.13 }
      ].map((leaf, i) => (
        <mesh 
          key={`leaf-${i}`} 
          position={[
            Math.cos(leaf.angle) * 0.12, 
            leaf.height, 
            Math.sin(leaf.angle) * 0.12
          ]} 
          rotation={[Math.PI / 6, leaf.angle, 0]} 
          castShadow
        >
          <boxGeometry args={[0.3, 0.04, 0.08]} />
          <meshStandardMaterial color="#22c55e" roughness={0.65} metalness={0.05} />
        </mesh>
      ))}
      
      {/* Secondary stalk */}
      <mesh position={[0.08, 0.5, 0.08]} castShadow>
        <boxGeometry args={[0.08, 1, 0.08]} />
        <meshStandardMaterial color="#166534" roughness={0.6} metalness={0.1} />
      </mesh>
    </group>
  );
}

// DRAGON FRUIT - Green vines draping over a concrete pillar with pink fruits
function DragonFruitVoxel({ cropType }: CropVoxelProps) {
  return (
    <group>
      {/* Concrete support pillar - gray stone */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 1, 0.12]} />
        <meshStandardMaterial color="#9ca3af" roughness={0.9} metalness={0.1} />
      </mesh>
      
      {/* Pillar texture details */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={`texture-${i}`} position={[0, 0.2 + i * 0.22, 0]} castShadow>
          <boxGeometry args={[0.13, 0.02, 0.13]} />
          <meshStandardMaterial color="#6b7280" roughness={0.95} metalness={0} />
        </mesh>
      ))}
      
      {/* Green vines draping down the pillar */}
      {[
        { x: 0.08, y: 0.9, z: 0, rot: Math.PI / 12 },
        { x: -0.08, y: 0.85, z: 0, rot: -Math.PI / 12 },
        { x: 0, y: 0.88, z: 0.08, rot: 0 },
        { x: 0, y: 0.82, z: -0.08, rot: 0 }
      ].map((vine, i) => (
        <group key={`vine-${i}`}>
          <mesh position={[vine.x, vine.y, vine.z]} rotation={[0, 0, vine.rot]} castShadow>
            <boxGeometry args={[0.06, 0.5, 0.06]} />
            <meshStandardMaterial color="#16a34a" roughness={0.6} metalness={0.05} />
          </mesh>
          {/* Vine segments */}
          {Array.from({ length: 3 }).map((_, j) => (
            <mesh 
              key={`seg-${j}`} 
              position={[vine.x, vine.y - j * 0.15, vine.z]} 
              castShadow
            >
              <boxGeometry args={[0.05, 0.03, 0.05]} />
              <meshStandardMaterial color="#14532d" roughness={0.7} metalness={0} />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* Pink dragon fruits hanging from vines */}
      <mesh position={[0.12, 0.7, 0.08]} castShadow>
        <boxGeometry args={[0.15, 0.18, 0.15]} />
        <meshStandardMaterial color="#ec4899" roughness={0.4} metalness={0.15} />
      </mesh>
      
      {/* Green leafy scales on fruit */}
      {[
        [0.18, 0.78, 0.08],
        [0.06, 0.78, 0.08],
        [0.12, 0.78, 0.14],
        [0.12, 0.78, 0.02]
      ].map((pos, i) => (
        <mesh key={`scale-${i}`} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.05, 0.06, 0.05]} />
          <meshStandardMaterial color="#86efac" roughness={0.5} metalness={0.1} />
        </mesh>
      ))}
      
      {/* Second fruit */}
      <mesh position={[-0.1, 0.6, -0.1]} castShadow>
        <boxGeometry args={[0.13, 0.16, 0.13]} />
        <meshStandardMaterial color="#f472b6" roughness={0.4} metalness={0.15} />
      </mesh>
      
      {/* Developing fruit (smaller) */}
      <mesh position={[0.08, 0.85, -0.08]} castShadow>
        <boxGeometry args={[0.08, 0.1, 0.08]} />
        <meshStandardMaterial color="#be185d" roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
}

// DURIAN - Spiky green husks hanging from wooden branches
function DurianVoxel({ cropType }: CropVoxelProps) {
  return (
    <group>
      {/* Main wooden trunk */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.12, 0.8, 0.12]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} metalness={0} />
      </mesh>
      
      {/* Wood grain texture */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={`grain-${i}`} position={[0, 0.15 + i * 0.15, 0]} castShadow>
          <boxGeometry args={[0.13, 0.02, 0.13]} />
          <meshStandardMaterial color="#451a03" roughness={0.95} metalness={0} />
        </mesh>
      ))}
      
      {/* Thick wooden branches extending outward */}
      <mesh position={[0.15, 0.65, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <boxGeometry args={[0.25, 0.08, 0.08]} />
        <meshStandardMaterial color="#92400e" roughness={0.9} metalness={0} />
      </mesh>
      
      <mesh position={[-0.14, 0.6, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        <boxGeometry args={[0.23, 0.08, 0.08]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} metalness={0} />
      </mesh>
      
      <mesh position={[0, 0.68, 0.14]} rotation={[Math.PI / 6, 0, 0]} castShadow>
        <boxGeometry args={[0.08, 0.08, 0.22]} />
        <meshStandardMaterial color="#92400e" roughness={0.9} metalness={0} />
      </mesh>
      
      {/* Large spiky light green/yellow durian hanging from right branch */}
      <mesh position={[0.22, 0.55, 0.08]} castShadow>
        <boxGeometry args={[0.18, 0.2, 0.18]} />
        <meshStandardMaterial color="#a3e635" roughness={0.7} metalness={0.05} />
      </mesh>
      
      {/* Dense spikes covering the durian */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 0.11;
        return (
          <mesh 
            key={`spike-${i}`} 
            position={[
              0.22 + Math.cos(angle) * radius, 
              0.55, 
              0.08 + Math.sin(angle) * radius
            ]} 
            rotation={[0, angle, Math.PI / 2]}
            castShadow
          >
            <boxGeometry args={[0.06, 0.03, 0.03]} />
            <meshStandardMaterial color="#bef264" roughness={0.8} metalness={0} />
          </mesh>
        );
      })}
      
      {/* Top and bottom spikes */}
      <mesh position={[0.22, 0.65, 0.08]} castShadow>
        <boxGeometry args={[0.03, 0.08, 0.03]} />
        <meshStandardMaterial color="#bef264" roughness={0.8} metalness={0} />
      </mesh>
      <mesh position={[0.22, 0.45, 0.08]} castShadow>
        <boxGeometry args={[0.03, 0.08, 0.03]} />
        <meshStandardMaterial color="#bef264" roughness={0.8} metalness={0} />
      </mesh>
      
      {/* Second durian hanging from left branch */}
      <mesh position={[-0.18, 0.48, -0.06]} castShadow>
        <boxGeometry args={[0.16, 0.18, 0.16]} />
        <meshStandardMaterial color="#84cc16" roughness={0.7} metalness={0.05} />
      </mesh>
      
      {/* Spikes on second durian */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.09;
        return (
          <mesh 
            key={`spike2-${i}`} 
            position={[
              -0.18 + Math.cos(angle) * radius, 
              0.48, 
              -0.06 + Math.sin(angle) * radius
            ]} 
            rotation={[0, angle, Math.PI / 2]}
            castShadow
          >
            <boxGeometry args={[0.05, 0.03, 0.03]} />
            <meshStandardMaterial color="#d9f99d" roughness={0.8} metalness={0} />
          </mesh>
        );
      })}
      
      {/* Stem connecting fruit to branch */}
      <mesh position={[0.22, 0.62, 0.08]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.04]} />
        <meshStandardMaterial color="#92400e" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[-0.18, 0.55, -0.06]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.04]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}

// Selector component
export function CropVoxelByType({ cropType }: CropVoxelProps) {
  switch(cropType) {
    case 'paddyRice':
    case 'rice':
    case 'paddy':
      return <PaddyRiceVoxel cropType={cropType} />;
    case 'sugarcane':
    case 'sugar':
      return <SugarcaneVoxel cropType={cropType} />;
    case 'dragonFruit':
    case 'dragonfruit':
    case 'dragon':
      return <DragonFruitVoxel cropType={cropType} />;
    case 'durian':
      return <DurianVoxel cropType={cropType} />;
    default:
      return <PaddyRiceVoxel cropType="paddyRice" />;
  }
}
