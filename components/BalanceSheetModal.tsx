'use client';

import { useGameStore } from '@/store/GameStore';
import { WarningIcon, CoinIcon, CalendarIcon } from './FinancialIconSet';
import { XIcon } from './IconLibrary';

export default function BalanceSheetModal() {
  const showBalanceSheet = useGameStore(state => state.showBalanceSheet);
  const balanceSheet = useGameStore(state => state.balanceSheet);
  const currentEvent = useGameStore(state => state.currentEvent);
  const year = useGameStore(state => state.year);
  const integrity = useGameStore(state => state.integrity);
  const gameOver = useGameStore(state => state.gameOver);
  const closeBalanceSheet = useGameStore(state => state.closeBalanceSheet);
  const handleCorruptionChoice = useGameStore(state => state.handleCorruptionChoice);

  if (!showBalanceSheet || !balanceSheet) return null;

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.75)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '24px',
      backdropFilter: 'blur(12px)'
    }}>
      <div style={{
        backgroundColor: 'rgba(248, 250, 252, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '75vh',
        overflowY: 'auto',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#0f172a',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        marginTop: '120px',
        marginBottom: '80px',
        position: 'relative'
      }}>
        {/* X Close Button - Top Right */}
        <button
          onClick={closeBalanceSheet}
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
            fontFamily: 'inherit'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(248, 250, 252, 0.9)';
            e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.2)';
          }}
        >
          <XIcon size={16} color="#334155" />
        </button>

        {/* Header */}
        <div style={{ 
          borderBottom: '3px solid rgba(100, 116, 139, 0.2)', 
          paddingBottom: '20px', 
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            {gameOver && <WarningIcon size={32} color="#ef4444" />}
            {!gameOver && <CalendarIcon size={32} color="#0f172a" />}
            <h1 style={{ 
              fontSize: '32px', 
              margin: 0,
              fontWeight: '700',
              color: gameOver ? '#ef4444' : '#0f172a'
            }}>
              {gameOver ? 'FARM SEIZED' : `Year ${year - 1} Report`}
            </h1>
          </div>
          <p style={{ 
            fontSize: '15px', 
            marginTop: '8px', 
            color: '#64748b',
            fontWeight: '500'
          }}>
            Farm Integrity: <span style={{ 
              color: integrity > 60 ? '#22c55e' : integrity > 30 ? '#f59e0b' : '#ef4444',
              fontWeight: '700'
            }}>{integrity}%</span>
            {integrity <= 20 && (
              <span style={{ marginLeft: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <WarningIcon size={16} color="#ef4444" />
                <span style={{ color: '#ef4444', fontWeight: '700' }}>CRITICAL</span>
              </span>
            )}
          </p>
        </div>

        {/* Event Notice */}
        {currentEvent && currentEvent.type !== 'CORRUPTION' && (
          <div style={{
            backgroundColor: currentEvent.type === 'FORTUNE' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `3px solid ${currentEvent.type === 'FORTUNE' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <WarningIcon 
                size={24} 
                color={currentEvent.type === 'FORTUNE' ? '#22c55e' : '#ef4444'} 
              />
              <h3 style={{ 
                margin: 0, 
                color: currentEvent.type === 'FORTUNE' ? '#22c55e' : '#ef4444',
                fontSize: '18px',
                fontWeight: '700'
              }}>
                {currentEvent.name}
              </h3>
            </div>
            <p style={{ 
              margin: 0, 
              fontSize: '14px', 
              color: currentEvent.type === 'FORTUNE' ? '#16a34a' : '#dc2626',
              lineHeight: '1.6',
              fontWeight: '500'
            }}>
              {currentEvent.description}
            </p>
          </div>
        )}

        {/* Corruption Choice */}
        {currentEvent && currentEvent.type === 'CORRUPTION' && !gameOver && (
          <div style={{
            backgroundColor: 'rgba(251, 191, 36, 0.1)',
            border: '3px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <CoinIcon size={28} color="#f59e0b" />
              <h3 style={{ 
                margin: 0, 
                color: '#ea580c',
                fontSize: '20px',
                fontWeight: '700'
              }}>
                {currentEvent.name}
              </h3>
            </div>
            <p style={{ 
              margin: '0 0 20px 0', 
              fontSize: '15px', 
              color: '#c2410c',
              lineHeight: '1.6',
              fontWeight: '500'
            }}>
              {currentEvent.description}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => handleCorruptionChoice(true)}
                style={{
                  flex: 1,
                  padding: '16px',
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  border: '2px solid rgba(34, 197, 94, 0.4)',
                  borderRadius: '10px',
                  color: '#22c55e',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
                }}
              >
                PAY {formatCurrency(currentEvent.effects.payAmount)}
              </button>
              <button
                onClick={() => handleCorruptionChoice(false)}
                style={{
                  flex: 1,
                  padding: '16px',
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  border: '2px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: '10px',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
                }}
              >
                REFUSE (-{Math.abs(currentEvent.effects.refuseIntegrityLoss)}% Integrity)
              </button>
            </div>
          </div>
        )}

        {/* Assets */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ 
            fontSize: '20px',
            marginBottom: '16px',
            color: '#22c55e',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: '0 1px 2px #fff8'
          }}>
            Assets
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {[
                ['Cash on Hand', balanceSheet.assets.cash],
                ['Stock Portfolio', balanceSheet.assets.stockValue],
                ['Land Value', balanceSheet.assets.landValue],
                ['Livestock Value', balanceSheet.assets.livestockValue],
                ['Building Value', balanceSheet.assets.buildingValue]
              ].map(([label, value], i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(100, 116, 139, 0.15)' }}>
                  <td style={{ 
                    padding: '14px 0', 
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#64748b'
                  }}>{label}</td>
                  <td style={{ 
                    textAlign: 'right', 
                    padding: '14px 0',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#0f172a'
                  }}>
                    {formatCurrency(value as number)}
                  </td>
                </tr>
              ))}
              <tr style={{ borderTop: '3px solid rgba(34, 197, 94, 0.3)' }}>
                <td style={{ 
                  padding: '16px 0',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#0f172a'
                }}>TOTAL ASSETS</td>
                <td style={{ 
                  textAlign: 'right', 
                  padding: '16px 0',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#22c55e'
                }}>
                  {formatCurrency(balanceSheet.assets.total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Liabilities */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ 
            fontSize: '20px',
            marginBottom: '16px',
            color: '#ef4444',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: '0 1px 2px #fff8'
          }}>
            Liabilities
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {[
                ['Outstanding Loans (8% APR)', balanceSheet.liabilities.loans],
                ['Unpaid Maintenance', balanceSheet.liabilities.unpaidMaintenance],
                ['Yearly Tax Liability', balanceSheet.liabilities.yearlyTaxLiability]
              ].map(([label, value], i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(100, 116, 139, 0.15)' }}>
                  <td style={{ 
                    padding: '14px 0',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#64748b'
                  }}>{label}</td>
                  <td style={{ 
                    textAlign: 'right', 
                    padding: '14px 0',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#0f172a'
                  }}>
                    {formatCurrency(value as number)}
                  </td>
                </tr>
              ))}
              <tr style={{ borderTop: '3px solid rgba(239, 68, 68, 0.3)' }}>
                <td style={{ 
                  padding: '16px 0',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#0f172a'
                }}>TOTAL LIABILITIES</td>
                <td style={{ 
                  textAlign: 'right', 
                  padding: '16px 0',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#ef4444'
                }}>
                  {formatCurrency(balanceSheet.liabilities.total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Equity */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ 
            fontSize: '20px', 
            marginBottom: '16px', 
            color: '#3b82f6',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Equity
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ 
                borderTop: '4px solid rgba(59, 130, 246, 0.3)',
                borderBottom: '4px solid rgba(59, 130, 246, 0.3)'
              }}>
                <td style={{ 
                  padding: '20px 0',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#0f172a'
                }}>NET WORTH</td>
                <td style={{ 
                  textAlign: 'right', 
                  padding: '20px 0',
                  fontSize: '24px',
                  fontWeight: '800',
                  color: balanceSheet.equity.netWorth >= 0 ? '#3b82f6' : '#ef4444',
                  textShadow: '0 1px 2px #fff8'
                }}>
                  {formatCurrency(balanceSheet.equity.netWorth)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Continue Button */}
        {!gameOver && currentEvent?.type !== 'CORRUPTION' && (
          <button
            onClick={closeBalanceSheet}
            style={{
              width: '100%',
              padding: '18px',
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
              border: '2px solid rgba(34, 197, 94, 0.4)',
              borderRadius: '12px',
              color: '#22c55e',
              cursor: 'pointer',
              fontSize: '16px',
              fontFamily: 'inherit',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 16px rgba(34, 197, 94, 0.3)'
            }}
          >
            Continue to Year {year}
          </button>
        )}

        {/* Game Over */}
        {gameOver && (
          <div style={{
            textAlign: 'center',
            padding: '24px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '3px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            marginTop: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              <WarningIcon size={48} color="#ef4444" />
            </div>
            <p style={{ 
              fontSize: '20px', 
              color: '#dc2626', 
              margin: '0 0 12px 0',
              fontWeight: '700'
            }}>
              Farm seized by the state.
            </p>
            <p style={{ 
              fontSize: '15px', 
              color: '#dc2626', 
              fontWeight: '500'
            }}>
              Final Net Worth: {formatCurrency(balanceSheet.equity.netWorth)}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '16px',
                padding: '14px 28px',
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                border: '2px solid rgba(34, 197, 94, 0.4)',
                borderRadius: '10px',
                color: '#22c55e',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: 'inherit',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
              }}
            >
              New Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
