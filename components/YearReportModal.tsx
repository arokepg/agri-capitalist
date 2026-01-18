'use client';

import type { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { YearHistory } from '../store/GameStore';
import { XIcon, ChartBarIcon, FileTextIcon, AlertIcon } from './IconLibrary';

interface YearReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  yearHistory: YearHistory[];
  currentYear: number;
}

export default function YearReportModal({ isOpen, onClose, yearHistory, currentYear }: YearReportModalProps) {
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
                whileHover={{ scale: 1.1, rotate: 90 }}
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
                  background: 'rgba(248, 250, 252, 0.8)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                  zIndex: 10
                }}
                onMouseOver={(e: MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                }}
                onMouseOut={(e: MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.background = 'rgba(248, 250, 252, 0.8)';
                  e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.2)';
                }}
              >
                <XIcon size={18} color="#64748b" />
              </motion.button>

              {/* Header */}
              <h1 style={{
                fontSize: '36px',
                fontWeight: '700',
                margin: '0 0 8px 0',
                color: '#0f172a',
                textAlign: 'center'
              }}>
                Year-End Report
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#64748b',
                textAlign: 'center',
                margin: '0 0 32px 0'
              }}>
                Financial Retrospective • Year {currentYear}
              </p>

              {/* Content */}
              {yearHistory.length === 0 ? (
                <div style={{
                  padding: '60px 40px',
                  textAlign: 'center',
                  backgroundColor: 'rgba(100, 116, 139, 0.05)',
                  borderRadius: '16px',
                  border: '2px dashed rgba(100, 116, 139, 0.2)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                    <FileTextIcon size={64} color="#94a3b8" />
                  </div>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#475569',
                    margin: '0 0 12px 0'
                  }}>
                    No Historical Data
                  </h2>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: '1.6',
                    maxWidth: '400px',
                    margin: '0 auto'
                  }}>
                    Complete your first year to begin tracking financial history. Year-end reports will display revenue, expenses, net worth, and major events.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {yearHistory.slice().reverse().map((record, index) => {
                    const prev = yearHistory.find(r => r.year === record.year - 1);
                    const currentNetWorth = record.balanceSheet.equity.netWorth;
                    const prevNetWorth = prev?.balanceSheet.equity.netWorth;
                    const netWorthDelta = prevNetWorth !== undefined ? (currentNetWorth - prevNetWorth) : 0;
                    const netWorthDeltaPercent = prevNetWorth ? ((netWorthDelta / Math.abs(prevNetWorth)) * 100) : 0;

                    return (
                      <motion.div
                        key={record.year}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                          padding: '24px',
                          backgroundColor: 'rgba(255, 255, 255, 0.5)',
                          borderRadius: '16px',
                          border: '1px solid rgba(100, 116, 139, 0.15)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        {/* Year Header */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '16px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(100, 116, 139, 0.1)'
                        }}>
                          <h3 style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#0f172a',
                            margin: 0
                          }}>
                            Year {record.year}
                          </h3>
                          <div style={{
                            padding: '6px 16px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            backgroundColor: netWorthDelta >= 0 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: netWorthDelta >= 0 ? '#16a34a' : '#dc2626'
                          }}>
                            {netWorthDelta >= 0 ? '+' : ''}{netWorthDelta.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            {' '}
                            ({netWorthDeltaPercent >= 0 ? '+' : ''}{netWorthDeltaPercent.toFixed(1)}%)
                          </div>
                        </div>

                        {/* Event Badge */}
                        {record.event && (
                          <div style={{
                            padding: '12px 16px',
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            borderRadius: '10px',
                            border: '1px solid rgba(245, 158, 11, 0.2)',
                            marginBottom: '16px'
                          }}>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#d97706', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <AlertIcon size={16} color="#d97706" /> Event: {record.event.name}
                            </div>
                            <div style={{ fontSize: '13px', color: '#78716c', lineHeight: '1.4' }}>
                              {record.event.description}
                            </div>
                          </div>
                        )}

                        {/* Financial Grid */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '12px'
                        }}>
                          {/* Cash */}
                          <div style={{
                            padding: '14px',
                            backgroundColor: 'rgba(100, 116, 139, 0.05)',
                            borderRadius: '10px'
                          }}>
                            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', fontWeight: '600' }}>
                              Cash
                            </div>
                            <div style={{ fontSize: '18px', fontWeight: '700', color: '#334155' }}>
                              {record.balanceSheet.assets.cash.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            </div>
                          </div>

                          {/* Revenue */}
                          <div style={{
                            padding: '14px',
                            backgroundColor: 'rgba(34, 197, 94, 0.08)',
                            borderRadius: '10px'
                          }}>
                            <div style={{ fontSize: '12px', color: '#16a34a', marginBottom: '4px', fontWeight: '600' }}>
                              Revenue
                            </div>
                            <div style={{ fontSize: '18px', fontWeight: '700', color: '#15803d' }}>
                              +{record.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            </div>
                          </div>

                          {/* Expenses */}
                          <div style={{
                            padding: '14px',
                            backgroundColor: 'rgba(239, 68, 68, 0.08)',
                            borderRadius: '10px'
                          }}>
                            <div style={{ fontSize: '12px', color: '#dc2626', marginBottom: '4px', fontWeight: '600' }}>
                              Expenses
                            </div>
                            <div style={{ fontSize: '18px', fontWeight: '700', color: '#b91c1c' }}>
                              -{record.expenses.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            </div>
                          </div>

                          {/* Liabilities */}
                          <div style={{
                            padding: '14px',
                            backgroundColor: 'rgba(59, 130, 246, 0.08)',
                            borderRadius: '10px'
                          }}>
                            <div style={{ fontSize: '12px', color: '#2563eb', marginBottom: '4px', fontWeight: '600' }}>
                              Liabilities
                            </div>
                            <div style={{ fontSize: '18px', fontWeight: '700', color: '#1d4ed8' }}>
                              {record.balanceSheet.liabilities.total.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            </div>
                          </div>

                          {/* Net Worth (Full Width) */}
                          <div style={{
                            padding: '14px',
                            backgroundColor: 'rgba(139, 92, 246, 0.08)',
                            borderRadius: '10px',
                            gridColumn: '1 / -1'
                          }}>
                            <div style={{ fontSize: '12px', color: '#7c3aed', marginBottom: '4px', fontWeight: '600' }}>
                              Total Net Worth
                            </div>
                            <div style={{ fontSize: '20px', fontWeight: '700', color: '#6d28d9' }}>
                              {record.balanceSheet.equity.netWorth.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
