'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MonthFlipCalendarProps {
  isActive: boolean;
  onComplete: () => void;
}

const MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL',
  'MAY', 'JUNE', 'JULY', 'AUGUST',
  'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

// Seasonal colors - earth tones and agricultural palette
const SEASON_COLORS = [
  { bg: '#e0f2fe', accent: '#0369a1', name: 'Winter' },      // Jan - icy blue
  { bg: '#dbeafe', accent: '#1e40af', name: 'Winter' },      // Feb - cold blue
  { bg: '#dcfce7', accent: '#16a34a', name: 'Spring' },      // Mar - early spring green
  { bg: '#d1fae5', accent: '#059669', name: 'Spring' },      // Apr - spring green
  { bg: '#ecfccb', accent: '#65a30d', name: 'Spring' },      // May - fresh green
  { bg: '#fef3c7', accent: '#d97706', name: 'Summer' },      // Jun - golden
  { bg: '#fed7aa', accent: '#ea580c', name: 'Summer' },      // Jul - hot orange
  { bg: '#fecaca', accent: '#dc2626', name: 'Summer' },      // Aug - heat red
  { bg: '#fed7aa', accent: '#c2410c', name: 'Autumn' },      // Sep - harvest orange
  { bg: '#fde68a', accent: '#b45309', name: 'Autumn' },      // Oct - autumn gold
  { bg: '#e7e5e4', accent: '#57534e', name: 'Late Autumn' }, // Nov - gray
  { bg: '#dbeafe', accent: '#1e3a8a', name: 'Winter' }       // Dec - winter blue
];

// Weather patterns and agricultural activities per month
const MONTH_THEMES = [
  { weather: '❄️', activity: 'Frost', description: 'Cold & Dormant' },
  { weather: '🌨️', activity: 'Snow', description: 'Planning Season' },
  { weather: '🌱', activity: 'Sprout', description: 'Seeds Awakening' },
  { weather: '🌧️', activity: 'Rain', description: 'Spring Showers' },
  { weather: '🌸', activity: 'Bloom', description: 'Flowers & Growth' },
  { weather: '☀️', activity: 'Sun', description: 'Growing Season' },
  { weather: '🔥', activity: 'Heat', description: 'Peak Summer' },
  { weather: '☀️', activity: 'Ripen', description: 'Crops Maturing' },
  { weather: '🍂', activity: 'Harvest', description: 'Gathering Crops' },
  { weather: '🌾', activity: 'Reap', description: 'Final Harvest' },
  { weather: '🍁', activity: 'Rest', description: 'Preparing Winter' },
  { weather: '❄️', activity: 'Freeze', description: 'Year Complete' }
];

export default function MonthFlipCalendar({ isActive, onComplete }: MonthFlipCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setCurrentMonth(0);
      return;
    }

    // Start at January (month 0) and show it
    setCurrentMonth(0);
    
    // Show all 12 months sequentially with enough time to see each one
    const showMonth = (index: number) => {
      if (index < 12) {
        setCurrentMonth(index);
        // Wait 600ms before showing next month (allows full animation cycle)
        setTimeout(() => showMonth(index + 1), 600);
      } else {
        // All months shown, complete after final pause
        setTimeout(onComplete, 1000);
      }
    };

    // Start showing months after initial display
    setTimeout(() => showMonth(1), 600);

    return () => {};
  }, [isActive, onComplete]);

  if (!isActive) return null;

  const season = SEASON_COLORS[currentMonth];
  const theme = MONTH_THEMES[currentMonth];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ 
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(to bottom, ${season.bg} 0%, #f8fafc 100%)`,
          transition: 'background 0.4s ease'
        }}
      >
        {/* Subtle Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          opacity: 0.3
        }} />

        {/* Calendar Card Container */}
        <div style={{ 
          position: 'relative',
          width: '600px',
          transformStyle: 'preserve-3d',
          perspective: '1200px'
        }}>
          
          {/* Main Calendar Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMonth}
              initial={{ 
                scale: 0.9,
                opacity: 0
              }}
              animate={{ 
                scale: 1,
                opacity: 1
              }}
              exit={{ 
                scale: 0.9,
                opacity: 0
              }}
              transition={{ 
                duration: 0.2,
                ease: 'easeOut'
              }}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '60px 50px',
                boxShadow: `0 20px 60px ${season.accent}30, 0 0 0 1px ${season.accent}20`,
                border: `3px solid ${season.accent}`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Season Badge */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: season.accent,
                color: '#ffffff',
                padding: '8px 20px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                {season.name}
              </div>

              {/* Month Counter */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontSize: '18px',
                fontWeight: 600,
                color: season.accent
              }}>
                {currentMonth + 1} / 12
              </div>

              {/* Weather Icon (Large) */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 200,
                  damping: 15
                }}
                style={{
                  fontSize: '100px',
                  textAlign: 'center',
                  marginBottom: '20px',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                }}
              >
                {theme.weather}
              </motion.div>

              {/* Month Name */}
              <motion.div
                initial={{ letterSpacing: '-0.5em', opacity: 0 }}
                animate={{ letterSpacing: '0.1em', opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  fontSize: '56px',
                  fontWeight: 900,
                  textAlign: 'center',
                  color: season.accent,
                  marginBottom: '15px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {MONTHS[currentMonth]}
              </motion.div>

              {/* Agricultural Activity */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                style={{
                  textAlign: 'center',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: season.accent,
                  marginBottom: '10px',
                  opacity: 0.9
                }}
              >
                {theme.activity}
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#64748b',
                  marginBottom: '30px'
                }}
              >
                {theme.description}
              </motion.div>

              {/* Progress Bar */}
              <div style={{
                width: '100%',
                height: '12px',
                background: season.bg,
                borderRadius: '6px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentMonth + 1) / 12) * 100}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${season.accent} 0%, ${season.accent}dd 100%)`,
                    borderRadius: '6px',
                    boxShadow: `0 0 10px ${season.accent}80`
                  }}
                />
              </div>

              {/* Progress Percentage */}
              <div style={{
                textAlign: 'center',
                marginTop: '15px',
                fontSize: '20px',
                fontWeight: 700,
                color: season.accent
              }}>
                {Math.round(((currentMonth + 1) / 12) * 100)}% Complete
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Text */}
          <motion.div
            animate={{ 
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              textAlign: 'center',
              marginTop: '40px',
              fontSize: '20px',
              fontWeight: 600,
              color: season.accent,
              textTransform: 'uppercase',
              letterSpacing: '0.15em'
            }}
          >
            {currentMonth === 11 ? 'Year Complete!' : 'Time Passing...'}
          </motion.div>
        </div>

        {/* Seasonal Elements (subtle decoration) */}
        {currentMonth >= 2 && currentMonth <= 4 && (
          // Spring leaves
          Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`leaf-${i}`}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.sin(i) * 10, 0],
                rotate: [0, 360],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3 + i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3
              }}
              style={{
                position: 'absolute',
                left: `${10 + i * 11}%`,
                top: `${20 + (i % 3) * 20}%`,
                fontSize: '24px'
              }}
            >
              🌿
            </motion.div>
          ))
        )}

        {currentMonth >= 5 && currentMonth <= 7 && (
          // Summer sun rays
          Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`ray-${i}`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut'
              }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '10%',
                width: '3px',
                height: '60px',
                background: `linear-gradient(to bottom, ${season.accent} 0%, transparent 100%)`,
                transformOrigin: 'top center',
                transform: `translateX(-50%) rotate(${i * 60}deg)`
              }}
            />
          ))
        )}

        {currentMonth >= 8 && currentMonth <= 10 && (
          // Autumn falling leaves
          Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`fall-${i}`}
              animate={{
                y: [0, 600],
                x: [0, Math.sin(i * 2) * 100],
                rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
                opacity: [0, 0.7, 0]
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.4
              }}
              style={{
                position: 'absolute',
                left: `${i * 10}%`,
                top: '-50px',
                fontSize: '20px'
              }}
            >
              {i % 2 === 0 ? '🍂' : '🍁'}
            </motion.div>
          ))
        )}

        {(currentMonth === 0 || currentMonth === 1 || currentMonth === 11) && (
          // Winter snowflakes
          Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`snow-${i}`}
              animate={{
                y: [0, 700],
                x: [0, Math.sin(i * 3) * 50],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 5 + i * 0.2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.5
              }}
              style={{
                position: 'absolute',
                left: `${i * 8}%`,
                top: '-50px',
                fontSize: '18px'
              }}
            >
              ❄️
            </motion.div>
          ))
        )}
      </motion.div>
    </AnimatePresence>
  );
}
