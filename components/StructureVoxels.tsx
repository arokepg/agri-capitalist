'use client';

// Exportable Structure Voxels for use in InspectionModal and VoxelGrid

export function StructureVoxel({ structureType }: { structureType: string }) {
  // STANDARD STRUCTURES
  if (structureType === 'well') {
    return (
      <group position={[0, 0.15, 0]}>
        {/* Well stone ring base */}
        <mesh position={[0, 0.18, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.32, 0.36, 12]} />
          <meshStandardMaterial color="#57534e" roughness={0.9} metalness={0.05} />
        </mesh>
        
        {/* Stone texture details */}
        {[0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3].map((angle, i) => (
          <mesh key={`stone-${i}`} position={[Math.cos(angle) * 0.3, 0.2 + i * 0.06, Math.sin(angle) * 0.3]} castShadow>
            <boxGeometry args={[0.1, 0.05, 0.08]} />
            <meshStandardMaterial color="#78716c" roughness={0.95} metalness={0} />
          </mesh>
        ))}
        
        {/* Well rim - decorative top */}
        <mesh position={[0, 0.38, 0]} castShadow>
          <cylinderGeometry args={[0.34, 0.34, 0.08, 12]} />
          <meshStandardMaterial color="#44403c" roughness={0.85} metalness={0.1} />
        </mesh>
        
        {/* Inner rim detail */}
        <mesh position={[0, 0.41, 0]} castShadow>
          <cylinderGeometry args={[0.31, 0.31, 0.02, 12]} />
          <meshStandardMaterial color="#292524" roughness={0.9} metalness={0.05} />
        </mesh>
        
        {/* Water inside */}
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.18, 12]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.2} metalness={0.4} />
        </mesh>
        
        {/* Wooden support post */}
        <mesh position={[0.28, 0.55, 0]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <meshStandardMaterial color="#78350f" roughness={0.85} metalness={0} />
        </mesh>
        <mesh position={[-0.28, 0.55, 0]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <meshStandardMaterial color="#78350f" roughness={0.85} metalness={0} />
        </mesh>
        
        {/* Horizontal beam connecting posts */}
        <mesh position={[0, 0.88, 0]} castShadow>
          <boxGeometry args={[0.62, 0.06, 0.06]} />
          <meshStandardMaterial color="#92400e" roughness={0.85} metalness={0} />
        </mesh>
        
        {/* Rope drum */}
        <mesh position={[0, 0.88, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.15, 8]} />
          <meshStandardMaterial color="#57534e" roughness={0.7} metalness={0.2} />
        </mesh>
        
        {/* Bucket (hanging) */}
        <mesh position={[0.15, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.06, 0.12, 8]} />
          <meshStandardMaterial color="#78716c" roughness={0.8} metalness={0.15} />
        </mesh>
        
        {/* Rope */}
        <mesh position={[0.15, 0.68, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.35, 6]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} metalness={0} />
        </mesh>
      </group>
    );
  }

  // UPGRADED: Deep Well with pump system
  if (structureType === 'well_upgraded') {
    return (
      <group position={[0, 0.15, 0]}>
        {/* Reinforced concrete ring (modern design) */}
        <mesh position={[0, 0.28, 0]} castShadow>
          <cylinderGeometry args={[0.32, 0.36, 0.56, 16]} />
          <meshStandardMaterial color="#d1d5db" roughness={0.65} metalness={0.15} />
        </mesh>
        
        {/* Concrete texture panels */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <mesh key={`panel-${i}`} position={[Math.cos(angle) * 0.35, 0.3, Math.sin(angle) * 0.35]} castShadow>
            <boxGeometry args={[0.08, 0.5, 0.05]} />
            <meshStandardMaterial color="#9ca3af" roughness={0.7} metalness={0.1} />
          </mesh>
        ))}
        
        {/* Steel rim with industrial bolts */}
        <mesh position={[0, 0.58, 0]} castShadow>
          <cylinderGeometry args={[0.38, 0.38, 0.1, 16]} />
          <meshStandardMaterial color="#1f2937" roughness={0.4} metalness={0.75} />
        </mesh>
        
        {/* Bolt details around rim */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 2 * Math.PI) / 8;
          return (
            <mesh key={`bolt-${i}`} position={[Math.cos(angle) * 0.36, 0.58, Math.sin(angle) * 0.36]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.12, 6]} />
              <meshStandardMaterial color="#52525b" roughness={0.5} metalness={0.6} />
            </mesh>
          );
        })}
        
        {/* Deep clean water (aqua blue) */}
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.25, 16]} />
          <meshStandardMaterial color="#06b6d4" roughness={0.15} metalness={0.45} />
        </mesh>
        
        {/* Electric pump motor housing */}
        <mesh position={[0.38, 0.4, 0]} castShadow>
          <boxGeometry args={[0.18, 0.24, 0.18]} />
          <meshStandardMaterial color="#111827" roughness={0.35} metalness={0.8} />
        </mesh>
        
        {/* Pump vents */}
        {[-0.05, 0, 0.05].map((yOff, i) => (
          <mesh key={`vent-${i}`} position={[0.47, 0.4 + yOff, 0]} castShadow>
            <boxGeometry args={[0.02, 0.015, 0.12]} />
            <meshStandardMaterial color="#374151" roughness={0.6} metalness={0.5} />
          </mesh>
        ))}
        
        {/* Pump intake pipe */}
        <mesh position={[0.38, 0.62, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.38, 12]} />
          <meshStandardMaterial color="#4b5563" roughness={0.35} metalness={0.75} />
        </mesh>
        
        {/* Pipe joint */}
        <mesh position={[0.38, 0.82, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.08, 12]} />
          <meshStandardMaterial color="#374151" roughness={0.4} metalness={0.7} />
        </mesh>
        
        {/* Solar panel array with modern mount */}
        <mesh position={[-0.4, 0.5, 0]} rotation={[-Math.PI / 12, 0, 0]} castShadow>
          <boxGeometry args={[0.02, 0.35, 0.06]} />
          <meshStandardMaterial color="#18181b" roughness={0.6} metalness={0.4} />
        </mesh>
        <mesh position={[-0.4, 0.68, 0]} rotation={[Math.PI / 5, 0, 0]} castShadow>
          <boxGeometry args={[0.28, 0.22, 0.025]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.25} metalness={0.6} />
        </mesh>
        
        {/* Solar panel grid lines */}
        {[-0.06, 0, 0.06].map((xOff, i) => (
          <mesh key={`grid-${i}`} position={[-0.4 + xOff, 0.68, 0]} rotation={[Math.PI / 5, 0, 0]} castShadow>
            <boxGeometry args={[0.015, 0.22, 0.03]} />
            <meshStandardMaterial color="#1e40af" roughness={0.2} metalness={0.7} />
          </mesh>
        ))}
        
        {/* Digital control panel */}
        <mesh position={[0, 0.3, 0.4]} castShadow>
          <boxGeometry args={[0.16, 0.2, 0.08]} />
          <meshStandardMaterial color="#27272a" roughness={0.4} metalness={0.7} />
        </mesh>
        
        {/* Control panel screen */}
        <mesh position={[0, 0.32, 0.44]} castShadow>
          <boxGeometry args={[0.12, 0.08, 0.01]} />
          <meshStandardMaterial color="#06b6d4" roughness={0.2} metalness={0.5} emissive="#06b6d4" emissiveIntensity={0.3} />
        </mesh>
        
        {/* Control buttons */}
        {[-0.04, 0, 0.04].map((xOff, i) => (
          <mesh key={`btn-${i}`} position={[xOff, 0.25, 0.44]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.01, 8]} />
            <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.6} />
          </mesh>
        ))}
        
        {/* Water outlet pipe */}
        <mesh position={[0.15, 0.55, 0.3]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.15, 12]} />
          <meshStandardMaterial color="#6b7280" roughness={0.4} metalness={0.7} />
        </mesh>
      </group>
    );
  }
  
  if (structureType === 'fence') {
    return (
      <group position={[0, 0.15, 0]}>
        {/* Fence posts with caps */}
        {[-0.38, -0.13, 0.13, 0.38].map((xOffset, i) => (
          <group key={`post-group-${i}`}>
            <mesh position={[xOffset, 0.28, 0]} castShadow>
              <boxGeometry args={[0.08, 0.56, 0.08]} />
              <meshStandardMaterial color="#78350f" roughness={0.9} metalness={0} />
            </mesh>
            {/* Post cap */}
            <mesh position={[xOffset, 0.58, 0]} castShadow>
              <boxGeometry args={[0.1, 0.04, 0.1]} />
              <meshStandardMaterial color="#92400e" roughness={0.85} metalness={0.05} />
            </mesh>
            {/* Wood grain detail */}
            <mesh position={[xOffset + 0.041, 0.28, 0]} castShadow>
              <boxGeometry args={[0.01, 0.54, 0.06]} />
              <meshStandardMaterial color="#92400e" roughness={0.95} metalness={0} />
            </mesh>
          </group>
        ))}
        
        {/* Three horizontal rails */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.85, 0.05, 0.05]} />
          <meshStandardMaterial color="#57534e" roughness={0.9} metalness={0} />
        </mesh>
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.85, 0.05, 0.05]} />
          <meshStandardMaterial color="#57534e" roughness={0.9} metalness={0} />
        </mesh>
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[0.85, 0.05, 0.05]} />
          <meshStandardMaterial color="#57534e" roughness={0.9} metalness={0} />
        </mesh>
        
        {/* Diagonal braces for authenticity */}
        <mesh position={[-0.24, 0.28, 0]} rotation={[0, 0, Math.PI / 5]} castShadow>
          <boxGeometry args={[0.28, 0.04, 0.04]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} metalness={0} />
        </mesh>
        <mesh position={[0.24, 0.28, 0]} rotation={[0, 0, -Math.PI / 5]} castShadow>
          <boxGeometry args={[0.28, 0.04, 0.04]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} metalness={0} />
        </mesh>
      </group>
    );
  }

  // UPGRADED: Steel Fence with security features
  if (structureType === 'fence_upgraded') {
    return (
      <group position={[0, 0.13, 0]}>
        {/* Four reinforced steel posts (taller) */}
        {[-0.35, -0.12, 0.12, 0.35].map((xOffset, i) => (
          <mesh key={`post-${i}`} position={[xOffset, 0.35, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.7, 8]} />
            <meshStandardMaterial color="#374151" roughness={0.4} metalness={0.8} />
          </mesh>
        ))}
        {/* Lower steel bar */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.85, 0.05, 0.05]} />
          <meshStandardMaterial color="#4b5563" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Middle steel bar */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.85, 0.05, 0.05]} />
          <meshStandardMaterial color="#4b5563" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Upper steel bar */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[0.85, 0.05, 0.05]} />
          <meshStandardMaterial color="#4b5563" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Barbed wire on top */}
        {[-0.3, -0.1, 0.1, 0.3].map((xOffset, i) => (
          <mesh key={`wire-${i}`} position={[xOffset, 0.68, 0]} castShadow>
            <boxGeometry args={[0.02, 0.08, 0.02]} />
            <meshStandardMaterial color="#9ca3af" roughness={0.2} metalness={0.9} />
          </mesh>
        ))}
        {/* Security camera */}
        <mesh position={[0.4, 0.65, 0]} castShadow>
          <boxGeometry args={[0.08, 0.06, 0.1]} />
          <meshStandardMaterial color="#1f2937" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Warning sign */}
        <mesh position={[0, 0.35, 0.08]} castShadow>
          <boxGeometry args={[0.12, 0.12, 0.02]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.6} />
        </mesh>
      </group>
    );
  }
  
  if (structureType === 'silo') {
    return (
      <group position={[0, 0.13, 0]}>
        {/* Main silo body */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.3, 1.1, 12]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.6} metalness={0.3} />
        </mesh>
        {/* Metal bands */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.31, 0.31, 0.05, 12]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.65, 0]} castShadow>
          <cylinderGeometry args={[0.29, 0.29, 0.05, 12]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Conical roof */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <coneGeometry args={[0.32, 0.3, 12]} />
          <meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.4} />
        </mesh>
        {/* Door */}
        <mesh position={[0, 0.3, 0.31]} castShadow>
          <boxGeometry args={[0.15, 0.35, 0.02]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
      </group>
    );
  }

  // UPGRADED: Climate-Controlled Silo with modern features
  if (structureType === 'silo_upgraded') {
    return (
      <group position={[0, 0.13, 0]}>
        {/* Main silo body (taller, sleeker) */}
        <mesh position={[0, 0.65, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.32, 1.3, 16]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Reinforced metal bands (more defined) */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.33, 0.33, 0.06, 16]} />
          <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.31, 0.31, 0.06, 16]} />
          <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0, 1.1, 0]} castShadow>
          <cylinderGeometry args={[0.29, 0.29, 0.06, 16]} />
          <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Modern dome roof (instead of cone) */}
        <mesh position={[0, 1.38, 0]} castShadow>
          <sphereGeometry args={[0.32, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Automated door with window */}
        <mesh position={[0, 0.35, 0.33]} castShadow>
          <boxGeometry args={[0.18, 0.45, 0.02]} />
          <meshStandardMaterial color="#1f2937" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Door window */}
        <mesh position={[0, 0.45, 0.34]} castShadow>
          <boxGeometry args={[0.12, 0.15, 0.01]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.1} metalness={0.1} transparent opacity={0.6} />
        </mesh>
        {/* Climate control unit */}
        <mesh position={[0.35, 0.6, 0]} castShadow>
          <boxGeometry args={[0.12, 0.15, 0.18]} />
          <meshStandardMaterial color="#374151" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Ventilation fans */}
        <mesh position={[0.35, 0.6, 0.05]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 6]} />
          <meshStandardMaterial color="#6b7280" roughness={0.4} metalness={0.7} />
        </mesh>
        <mesh position={[0.35, 0.6, -0.05]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 6]} />
          <meshStandardMaterial color="#6b7280" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Temperature sensor array */}
        <mesh position={[-0.33, 0.9, 0]} castShadow>
          <boxGeometry args={[0.08, 0.12, 0.06]} />
          <meshStandardMaterial color="#22c55e" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Loading auger/conveyor */}
        <mesh position={[0, 0.1, -0.35]} rotation={[Math.PI / 4, 0, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
          <meshStandardMaterial color="#78350f" roughness={0.6} metalness={0.3} />
        </mesh>
      </group>
    );
  }

  // CLINIC: Medical facility structure
  if (structureType === 'clinic') {
    return (
      <group position={[0, 0.13, 0]}>
        {/* Main building base */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.7, 0.5, 0.6]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.8} />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 0.55, 0]} castShadow rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.5, 0.2, 4]} />
          <meshStandardMaterial color="#dc2626" roughness={0.6} />
        </mesh>
        {/* Red cross on front */}
        <mesh position={[0, 0.3, 0.31]} castShadow>
          <boxGeometry args={[0.08, 0.2, 0.02]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        <mesh position={[0, 0.3, 0.31]} castShadow>
          <boxGeometry args={[0.2, 0.08, 0.02]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        {/* Windows */}
        <mesh position={[0.2, 0.35, 0.31]} castShadow>
          <boxGeometry args={[0.12, 0.12, 0.01]} />
          <meshStandardMaterial color="#60a5fa" roughness={0.2} />
        </mesh>
        <mesh position={[-0.2, 0.35, 0.31]} castShadow>
          <boxGeometry args={[0.12, 0.12, 0.01]} />
          <meshStandardMaterial color="#60a5fa" roughness={0.2} />
        </mesh>
        {/* Door */}
        <mesh position={[0, 0.15, 0.31]} castShadow>
          <boxGeometry args={[0.15, 0.25, 0.02]} />
          <meshStandardMaterial color="#92400e" />
        </mesh>
      </group>
    );
  }
  
  if (structureType === 'barn') {
    return (
      <group position={[0, 0.2, 0]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.8, 0.6, 0.7]} />
          <meshStandardMaterial color="#eab308" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.7, 0]} castShadow rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.65, 0.25, 4]} />
          <meshStandardMaterial color="#b45309" />
        </mesh>
        <mesh position={[0, 0.25, 0.36]} castShadow>
          <boxGeometry args={[0.18, 0.28, 0.04]} />
          <meshStandardMaterial color="#92400e" />
        </mesh>
        <mesh position={[0, 0.55, 0.36]} castShadow>
          <boxGeometry args={[0.14, 0.14, 0.02]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
      </group>
    );
  }

  if (structureType === 'comm_tower') {
    return (
      <group position={[0, 0.25, 0]}>
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.2, 0.5, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.55, 0]} castShadow>
          <coneGeometry args={[0.3, 0.3, 8]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        {[0, 1, 2].map(i => (
          <mesh key={i} position={[0, 0.15 + i * 0.18, 0]} castShadow>
            <torusGeometry args={[0.32 + i * 0.04, 0.01, 8, 16]} />
            <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.4} />
          </mesh>
        ))}
      </group>
    );
  }

  if (structureType === 'paved_road') {
    return (
      <group position={[0, 0.08, 0]}>
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[1, 0.16, 1]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.09, 0]} receiveShadow>
          <boxGeometry args={[0.1, 0.02, 1]} />
          <meshStandardMaterial color="#eab308" />
        </mesh>
      </group>
    );
  }

  // POND - Deep-set square reservoir tile
  if (structureType === 'pond') {
    return (
      <group position={[0, 0.1, 0]}>
        {/* Deep square reservoir - lowered into ground */}
        <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.75, 0.2, 0.75]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.15} metalness={0.45} />
        </mesh>
        
        {/* Concrete/stone walls on sides */}
        <mesh position={[0.38, 0.02, 0]} castShadow>
          <boxGeometry args={[0.02, 0.15, 0.75]} />
          <meshStandardMaterial color="#78716c" roughness={0.9} metalness={0.05} />
        </mesh>
        <mesh position={[-0.38, 0.02, 0]} castShadow>
          <boxGeometry args={[0.02, 0.15, 0.75]} />
          <meshStandardMaterial color="#78716c" roughness={0.9} metalness={0.05} />
        </mesh>
        <mesh position={[0, 0.02, 0.38]} castShadow>
          <boxGeometry args={[0.75, 0.15, 0.02]} />
          <meshStandardMaterial color="#78716c" roughness={0.9} metalness={0.05} />
        </mesh>
        <mesh position={[0, 0.02, -0.38]} castShadow>
          <boxGeometry args={[0.75, 0.15, 0.02]} />
          <meshStandardMaterial color="#78716c" roughness={0.9} metalness={0.05} />
        </mesh>
        
        {/* Rim cap - top edge */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[0.82, 0.02, 0.82]} />
          <meshStandardMaterial color="#57534e" roughness={0.85} metalness={0.1} />
        </mesh>
        
        {/* Water surface with ripple effect */}
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[0.72, 0.01, 0.72]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            roughness={0.1} 
            metalness={0.5} 
            transparent 
            opacity={0.7} 
          />
        </mesh>
      </group>
    );
  }

  // BARN - Open wooden frame with pitched roof
  if (structureType === 'barn') {
    return (
      <group position={[0, 0.2, 0]}>
        {/* Four corner posts - wooden frame */}
        {[
          [-0.3, 0.3, -0.25],
          [0.3, 0.3, -0.25],
          [-0.3, 0.3, 0.25],
          [0.3, 0.3, 0.25]
        ].map((pos, i) => (
          <mesh key={`post-${i}`} position={pos as [number, number, number]} castShadow>
            <boxGeometry args={[0.08, 0.6, 0.08]} />
            <meshStandardMaterial color="#78350f" roughness={0.9} metalness={0} />
          </mesh>
        ))}
        
        {/* Horizontal beams connecting posts */}
        <mesh position={[0, 0.58, -0.25]} castShadow>
          <boxGeometry args={[0.68, 0.06, 0.06]} />
          <meshStandardMaterial color="#92400e" roughness={0.9} metalness={0} />
        </mesh>
        <mesh position={[0, 0.58, 0.25]} castShadow>
          <boxGeometry args={[0.68, 0.06, 0.06]} />
          <meshStandardMaterial color="#92400e" roughness={0.9} metalness={0} />
        </mesh>
        <mesh position={[-0.3, 0.58, 0]} castShadow>
          <boxGeometry args={[0.06, 0.06, 0.56]} />
          <meshStandardMaterial color="#92400e" roughness={0.9} metalness={0} />
        </mesh>
        <mesh position={[0.3, 0.58, 0]} castShadow>
          <boxGeometry args={[0.06, 0.06, 0.56]} />
          <meshStandardMaterial color="#92400e" roughness={0.9} metalness={0} />
        </mesh>
        
        {/* Pitched roof - left side */}
        <mesh position={[-0.15, 0.75, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
          <boxGeometry args={[0.45, 0.04, 0.6]} />
          <meshStandardMaterial color="#b45309" roughness={0.8} metalness={0.05} />
        </mesh>
        
        {/* Pitched roof - right side */}
        <mesh position={[0.15, 0.75, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
          <boxGeometry args={[0.45, 0.04, 0.6]} />
          <meshStandardMaterial color="#b45309" roughness={0.8} metalness={0.05} />
        </mesh>
        
        {/* Ridge beam at top */}
        <mesh position={[0, 0.9, 0]} castShadow>
          <boxGeometry args={[0.06, 0.06, 0.62]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} metalness={0} />
        </mesh>
        
        {/* Wooden planks on sides for partial walls */}
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh key={`plank-back-${i}`} position={[0, 0.15 + i * 0.15, -0.26]} castShadow>
            <boxGeometry args={[0.6, 0.08, 0.04]} />
            <meshStandardMaterial color="#92400e" roughness={0.9} metalness={0} />
          </mesh>
        ))}
      </group>
    );
  }

  // WELL - Already exists above (stone-masonry cylinder with crank)
  // No changes needed - well is already defined

  // WATER AERATOR - Spinning paddle-wheel with particle splashes
  if (structureType === 'waterAerator') {
    return (
      <group position={[0, 0.15, 0]}>
        {/* Central motor housing - gray metal box */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.22, 0.18, 0.22]} />
          <meshStandardMaterial color="#4b5563" roughness={0.4} metalness={0.75} />
        </mesh>
        
        {/* Motor vents - dark slits */}
        {[-0.05, 0, 0.05].map((yOff, i) => (
          <mesh key={`vent-${i}`} position={[0.12, 0.12 + yOff, 0]} castShadow>
            <boxGeometry args={[0.02, 0.02, 0.18]} />
            <meshStandardMaterial color="#1f2937" roughness={0.6} metalness={0.5} />
          </mesh>
        ))}
        
        {/* Vertical axle extending down into water */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.25, 8]} />
          <meshStandardMaterial color="#374151" roughness={0.4} metalness={0.8} />
        </mesh>
        
        {/* Paddle wheel - three blades rotating */}
        {[0, Math.PI * 2 / 3, Math.PI * 4 / 3].map((angle, i) => (
          <mesh 
            key={`blade-${i}`} 
            position={[
              Math.cos(angle) * 0.2, 
              -0.05, 
              Math.sin(angle) * 0.2
            ]} 
            rotation={[0, angle + Math.PI / 2, 0]}
            castShadow
          >
            <boxGeometry args={[0.25, 0.08, 0.04]} />
            <meshStandardMaterial color="#6b7280" roughness={0.35} metalness={0.75} />
          </mesh>
        ))}
        
        {/* Blade edge reinforcement */}
        {[0, Math.PI * 2 / 3, Math.PI * 4 / 3].map((angle, i) => (
          <mesh 
            key={`edge-${i}`} 
            position={[
              Math.cos(angle) * 0.2, 
              -0.05, 
              Math.sin(angle) * 0.2
            ]} 
            rotation={[0, angle + Math.PI / 2, 0]}
            castShadow
          >
            <boxGeometry args={[0.26, 0.02, 0.05]} />
            <meshStandardMaterial color="#1f2937" roughness={0.3} metalness={0.8} />
          </mesh>
        ))}
        
        {/* Water splash particles around base */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 0.3 + Math.random() * 0.1;
          return (
            <mesh 
              key={`splash-${i}`} 
              position={[
                Math.cos(angle) * radius, 
                -0.08 + Math.random() * 0.05, 
                Math.sin(angle) * radius
              ]}
            >
              <boxGeometry args={[0.02, 0.03, 0.02]} />
              <meshStandardMaterial 
                color="#3b82f6" 
                transparent 
                opacity={0.6} 
                roughness={0.2} 
                metalness={0.3} 
              />
            </mesh>
          );
        })}
        
        {/* Floating buoys/supports */}
        {[0, Math.PI / 2, Math.PI, Math.PI * 3 / 2].map((angle, i) => (
          <mesh 
            key={`buoy-${i}`} 
            position={[
              Math.cos(angle) * 0.25, 
              -0.12, 
              Math.sin(angle) * 0.25
            ]}
            castShadow
          >
            <cylinderGeometry args={[0.04, 0.04, 0.08, 8]} />
            <meshStandardMaterial color="#fbbf24" roughness={0.7} metalness={0.15} />
          </mesh>
        ))}
      </group>
    );
  }

  return null;
}
