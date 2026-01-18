'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FourSeasonCycleProps {
  isActive: boolean;
  onComplete: () => void;
}

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

const SEASON_DURATION = 1750; // 1.75s per season

const seasonData = {
  spring: {
    name: 'Spring',
    subtitle: 'Trồng Trọt (Planting)',
    emoji: '🌸',
    bgGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    particles: '🌱🌿🌷',
  },
  summer: {
    name: 'Summer',
    subtitle: 'Sinh Trưởng (Growing)',
    emoji: '☀️',
    bgGradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    particles: '☀️🔥💧',
  },
  autumn: {
    name: 'Autumn',
    subtitle: 'Thu Hoạch (Harvest)',
    emoji: '🍂',
    bgGradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
    particles: '🍂🍁🌾',
  },
  winter: {
    name: 'Winter',
    subtitle: 'Mùa Nước Nổi (Flood Season)',
    emoji: '💧',
    bgGradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    particles: '💧🌊❄️',
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
        // All 4 seasons complete
        onComplete();
      }
    }, SEASON_DURATION);

    return () => clearTimeout(timer);
  }, [isActive, currentSeasonIndex, onComplete]);

  if (!isActive) return null;

  const season = seasonData[currentSeason];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: season.bgGradient,
        overflow: 'hidden',
      }}
    >
      {/* Animated Particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: -50,
              opacity: 0,
            }}
            animate={{
              y: window.innerHeight + 50,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 1.5,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              fontSize: '32px',
              pointerEvents: 'none',
            }}
          >
            {season.particles[Math.floor(Math.random() * season.particles.length)]}
          </motion.div>
        ))}
      </div>

      {/* Season Card */}
      <motion.div
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '48px 64px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '2px solid rgba(255, 255, 255, 0.8)',
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{
            scale: { delay: 0.2, type: 'spring', stiffness: 500, damping: 15 },
            rotate: { delay: 0.4, duration: 0.6, ease: 'easeInOut' },
          }}
          style={{
            fontSize: '96px',
            marginBottom: '16px',
          }}
        >
          {season.emoji}
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: '48px',
            fontWeight: '900',
            color: '#0f172a',
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}
        >
          {season.name}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: '#64748b',
            fontStyle: 'italic',
          }}
        >
          {season.subtitle}
        </motion.p>

        {/* Progress Indicator */}
        <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          marginTop: '32px',
        }}>
          {seasons.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: '40px',
                height: '4px',
                borderRadius: '2px',
                backgroundColor: idx <= currentSeasonIndex ? '#0f172a' : '#cbd5e1',
                transition: 'background-color 0.3s ease',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Special Season Effects */}
      {currentSeason === 'summer' && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: '10%',
            right: '15%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,220,100,0.8) 0%, rgba(255,180,50,0) 70%)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }}
        />
      )}

      {currentSeason === 'winter' && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '25%',
            background: 'linear-gradient(to top, rgba(100, 150, 200, 0.4), transparent)',
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  );
}
