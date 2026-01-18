'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
    bg: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)',
    color: '#0f172a',
  },
  summer: {
    name: 'Summer',
    subtitle: 'Mùa Hạ',
    emoji: '☀️',
    bg: 'linear-gradient(180deg, #fed7aa 0%, #fdba74 100%)',
    color: '#0f172a',
  },
  autumn: {
    name: 'Autumn',
    subtitle: 'Mùa Thu',
    emoji: '🍂',
    bg: 'linear-gradient(180deg, #fca5a5 0%, #f87171 100%)',
    color: '#ffffff',
  },
  winter: {
    name: 'Winter',
    subtitle: 'Mùa Nước Nổi',
    emoji: '💧',
    bg: 'linear-gradient(180deg, #bfdbfe 0%, #93c5fd 100%)',
    color: '#0f172a',
  },
};

export default function FourSeasonCycle({ isActive, onComplete }: FourSeasonCycleProps) {
  const [currentSeasonIndex, setCurrentSeasonIndex] = useState(0);
  const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter'];
  const currentSeason = seasons[currentSeasonIndex];

  useEffect(() => {
    if (!isActive) {
      setCurrentSeasonIndex(0);
      return;
    }

    const timer = setTimeout(() => {
      if (currentSeasonIndex < 3) {
        setCurrentSeasonIndex((prev) => prev + 1);
      } else {
        setTimeout(() => onComplete(), 300);
      }
    }, SEASON_DURATION);

    return () => clearTimeout(timer);
  }, [isActive, currentSeasonIndex, onComplete]);

  if (!isActive) return null;

  const season = seasonData[currentSeason];
  const progress = ((currentSeasonIndex + 1) / 4) * 100;

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
      }}
    >
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
          }}
        >
          {season.emoji}
        </motion.div>
      ))}

      {/* Clean season card */}
      <motion.div
        key={currentSeason}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          position: 'relative',
          textAlign: 'center',
          padding: '64px 96px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
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
