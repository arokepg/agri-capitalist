'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/GameStore';
import { StockUpIcon, StockDownIcon, StockStableIcon } from './FinancialIconSet';
import StockExchangeModal from './StockExchangeModal';

export default function StockTicker() {
  const marketState = useGameStore(state => state.marketState);
  const nextEventHint = useGameStore(state => state.nextTurnForecast);
  const [isExchangeOpen, setIsExchangeOpen] = useState(false);

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}k`;
    }
    return `$${value.toFixed(0)}`;
  };

  const getAssetChange = (asset: any) => {
    if (asset.history.length < 2) return { change: 0, percent: 0 };
    const prevPrice = asset.history[asset.history.length - 2];
    const currentPrice = asset.currentPrice;
    const change = currentPrice - prevPrice;
    const percent = (change / prevPrice) * 100;
    return { change, percent };
  };

  // Layer A: Full-Width Light Mode Command Center Bottom Bar
  return (
    <>
      <div id="command-center-bar" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: '340px', // Account for sidebar width
        backgroundColor: '#ffffff', // White bar (Light Mode)
        padding: '12px 24px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        borderTop: '2px solid #e2e8f0',
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.08)'
      }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
        overflowX: 'auto',
        whiteSpace: 'nowrap'
      }}>
        {/* Clickable "LIVE STOCKS" Label */}
        <button
          onClick={() => setIsExchangeOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '12px',
            fontWeight: '700',
            color: '#0f172a',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            paddingRight: '16px',
            borderRight: '2px solid #e2e8f0',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'color 0.2s ease',
            pointerEvents: 'auto'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#475569'}
          onMouseOut={(e) => e.currentTarget.style.color = '#0f172a'}
        >
          📈 LIVE STOCKS
        </button>

        {nextEventHint && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '8px',
            background: 'rgba(15, 23, 42, 0.08)',
            color: '#0f172a',
            fontWeight: 700,
            fontSize: '12px',
            letterSpacing: '0.5px'
          }}>
            NEXT EVENT: {nextEventHint}
          </div>
        )}

        {/* Stock Tickers */}
        {Object.values(marketState?.assets ?? {}).map((asset: any) => {
          const { change, percent } = getAssetChange(asset);
          const isUp = percent > 0.5;
          const isDown = percent < -0.5;
          const isStable = !isUp && !isDown;

          return (
            <div
              key={asset.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              {/* Ticker Symbol */}
              <div style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#0f172a',
                letterSpacing: '0.5px'
              }}>
                {asset.symbol}
              </div>

              {/* Price */}
              <div style={{
                fontSize: '15px',
                fontWeight: '700',
                color: isUp ? '#16a34a' : isDown ? '#dc2626' : '#475569'
              }}>
                {formatCurrency(asset.currentPrice)}
              </div>

              {/* Change Indicator */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                borderRadius: '6px',
                backgroundColor: isStable 
                  ? 'rgba(71, 85, 105, 0.1)' 
                  : isUp 
                    ? 'rgba(22, 163, 74, 0.1)' 
                    : 'rgba(220, 38, 38, 0.1)'
              }}>
                {isStable ? (
                  <StockStableIcon size={14} />
                ) : isUp ? (
                  <StockUpIcon size={14} />
                ) : (
                  <StockDownIcon size={14} />
                )}
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: isStable ? '#475569' : isUp ? '#16a34a' : '#dc2626'
                }}>
                  {isUp ? '+' : ''}{percent.toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stock Exchange Modal */}
      <StockExchangeModal 
        isOpen={isExchangeOpen} 
        onClose={() => setIsExchangeOpen(false)} 
      />
    </div>
    </>
  );
}
