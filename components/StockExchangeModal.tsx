'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/GameStore';
import { 
  ChartIcon, 
  StockUpIcon, 
  StockDownIcon, 
  StockStableIcon,
  CoinIcon 
} from './FinancialIconSet';
import { XIcon } from './IconLibrary';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface StockExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StockExchangeModal({ isOpen, onClose }: StockExchangeModalProps) {
  const cash = useGameStore(state => state.cash);
  const marketState = useGameStore(state => state.marketState);
  const stockHoldings = useGameStore(state => state.stockHoldings);
  const buyStock = useGameStore(state => state.buyStock);
  const sellStock = useGameStore(state => state.sellStock);
  
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [tradeQuantity, setTradeQuantity] = useState(1);
  const [tradeMode, setTradeMode] = useState<'BUY' | 'SELL' | 'SHORT'>('BUY');

  if (!isOpen) return null;

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const glassStyle = {
    backgroundColor: 'rgba(248, 250, 252, 0.7)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
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
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 1000,
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
                maxWidth: '900px',
                maxHeight: '85vh',
                ...glassStyle,
                borderRadius: '20px',
                padding: '32px',
                overflowY: 'auto',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                color: '#0f172a',
                position: 'relative'
              }}
            >
              {/* X Close Button - Top Right */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '32px',
                  height: '32px',
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
                <XIcon size={16} color="#334155" />
              </motion.button>

          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ChartIcon size={32} color="#3b82f6" />
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                margin: 0,
                color: '#0f172a'
              }}>
                STOCK EXCHANGE
              </h2>
            </div>
          </div>

          {/* Trade Mode Selector */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '24px',
            padding: '6px',
            ...glassStyle,
            borderRadius: '12px',
            background: 'rgba(248, 250, 252, 0.4)'
          }}>
            {(['BUY', 'SELL', 'SHORT'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setTradeMode(mode)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  background: tradeMode === mode
                    ? mode === 'BUY' 
                      ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))'
                      : mode === 'SELL'
                        ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))'
                        : 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.1))'
                    : 'transparent',
                  border: tradeMode === mode 
                    ? mode === 'BUY'
                      ? '2px solid rgba(34, 197, 94, 0.3)'
                      : mode === 'SELL'
                        ? '2px solid rgba(239, 68, 68, 0.3)'
                        : '2px solid rgba(245, 158, 11, 0.3)'
                    : '2px solid transparent',
                  color: tradeMode === mode 
                    ? mode === 'BUY' 
                      ? '#22c55e' 
                      : mode === 'SELL' 
                        ? '#ef4444' 
                        : '#f59e0b'
                    : '#64748b',
                  fontSize: '14px',
                  fontWeight: '700',
                  fontFamily: 'inherit',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Asset List */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}>
            {Object.values(marketState?.assets ?? {}).map((asset: any) => {
              const holdings = stockHoldings[asset.id] || 0;
              const priceChange = asset.history.length > 1
                ? ((asset.currentPrice - asset.history[asset.history.length - 2]) / asset.history[asset.history.length - 2]) * 100
                : 0;
              const isUp = priceChange > 0.5;
              const isDown = priceChange < -0.5;
              const isStable = !isUp && !isDown;

              const chartData = asset.history.map((price: number, i: number) => ({
                year: i + 1,
                price
              }));

              const isSelected = selectedAsset === asset.id;

              return (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset.id)}
                  style={{
                    padding: '20px',
                    ...glassStyle,
                    background: isSelected
                      ? 'rgba(59, 130, 246, 0.15)'
                      : 'rgba(248, 250, 252, 0.4)',
                    border: isSelected
                      ? '2px solid rgba(59, 130, 246, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Asset Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#0f172a',
                        marginBottom: '4px'
                      }}>
                        {asset.symbol}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: '#64748b',
                        fontWeight: '500'
                      }}>
                        {asset.name}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#0f172a'
                    }}>
                      {formatCurrency(asset.currentPrice)}
                    </div>
                  </div>

                  {/* Price Change Badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: isStable
                      ? 'rgba(100, 116, 139, 0.1)'
                      : isUp
                        ? 'rgba(34, 197, 94, 0.1)'
                        : 'rgba(239, 68, 68, 0.1)',
                    marginBottom: '12px'
                  }}>
                    {isStable ? <StockStableIcon size={16} /> : isUp ? <StockUpIcon size={16} /> : <StockDownIcon size={16} />}
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: isStable ? '#64748b' : isUp ? '#22c55e' : '#ef4444'
                    }}>
                      {isUp ? '+' : ''}{priceChange.toFixed(2)}%
                    </span>
                  </div>

                  {/* Price History Chart */}
                  {chartData.length > 1 && (
                    <div style={{ height: '80px', marginBottom: '12px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <XAxis dataKey="year" hide />
                          <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
                          <Tooltip
                            contentStyle={{
                              background: 'rgba(248, 250, 252, 0.95)',
                              border: '1px solid rgba(100, 116, 139, 0.2)',
                              borderRadius: '8px',
                              fontSize: '11px'
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="price"
                            stroke={isUp ? '#22c55e' : '#ef4444'}
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Holdings */}
                  <div style={{
                    fontSize: '12px',
                    color: '#64748b',
                    marginBottom: '12px',
                    fontWeight: '500'
                  }}>
                    Holdings: <span style={{ color: '#0f172a', fontWeight: '700' }}>{holdings} shares</span>
                    {holdings > 0 && (
                      <span style={{ color: '#22c55e', marginLeft: '8px' }}>
                        ({formatCurrency(holdings * stock.currentPrice)})
                      </span>
                    )}
                  </div>

                  {/* Trading Controls (Only show for selected stock) */}
                  {isSelected && (
                    <div style={{
                      borderTop: '1px solid rgba(100, 116, 139, 0.2)',
                      paddingTop: '12px',
                      marginTop: '8px'
                    }}>
                      <input
                        type="number"
                        min="1"
                        value={tradeQuantity}
                        onChange={(e) => setTradeQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          width: '100%',
                          padding: '10px',
                          marginBottom: '8px',
                          ...glassStyle,
                          borderRadius: '8px',
                          color: '#0f172a',
                          fontFamily: 'inherit',
                          fontSize: '13px',
                          fontWeight: '600',
                          outline: 'none'
                        }}
                        placeholder="Quantity"
                      />

                      {/* Execute Trade Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (tradeMode === 'BUY') {
                            buyStock(stock.id, tradeQuantity);
                          } else if (tradeMode === 'SELL') {
                            sellStock(stock.id, tradeQuantity);
                          } else if (tradeMode === 'SHORT') {
                            // SHORT logic: Sell first, buy back later
                            alert('SHORT feature: Sell now, buy back later when price drops!');
                            sellStock(stock.id, tradeQuantity);
                          }
                          setTradeQuantity(1);
                        }}
                        disabled={
                          (tradeMode === 'BUY' && cash < stock.currentPrice * tradeQuantity) ||
                          ((tradeMode === 'SELL' || tradeMode === 'SHORT') && (holdings === 0 || holdings < tradeQuantity))
                        }
                        style={{
                          width: '100%',
                          padding: '12px',
                          ...glassStyle,
                          background:
                            (tradeMode === 'BUY' && cash < stock.currentPrice * tradeQuantity) ||
                            ((tradeMode === 'SELL' || tradeMode === 'SHORT') && (holdings === 0 || holdings < tradeQuantity))
                              ? 'rgba(100, 116, 139, 0.1)'
                              : tradeMode === 'BUY'
                                ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))'
                                : tradeMode === 'SELL'
                                  ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))'
                                  : 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.1))',
                          border:
                            (tradeMode === 'BUY' && cash < stock.currentPrice * tradeQuantity) ||
                            ((tradeMode === 'SELL' || tradeMode === 'SHORT') && (holdings === 0 || holdings < tradeQuantity))
                              ? '2px solid rgba(100, 116, 139, 0.2)'
                              : tradeMode === 'BUY'
                                ? '2px solid rgba(34, 197, 94, 0.3)'
                                : tradeMode === 'SELL'
                                  ? '2px solid rgba(239, 68, 68, 0.3)'
                                  : '2px solid rgba(245, 158, 11, 0.3)',
                          borderRadius: '8px',
                          color:
                            (tradeMode === 'BUY' && cash < stock.currentPrice * tradeQuantity) ||
                            ((tradeMode === 'SELL' || tradeMode === 'SHORT') && (holdings === 0 || holdings < tradeQuantity))
                              ? '#94a3b8'
                              : tradeMode === 'BUY'
                                ? '#22c55e'
                                : tradeMode === 'SELL'
                                  ? '#ef4444'
                                  : '#f59e0b',
                          cursor:
                            (tradeMode === 'BUY' && cash < stock.currentPrice * tradeQuantity) ||
                            ((tradeMode === 'SELL' || tradeMode === 'SHORT') && (holdings === 0 || holdings < tradeQuantity))
                              ? 'not-allowed'
                              : 'pointer',
                          fontSize: '13px',
                          fontWeight: '700',
                          fontFamily: 'inherit',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          opacity:
                            (tradeMode === 'BUY' && cash < stock.currentPrice * tradeQuantity) ||
                            ((tradeMode === 'SELL' || tradeMode === 'SHORT') && (holdings === 0 || holdings < tradeQuantity))
                              ? 0.5
                              : 1
                        }}
                      >
                        {tradeMode} {tradeQuantity} × {formatCurrency(stock.currentPrice)}
                      </button>

                      <div style={{
                        fontSize: '11px',
                        marginTop: '8px',
                        color: '#64748b',
                        textAlign: 'center',
                        fontWeight: '500'
                      }}>
                        Total: {formatCurrency(stock.currentPrice * tradeQuantity)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </>
  )}
  </AnimatePresence>
  );
}
