'use client';

import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/GameStore';
import { IntegrityIcon, CoinIcon, CalendarIcon, ExpandIcon } from './FinancialIconSet';
import { ChartBarIcon, GamepadIcon } from './IconLibrary';

// Plant Mode Icon
function PlantIcon({ size = 20, color = '#22c55e' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22v-8m0 0c-2.5 0-4.5-2-4.5-4.5S9.5 5 12 5c2.5 0 4.5 2 4.5 4.5S14.5 14 12 14z" />
      <path d="M12 14c0-2.5-2-4.5-4.5-4.5M12 14c0-2.5 2-4.5 4.5-4.5" />
    </svg>
  );
}

// Sell Mode Icon
function SellIcon({ size = 20, color = '#ef4444' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8m-4-4l4 4-4 4" />
    </svg>
  );
}

// Renovate Mode Icon
function RenovateIcon({ size = 20, color = '#3b82f6' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export default function GameUI() {
  const year = useGameStore(state => state.year);
  const cash = useGameStore(state => state.cash);
  const integrity = useGameStore(state => state.integrity);
  const gridSize = useGameStore(state => state.gridSize);
  const interactionMode = useGameStore(state => state.interactionMode);
  const endYear = useGameStore(state => state.endYear);
  const expandGrid = useGameStore(state => state.expandGrid);
  const setInteractionMode = useGameStore(state => state.setInteractionMode);
  const openTutorialModal = useGameStore(state => state.openTutorialModal);
  const openYearReportModal = useGameStore(state => state.openYearReportModal);

  const expansionCost = Math.round(1000 * Math.pow(1.5, gridSize - 4));

  const getIntegrityColor = () => {
    if (integrity > 60) return '#22c55e';
    if (integrity > 30) return '#f59e0b';
    return '#ef4444';
  };

  const formatCurrency = (value: number) => `$${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

  const glassStyle: CSSProperties = {
    backgroundColor: 'rgba(248, 250, 252, 0.7)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  };

  const slateHudButton: CSSProperties = {
    padding: '12px 20px',
    borderRadius: '12px',
    background: '#ffffff',
    color: '#475569',
    border: '1px solid #e2e8f0',
    fontSize: '13px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    height: '48px',
    boxShadow: '0 6px 20px rgba(15, 23, 42, 0.08)'
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        id="hud-layer-top"
        style={{
          position: 'fixed',
          top: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '16px',
          pointerEvents: 'none',
          zIndex: 20,
          maxWidth: 'calc(100% - 360px)' // leave room for shop
        }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', pointerEvents: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              style={{
                borderRadius: '14px',
                padding: '14px 18px',
                minWidth: '200px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#0f172a',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '12px'
                }}
              >
                <CalendarIcon size={18} color="#0f172a" />
                <span>Year</span>
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>Year {year}</div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>End Turn to process markets</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.1 }} onClick={openYearReportModal} style={slateHudButton}>
                <ChartBarIcon size={16} color="#475569" />
                Year Report
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.1 }} onClick={openTutorialModal} style={slateHudButton}>
                <GamepadIcon size={16} color="#475569" />
                Tutorial
              </motion.button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', pointerEvents: 'auto' }}>
          <div
            style={{
              borderRadius: '16px',
              padding: '20px 28px',
              minWidth: '180px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <CoinIcon size={18} color="#0f172a" />
              <div
                style={{
                  fontSize: '12px',
                  color: '#0f172a',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                Cash
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>{formatCurrency(cash)}</div>
          </div>

          <div
            style={{
              borderRadius: '16px',
              padding: '20px 28px',
              minWidth: '160px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <IntegrityIcon size={18} color="#0f172a" />
              <div
                style={{
                  fontSize: '12px',
                  color: '#0f172a',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                Integrity
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: getIntegrityColor() }}>{Math.ceil(integrity * 100) / 100}%</div>
          </div>
        </div>
      </motion.div>

      {/* Layer B: Action HUD above ticker */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          bottom: '64px',
          left: '24px',
          display: 'flex',
          gap: '16px',
          pointerEvents: 'auto'
        }}
      >
        <div
          style={{
            ...glassStyle,
            borderRadius: '14px',
            padding: '8px',
            display: 'flex',
            gap: '6px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)'
          }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
            onClick={() => setInteractionMode('PLANT')}
            style={{
              padding: '12px 20px',
              borderRadius: '10px',
              background: interactionMode === 'PLANT' ? '#4b5563' : '#f8fafc',
              color: interactionMode === 'PLANT' ? '#ffffff' : '#64748b',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none'
            }}
          >
            <PlantIcon size={16} color={interactionMode === 'PLANT' ? '#ffffff' : '#94a3b8'} />
            Plant
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
            onClick={() => setInteractionMode('RENOVATE')}
            style={{
              padding: '12px 20px',
              borderRadius: '10px',
              background: interactionMode === 'RENOVATE' ? '#4b5563' : '#f8fafc',
              color: interactionMode === 'RENOVATE' ? '#ffffff' : '#64748b',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none'
            }}
          >
            <RenovateIcon size={16} color={interactionMode === 'RENOVATE' ? '#ffffff' : '#94a3b8'} />
            Renovate
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
            onClick={() => setInteractionMode('SELL')}
            style={{
              padding: '12px 20px',
              borderRadius: '10px',
              background: interactionMode === 'SELL' ? '#4b5563' : '#f8fafc',
              color: interactionMode === 'SELL' ? '#ffffff' : '#64748b',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none'
            }}
          >
            <SellIcon size={16} color={interactionMode === 'SELL' ? '#ffffff' : '#94a3b8'} />
            Sell
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.1 }}
          onClick={endYear}
          style={{
            padding: '18px 36px',
            border: '1px solid #e2e8f0',
            background: '#ffffff',
            borderRadius: '14px',
            color: '#475569',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.background = '#f1f5f9';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = '#ffffff';
          }}
        >
          <CalendarIcon size={20} color="#475569" />
          End Turn
        </motion.button>

        <motion.button
          whileHover={cash >= expansionCost ? { scale: 1.02 } : {}}
          whileTap={cash >= expansionCost ? { scale: 0.98 } : {}}
          transition={{ duration: 0.1 }}
          onClick={expandGrid}
          disabled={cash < expansionCost}
          style={{
            padding: '18px 36px',
            border: '1px solid #e2e8f0',
            background: cash >= expansionCost ? '#ffffff' : '#f1f5f9',
            borderRadius: '14px',
            color: cash >= expansionCost ? '#475569' : '#94a3b8',
            fontSize: '14px',
            fontWeight: 700,
            cursor: cash >= expansionCost ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            opacity: cash >= expansionCost ? 1 : 0.7,
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)'
          }}
          onMouseOver={(e) => {
            if (cash >= expansionCost) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.12)';
            }
          }}
          onMouseOut={(e) => {
            if (cash >= expansionCost) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(15, 23, 42, 0.06)';
            }
          }}
        >
          <ExpandIcon size={20} color="#0f172a" />
          <div>
            Expand Grid
            <br />
            <span style={{ fontSize: '11px', fontWeight: 600 }}>
              ({formatCurrency(expansionCost)} + ${gridSize + 1}² × $50/year tax)
            </span>
          </div>
        </motion.button>
      </motion.div>
    </>
  );
}
