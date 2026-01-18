'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { CropVoxelByType } from './CropVoxels';
import { AnimalVoxelByType } from './AnimalVoxels';
import { StructureVoxel } from './StructureVoxels';
import { CoinIcon, WarningIcon } from './FinancialIconSet';
import { XIcon } from './IconLibrary';

interface InspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetType: 'crop' | 'animal' | 'structure' | null;
  assetId: string | null;
  assetName: string | null;
  price: number;
}

// Asset catalog with descriptions and functions
const ASSET_INFO: Record<string, {
  description: string;
  function: string;
  category: string;
  tier?: string;
  riskWarning?: string;
}> = {
  corn: {
    description: 'A staple crop with reliable yields. Hardy and drought-resistant.',
    function: 'Generates $80-120 revenue per harvest depending on market conditions.',
    category: 'CROP',
    tier: 'Standard'
  },
  wheat: {
    description: 'Golden grain with high market value. Sensitive to weather events.',
    function: 'Generates $150-200 revenue. Correlates with Wheat-Futures stock.',
    category: 'CROP',
    tier: 'Standard'
  },
  coffee: {
    description: 'Luxury cash crop requiring careful maintenance. High profit margins.',
    function: 'Generates $400-500 revenue. Immune to drought with Well irrigation.',
    category: 'CROP',
    tier: 'Premium'
  },
  cotton: {
    description: 'High-volatility textile crop. Vulnerable to market crashes.',
    function: 'Generates $250-350 revenue. Subject to 20% price swings.',
    category: 'CROP',
    tier: 'Volatile',
    riskWarning: 'High market volatility - protect with Crop Insurance'
  },
  chicken: {
    description: 'Fast-breeding poultry. Low investment, steady returns.',
    function: 'Generates $15-25 per head. Multiplies by 1.5x each turn.',
    category: 'LIVESTOCK',
    tier: 'Standard'
  },
  pig: {
    description: 'Medium-yield livestock. Requires moderate maintenance.',
    function: 'Generates $100-150 per head. Multiplies by 1.3x each turn.',
    category: 'LIVESTOCK',
    tier: 'Standard'
  },
  cow: {
    description: 'Large cattle with high dairy and meat value. Slow reproduction.',
    function: 'Generates $300-400 per head. Multiplies by 1.2x each turn.',
    category: 'LIVESTOCK',
    tier: 'Premium'
  },
  sheep: {
    description: 'Wool-producing livestock. Dual-income stream from wool and meat.',
    function: 'Generates $200-250 per head. +$50 wool bonus with Barn.',
    category: 'LIVESTOCK',
    tier: 'Standard'
  },
  well: {
    description: 'Traditional irrigation system. Essential for drought survival.',
    function: 'Grants DROUGHT IMMUNITY to adjacent tiles (3x3 radius).',
    category: 'INFRASTRUCTURE',
    tier: 'Standard'
  },
  well_upgraded: {
    description: 'Deep well with electric pump and solar power. Advanced irrigation.',
    function: 'Grants DROUGHT IMMUNITY to entire field + 20% yield bonus.',
    category: 'INFRASTRUCTURE',
    tier: 'Upgraded'
  },
  fence: {
    description: 'Wooden perimeter fence. Basic security against theft.',
    function: 'Reduces livestock loss from theft events by 50%.',
    category: 'INFRASTRUCTURE',
    tier: 'Standard'
  },
  fence_upgraded: {
    description: 'Reinforced steel fence with barbed wire and security camera.',
    function: 'COMPLETE immunity to theft events + Police Raid detection.',
    category: 'INFRASTRUCTURE',
    tier: 'Upgraded'
  },
  silo: {
    description: 'Grain storage facility. Reduces spoilage losses.',
    function: 'Prevents 30% of crop depreciation. Stores up to 500 units.',
    category: 'INFRASTRUCTURE',
    tier: 'Standard'
  },
  silo_upgraded: {
    description: 'Climate-controlled silo with automated systems.',
    function: 'Prevents 60% of crop depreciation + 10% yield bonus on harvest.',
    category: 'INFRASTRUCTURE',
    tier: 'Upgraded'
  },
  clinic: {
    description: 'Medical facility for livestock health management.',
    function: 'Prevents disease outbreaks. +25% livestock reproduction rate.',
    category: 'INFRASTRUCTURE',
    tier: 'Standard'
  }
};

// 3D Model Renderer Component
function AssetModelPreview({ assetType, assetId }: { assetType: string; assetId: string }) {
  if (assetType === 'crop') {
    return <CropVoxelByType cropType={assetId} />;
  }
  
  if (assetType === 'animal') {
    return <AnimalVoxelByType animalType={assetId} index={0} />;
  }
  
  if (assetType === 'structure') {
    return <StructureVoxel structureType={assetId} />;
  }
  
  return null;
}

const UPGRADE_MAP: Record<string, string> = {
  well: 'well_upgraded',
  fence: 'fence_upgraded',
  silo: 'silo_upgraded'
};

const DOWNGRADE_MAP: Record<string, string> = {
  well_upgraded: 'well',
  fence_upgraded: 'fence',
  silo_upgraded: 'silo'
};

export default function InspectionModal({
  isOpen,
  onClose,
  assetType,
  assetId,
  assetName,
  price
}: InspectionModalProps) {
  if (!assetType || !assetId || !assetName) return null;

  const [previewUpgrade, setPreviewUpgrade] = useState(false);

  useEffect(() => {
    if (assetType !== 'structure') {
      setPreviewUpgrade(false);
    }
  }, [assetType, assetId]);

  const resolvedId = (() => {
    if (assetType !== 'structure') return assetId;
    if (previewUpgrade && UPGRADE_MAP[assetId]) return UPGRADE_MAP[assetId];
    if (!previewUpgrade && DOWNGRADE_MAP[assetId]) return DOWNGRADE_MAP[assetId];
    return previewUpgrade ? UPGRADE_MAP[assetId] || assetId : assetId;
  })();

  const info = ASSET_INFO[resolvedId] || {
    description: 'No description available.',
    function: 'Unknown function.',
    category: 'UNKNOWN',
    tier: 'Standard'
  };

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const getTierColor = (tier?: string) => {
    switch (tier) {
      case 'Premium': return '#3b82f6';
      case 'Upgraded': return '#22c55e';
      case 'Volatile': return '#f59e0b';
      default: return '#64748b';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              zIndex: 1100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '90%',
                maxWidth: '800px',
                backgroundColor: 'rgba(248, 250, 252, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '40px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                color: '#0f172a',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* X Close Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  border: '2px solid rgba(100, 116, 139, 0.2)',
                  background: 'rgba(248, 250, 252, 0.9)',
                  color: '#0f172a',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                  zIndex: 10
                }}
              >
                <XIcon size={18} color="#334155" />
              </motion.button>

              {/* Content Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                {/* Left: 3D Preview */}
                <div>
                  <div style={{
                    width: '100%',
                    height: '400px',
                    backgroundColor: 'rgba(15, 23, 42, 0.05)',
                    borderRadius: '16px',
                    border: '2px solid rgba(100, 116, 139, 0.1)',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
                      <ambientLight intensity={0.6} />
                      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
                      <pointLight position={[-5, 5, 5]} intensity={0.4} />
                      <AssetModelPreview assetType={assetType} assetId={resolvedId} />
                      <OrbitControls 
                        enableZoom={true} 
                        enablePan={true}
                        autoRotate
                        autoRotateSpeed={2}
                        minDistance={2}
                        maxDistance={8}
                      />
                    </Canvas>
                    
                    {/* Tier Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      padding: '6px 12px',
                      backgroundColor: getTierColor(info.tier),
                      color: 'white',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                    }}>
                      {info.tier}
                    </div>
                  </div>

                  {/* Renovate Preview Toggle */}
                  {assetType === 'structure' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      style={{
                        marginTop: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '2px solid rgba(59, 130, 246, 0.2)',
                        background: 'rgba(59, 130, 246, 0.06)'
                      }}
                    >
                      <div style={{ color: '#1d4ed8', fontWeight: 700, fontSize: '13px', letterSpacing: '0.5px' }}>
                        Renovate Preview (Tier 2)
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPreviewUpgrade(prev => !prev)}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '2px solid rgba(59, 130, 246, 0.4)',
                          background: previewUpgrade ? 'rgba(59, 130, 246, 0.18)' : 'rgba(248, 250, 252, 0.9)',
                          color: previewUpgrade ? '#1d4ed8' : '#0f172a',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {previewUpgrade ? 'Showing Tier 2' : 'Show Tier 2'}
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Price */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      marginTop: '16px',
                      padding: '16px',
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      border: '2px solid rgba(34, 197, 94, 0.3)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CoinIcon size={20} color="#22c55e" />
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748b' }}>
                        Purchase Price
                      </span>
                    </div>
                    <span style={{ fontSize: '24px', fontWeight: '700', color: '#22c55e' }}>
                      {formatCurrency(price)}
                    </span>
                  </motion.div>
                </div>

                {/* Right: Information */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h2 style={{
                      fontSize: '32px',
                      fontWeight: '700',
                      margin: '0 0 8px 0',
                      color: '#0f172a'
                    }}>
                      {assetName}
                    </h2>
                    <p style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: '#64748b',
                      margin: 0
                    }}>
                      {info.category}
                    </p>
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    style={{
                      padding: '16px',
                      backgroundColor: 'rgba(100, 116, 139, 0.05)',
                      borderRadius: '12px',
                      border: '1px solid rgba(100, 116, 139, 0.1)'
                    }}
                  >
                    <h3 style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      color: '#64748b',
                      margin: '0 0 8px 0'
                    }}>
                      Description
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      lineHeight: '1.6',
                      color: '#334155',
                      margin: 0,
                      fontWeight: '500'
                    }}>
                      {info.description}
                    </p>
                  </motion.div>

                  {/* Function */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      padding: '16px',
                      backgroundColor: 'rgba(59, 130, 246, 0.08)',
                      borderRadius: '12px',
                      border: '2px solid rgba(59, 130, 246, 0.2)'
                    }}
                  >
                    <h3 style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      color: '#3b82f6',
                      margin: '0 0 8px 0'
                    }}>
                      Function
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      lineHeight: '1.6',
                      color: '#1e40af',
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      {info.function}
                    </p>
                  </motion.div>

                  {/* Risk Warning */}
                  {info.riskWarning && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 }}
                      style={{
                        padding: '14px',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderRadius: '10px',
                        border: '2px solid rgba(239, 68, 68, 0.3)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px'
                      }}
                    >
                      <WarningIcon size={20} color="#ef4444" />
                      <p style={{
                        fontSize: '13px',
                        lineHeight: '1.5',
                        color: '#dc2626',
                        margin: 0,
                        fontWeight: '600'
                      }}>
                        {info.riskWarning}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
