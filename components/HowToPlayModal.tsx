'use client';

import type { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GamepadIcon, 
  PlantIcon, 
  RenovateIcon, 
  SellIcon, 
  ChartBarIcon,
  TrendingUpIcon,
  CropIcon,
  LivestockIcon,
  InfrastructureIcon,
  LightbulbIcon,
  XIcon
} from './IconLibrary';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
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
            {/* Modal Container with Scrollbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e: MouseEvent) => e.stopPropagation()}
              style={{
                width: '90%',
                maxWidth: '900px',
                maxHeight: '75vh',
                backgroundColor: 'rgba(248, 250, 252, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '40px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                color: '#0f172a',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                position: 'relative',
                overflow: 'auto',
                marginTop: '120px',
                marginBottom: '80px'
              }}
              className="elegant-scrollbar"
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
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                  zIndex: 10
                }}
              >
                <XIcon size={18} color="#64748b" />
              </motion.button>

              {/* Header */}
              <h1 style={{
                fontSize: '36px',
                fontWeight: '700',
                margin: '0 0 24px 0',
                color: '#0f172a',
                textAlign: 'center'
              }}>
                How to Play
              </h1>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Game Modes Section */}
                <section>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    margin: '0 0 16px 0',
                    color: '#22c55e',
                    borderBottom: '2px solid rgba(34, 197, 94, 0.3)',
                    paddingBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <GamepadIcon size={24} color="#22c55e" /> Interaction Modes
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{
                      padding: '16px',
                      backgroundColor: 'rgba(34, 197, 94, 0.08)',
                      borderRadius: '12px',
                      border: '2px solid rgba(34, 197, 94, 0.2)'
                    }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <PlantIcon size={18} color="#22c55e" /> PLANT Mode
                      </h3>
                      <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0, color: '#334155' }}>
                        Purchase crops, livestock, or structures from the shop. Click empty tiles to place them. Each asset has unique revenue generation and requires different strategies.
                      </p>
                    </div>
                    <div style={{
                      padding: '16px',
                      backgroundColor: 'rgba(59, 130, 246, 0.08)',
                      borderRadius: '12px',
                      border: '2px solid rgba(59, 130, 246, 0.2)'
                    }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <RenovateIcon size={18} color="#3b82f6" /> RENOVATE Mode
                      </h3>
                      <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0, color: '#334155' }}>
                        Upgrade existing structures to their premium versions. Renovated structures provide enhanced benefits: drought immunity, security, automation, and increased yields.
                      </p>
                    </div>
                    <div style={{
                      padding: '16px',
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                      borderRadius: '12px',
                      border: '2px solid rgba(239, 68, 68, 0.2)'
                    }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <SellIcon size={18} color="#ef4444" /> SELL Mode
                      </h3>
                      <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0, color: '#334155' }}>
                        Liquidate any asset for 70% of its original value. Use this to pivot your strategy, clear space, or generate emergency cash. Roads increase liquidation to 85%.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Finance Engine Section */}
                <section>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    margin: '0 0 16px 0',
                    color: '#3b82f6',
                    borderBottom: '2px solid rgba(59, 130, 246, 0.3)',
                    paddingBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <ChartBarIcon size={24} color="#3b82f6" /> Turn Sequence (1 Year = 1 Turn)
                  </h2>
                  <ol style={{
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: '#334155',
                    paddingLeft: '24px'
                  }}>
                    <li><strong>Event Roll:</strong> Random events like Drought, Market Crash, Bumper Crop, or Police Raid affect your farm.</li>
                    <li><strong>Depreciation:</strong> -10% deduction on liquid balance (modified by Barns and Silos).</li>
                    <li><strong>Property Tax:</strong> -$50 per occupied tile. Plan your expansion carefully!</li>
                    <li><strong>Interest:</strong> +8% gain on remaining positive balance. Cash is king.</li>
                    <li><strong>Harvest:</strong> Assets generate revenue based on type, tier, infrastructure buffs, and market conditions.</li>
                    <li><strong>Balance Sheet:</strong> Review your financial performance and net worth.</li>
                  </ol>
                </section>

                {/* Stock Market Section */}
                <section>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    margin: '0 0 16px 0',
                    color: '#f59e0b',
                    borderBottom: '2px solid rgba(245, 158, 11, 0.3)',
                    paddingBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <TrendingUpIcon size={24} color="#f59e0b" /> Stock Market
                  </h2>
                    <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#334155', marginBottom: '12px' }}>
                      Click <strong style={{ color: '#22c55e' }}>&quot;LIVE MARKET&quot;</strong> on the bottom ticker to access the Stock Exchange.
                    </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ padding: '12px', backgroundColor: 'rgba(100, 116, 139, 0.05)', borderRadius: '8px' }}>
                      <strong style={{ color: '#22c55e' }}>BUY:</strong> Purchase shares at current price. Profit when price increases.
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'rgba(100, 116, 139, 0.05)', borderRadius: '8px' }}>
                      <strong style={{ color: '#ef4444' }}>SELL:</strong> Liquidate your holdings at current market price.
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'rgba(100, 116, 139, 0.05)', borderRadius: '8px' }}>
                      <strong style={{ color: '#f59e0b' }}>SHORT:</strong> Bet against the market. Profit when prices fall.
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: '#64748b', marginTop: '12px', fontStyle: 'italic' }}>
                    Tickers: <strong>AGI</strong> (AI/Tech), <strong>H2O</strong> (Water/Utilities), <strong>SEED</strong> (Agriculture), <strong>GRWT</strong> (Growth Stocks)
                  </p>
                </section>

                {/* Asset Roles Section */}
                <section>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    margin: '0 0 16px 0',
                    color: '#8b5cf6',
                    borderBottom: '2px solid rgba(139, 92, 246, 0.3)',
                    paddingBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <InfrastructureIcon size={24} color="#8b5cf6" /> Asset Categories
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{
                      padding: '16px',
                      backgroundColor: 'rgba(234, 179, 8, 0.08)',
                      borderRadius: '12px',
                      border: '1px solid rgba(234, 179, 8, 0.2)'
                    }}>
                      <h3 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 8px 0', color: '#eab308', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CropIcon size={18} color="#eab308" /> Crops
                      </h3>
                      <p style={{ fontSize: '13px', lineHeight: '1.5', margin: 0, color: '#334155' }}>
                        Revenue generators. Cotton is volatile. <strong style={{ color: '#dc2626' }}>Poppies trigger Police Raids</strong> - high risk, high reward.
                      </p>
                    </div>
                    <div style={{
                      padding: '16px',
                      backgroundColor: 'rgba(139, 92, 246, 0.08)',
                      borderRadius: '12px',
                      border: '1px solid rgba(139, 92, 246, 0.2)'
                    }}>
                      <h3 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 8px 0', color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <LivestockIcon size={18} color="#8b5cf6" /> Livestock
                      </h3>
                      <p style={{ fontSize: '13px', lineHeight: '1.5', margin: 0, color: '#334155' }}>
                        Yield multipliers. Animals reproduce each turn. Elephants are immune to depreciation and disease.
                      </p>
                    </div>
                    <div style={{
                      padding: '16px',
                      backgroundColor: 'rgba(59, 130, 246, 0.08)',
                      borderRadius: '12px',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      gridColumn: '1 / -1'
                    }}>
                      <h3 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 8px 0', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <InfrastructureIcon size={18} color="#3b82f6" /> Infrastructure
                      </h3>
                      <ul style={{ fontSize: '13px', lineHeight: '1.6', color: '#334155', margin: '8px 0 0 0', paddingLeft: '20px' }}>
                        <li><strong>Wells:</strong> Drought immunity for surrounding tiles</li>
                        <li><strong>Barns:</strong> Reduce spoilage and depreciation</li>
                        <li><strong>Comm Towers:</strong> Predict next turn&apos;s event</li>
                        <li><strong>Roads:</strong> Increase liquidation value to 85%</li>
                        <li><strong>Insurance:</strong> Protection against catastrophic losses</li>
                        <li><strong>Clinic:</strong> Prevent disease, boost livestock reproduction</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Tips Section */}
                <section style={{
                  padding: '20px',
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  borderRadius: '16px',
                  border: '2px solid rgba(34, 197, 94, 0.3)'
                }}>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: '0 0 12px 0',
                    color: '#22c55e',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <LightbulbIcon size={22} color="#22c55e" /> Pro Tips
                  </h2>
                  <ul style={{
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: '#166534',
                    margin: 0,
                    paddingLeft: '24px'
                  }}>
                    <li>Right-click any item in the shop for detailed info</li>
                    <li>Diversify your portfolio - don&apos;t put all eggs in one basket</li>
                    <li>Infrastructure investments pay off long-term</li>
                    <li>Watch your Integrity score - it affects loan rates and opportunities</li>
                    <li>The stock market can be more profitable than farming if timed correctly</li>
                  </ul>
                </section>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
