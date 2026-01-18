'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FourSeasonCycleProps {
  isActive: boolean;
  onComplete: () => void;
}

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

const SEASON_DURATION = 2000; // 2s per season (8s total)

const seasonData = {
  spring: {
    name: 'Spring',
    subtitle: 'Mùa Xuân',
    emoji: '🌸',
    bg: 'linear-gradient(180deg, #a7f3d0 0%, #6ee7b7 50%, #34d399 100%)',
    sky: '#87ceeb',
    color: '#0f172a',
    description: 'Rolling green hills',
  },
  summer: {
    name: 'Summer',
    subtitle: 'Mùa Hạ',
    emoji: '☀️',
    bg: 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)',
    sky: '#1e40af',
    color: '#ffffff',
    description: 'Vibrant blue sky with clouds',
  },
  autumn: {
    name: 'Autumn',
    subtitle: 'Mùa Thu',
    emoji: '🍂',
    bg: 'linear-gradient(180deg, #fb923c 0%, #f97316 50%, #ea580c 100%)',
    sky: '#dc2626',
    color: '#ffffff',
    description: 'Sunset with palm silhouettes',
  },
  winter: {
    name: 'Winter',
    subtitle: 'Mùa Nước Nổi',
    emoji: '💧',
    bg: 'linear-gradient(180deg, #64748b 0%, #475569 50%, #334155 100%)',
    sky: '#1e293b',
    color: '#ffffff',
    description: 'Rain clouds and water',
  },
};

// Animated Background Component for Each Season
function SpringBackground() {
  return (
    <>
      {/* Rolling Hills */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 0.6 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'radial-gradient(ellipse at bottom, #4ade80 0%, #22c55e 50%, #16a34a 100%)',
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          filter: 'blur(1px)',
        }}
      />
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 0.5 }}
        transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: '-5%',
          left: '10%',
          right: '10%',
          height: '35%',
          background: 'radial-gradient(ellipse at bottom, #86efac 0%, #4ade80 50%, #22c55e 100%)',
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          filter: 'blur(1.5px)',
        }}
      />
    </>
  );
}

function SummerBackground() {
  return (
    <>
      {/* Fast-moving clouds */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: '-20%', opacity: 0 }}
          animate={{ 
            x: '120%', 
            opacity: [0, 0.8, 0.8, 0]
          }}
          transition={{ 
            duration: 3 + i * 0.5, 
            ease: 'linear',
            delay: i * 0.4
          }}
          style={{
            position: 'absolute',
            top: `${10 + i * 15}%`,
            width: '120px',
            height: '50px',
            background: '#ffffff',
            borderRadius: '50px',
            filter: 'blur(2px)',
            opacity: 0.7,
          }}
        />
      ))}
    </>
  );
}

function AutumnBackground() {
  return (
    <>
      {/* Sunset vista with palm silhouettes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(to top, #78350f 0%, #92400e 50%, #ea580c 100%)',
        }}
      />
      
      {/* Palm tree silhouettes */}
      {[0, 1, 2].map((idx) => (
        <motion.div
          key={idx}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 0.6 }}
          transition={{ duration: 0.8, delay: idx * 0.2 }}
          style={{
            position: 'absolute',
            bottom: '15%',
            left: `${20 + idx * 30}%`,
            width: '40px',
            height: '120px',
            background: '#1c1917',
            clipPath: 'polygon(50% 0%, 40% 60%, 35% 100%, 65% 100%, 60% 60%)',
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </>
  );
}

function WinterBackground() {
  return (
    <>
      {/* Rain clouds */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 0.9 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to bottom, #334155 0%, #475569 100%)',
          filter: 'blur(3px)',
        }}
      />
      
      {/* Rain particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '-10%', opacity: 0 }}
          animate={{ 
            y: '110%',
            opacity: [0, 0.7, 0.7, 0]
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.15,
            ease: 'linear',
            repeat: 1,
          }}
          style={{
            position: 'absolute',
            left: `${10 + i * 8}%`,
            width: '2px',
            height: '20px',
            background: '#cbd5e1',
            filter: 'blur(0.5px)',
          }}
        />
      ))}
      
      {/* Rising water plane visual */}
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: '60%', opacity: 0.4 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(to top, #0ea5e9 0%, rgba(14, 165, 233, 0.3) 100%)',
          filter: 'blur(2px)',
        }}
      />
    </>
  );
}

export default function FourSeasonCycle({ isActive, onComplete }: FourSeasonCycleProps) {
  const [currentSeasonIndex, setCurrentSeasonIndex] = useState(0);
  const [cameraAngle, setCameraAngle] = useState(0);
  const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter'];
  const currentSeason = seasons[currentSeasonIndex];
  const progress = ((currentSeasonIndex + 1) / 4) * 100;

  // Camera orbital pan effect (45 degrees over 8 seconds)
  useEffect(() => {
    if (!isActive) {
      setCurrentSeasonIndex(0);
      setCameraAngle(0);
      return;
    }

    const cameraInterval = setInterval(() => {
      setCameraAngle(prev => Math.min(prev + 0.56, 45)); // 45° / 8s = ~0.56° per 100ms
    }, 100);

    const timer = setTimeout(() => {
      if (currentSeasonIndex < 3) {
        setCurrentSeasonIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          clearInterval(cameraInterval);
          onComplete();
        }, 300);
      }
    }, SEASON_DURATION);

    return () => {
      clearTimeout(timer);
      clearInterval(cameraInterval);
    };
  }, [isActive, currentSeasonIndex, onComplete]);

  if (!isActive) return null;

  const season = seasonData[currentSeason];
  const BackgroundComponent = {
    spring: SpringBackground,
    summer: SummerBackground,
    autumn: AutumnBackground,
    winter: WinterBackground,
  }[currentSeason];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: season.bg,
        overflow: 'hidden',
      }}
    >
      {/* Animated Season Background */}
      <BackgroundComponent />

      {/* Simple floating particles - only 8 per season */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: `${20 + i * 15}%`,
            y: '-10%',
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: '110%',
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: 4,
            delay: i * 0.3,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            fontSize: '28px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {season.emoji}
        </motion.div>
      ))}

      {/* Clean season card */}
      <motion.div
        key={currentSeason}
        initial={{ scale: 0.85, opacity: 0, rotateY: -10 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          rotateY: cameraAngle / 4 // Subtle 3D rotation effect
        }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          position: 'relative',
          textAlign: 'center',
          padding: '64px 96px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          zIndex: 2,
          perspective: '1000px',
        }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.1,
            type: 'spring',
            stiffness: 400,
            damping: 20,
          }}
          style={{
            fontSize: '96px',
            marginBottom: '24px',
          }}
        >
          {season.emoji}
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: '56px',
            fontWeight: '900',
            color: '#0f172a',
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}
        >
          {season.name}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#64748b',
            fontStyle: 'italic',
          }}
        >
          {season.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#94a3b8',
            marginTop: '12px',
          }}
        >
          {season.description}
        </motion.p>

        {/* Simple progress bar */}
        <div style={{
          marginTop: '40px',
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
        }}>
          {seasons.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: idx <= currentSeasonIndex ? '50px' : '50px',
                height: '5px',
                borderRadius: '3px',
                backgroundColor: idx <= currentSeasonIndex ? '#0f172a' : '#e2e8f0',
                transition: 'background-color 0.3s ease',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Minimal progress indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '48px',
          right: '48px',
          padding: '12px 20px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '700',
          color: '#64748b',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        {Math.round(progress)}% Complete
      </div>
    </motion.div>
  );
}
