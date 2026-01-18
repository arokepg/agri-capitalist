'use client';

import { useState } from 'react';
import { useGameStore, CROP_DATA, ANIMAL_DATA, STRUCTURE_DATA } from '@/store/GameStore';
import { 
  PaddyRiceIcon, SugarcaneIcon, DragonFruitIcon, DurianIcon,
  DuckIcon, FishIcon, PigIcon, ShrimpIcon,
  PondIcon, BarnIcon, WellIcon, WaterAeratorIcon
} from './AssetIcons';
import { CoinIcon, IntegrityIcon } from './FinancialIconSet';

// 4-TAB SHOP SYSTEM: CROPS, ANIMALS, STRUCTURES, INVESTMENTS
type Category = 'CROPS' | 'ANIMALS' | 'STRUCTURES' | 'INVESTMENTS';

interface ShopItem {
  id: string;
  name: string;
  price: number;
  icon: React.FC<any>;
  type: 'crop' | 'animal' | 'structure';
  category: Category;
  earn?: number;
  requires?: string[];
}

const SHOP_ITEMS: ShopItem[] = [
  // CROPS - Group A: One-Year Lifecycle
  { id: 'paddyRice', name: 'Paddy Rice', price: CROP_DATA.paddyRice.cost, earn: CROP_DATA.paddyRice.earn, icon: PaddyRiceIcon, type: 'crop', category: 'CROPS' },
  { id: 'sugarcane', name: 'Sugarcane', price: CROP_DATA.sugarcane.cost, earn: CROP_DATA.sugarcane.earn, icon: SugarcaneIcon, type: 'crop', category: 'CROPS' },
  { id: 'dragonFruit', name: 'Dragon Fruit', price: CROP_DATA.dragonFruit.cost, earn: CROP_DATA.dragonFruit.earn, icon: DragonFruitIcon, type: 'crop', category: 'CROPS' },
  { id: 'durian', name: 'Durian', price: CROP_DATA.durian.cost, earn: CROP_DATA.durian.earn, icon: DurianIcon, type: 'crop', category: 'CROPS' },
  
  // ANIMALS - Group B: Persistent Income
  { id: 'duck', name: 'Duck', price: ANIMAL_DATA.duck.cost, earn: ANIMAL_DATA.duck.earn, requires: ANIMAL_DATA.duck.requires, icon: DuckIcon, type: 'animal', category: 'ANIMALS' },
  { id: 'fish', name: 'Fish', price: ANIMAL_DATA.fish.cost, earn: ANIMAL_DATA.fish.earn, requires: ANIMAL_DATA.fish.requires, icon: FishIcon, type: 'animal', category: 'ANIMALS' },
  { id: 'pig', name: 'Pig', price: ANIMAL_DATA.pig.cost, earn: ANIMAL_DATA.pig.earn, requires: ANIMAL_DATA.pig.requires, icon: PigIcon, type: 'animal', category: 'ANIMALS' },
  { id: 'shrimp', name: 'Shrimp', price: ANIMAL_DATA.shrimp.cost, earn: ANIMAL_DATA.shrimp.earn, requires: ANIMAL_DATA.shrimp.requires, icon: ShrimpIcon, type: 'animal', category: 'ANIMALS' },
  
  // STRUCTURES - Group C
  { id: 'pond', name: 'Pond', price: STRUCTURE_DATA.pond.cost, icon: PondIcon, type: 'structure', category: 'STRUCTURES' },
  { id: 'barn', name: 'Barn', price: STRUCTURE_DATA.barn.cost, icon: BarnIcon, type: 'structure', category: 'STRUCTURES' },
  { id: 'well', name: 'Well', price: STRUCTURE_DATA.well.cost, icon: WellIcon, type: 'structure', category: 'STRUCTURES' },
  { id: 'waterAerator', name: 'Water Aerator', price: STRUCTURE_DATA.waterAerator.cost, icon: WaterAeratorIcon, type: 'structure', category: 'STRUCTURES' },
];

export default function ShopSidebar() {
  const [activeTab, setActiveTab] = useState<Category>('CROPS');
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  
  const cash = useGameStore(state => state.cash);
  const armedItem = useGameStore(state => state.armedItem);
  const hasCropInsurance = useGameStore(state => state.hasCropInsurance);
  const insuranceType = useGameStore(state => state.insuranceType);
  const hasStructureUnlocked = useGameStore(state => state.hasStructureUnlocked);
  const goldHoldings = useGameStore(state => state.goldHoldings);
  const dollarHoldings = useGameStore(state => state.dollarHoldings);
  const stockHoldings = useGameStore(state => state.stockHoldings);
  const marketState = useGameStore(state => state.marketState);
  
  const armCursor = useGameStore(state => state.armCursor);
  const openInspectionModal = useGameStore(state => state.openInspectionModal);
  const buyCropInsurance = useGameStore(state => state.buyCropInsurance);
  const buyGold = useGameStore(state => state.buyGold);
  const sellGold = useGameStore(state => state.sellGold);
  const buyDollar = useGameStore(state => state.buyDollar);
  const sellDollar = useGameStore(state => state.sellDollar);
  const buyStock = useGameStore(state => state.buyStock);
  const sellStock = useGameStore(state => state.sellStock);

  const filteredItems = SHOP_ITEMS.filter(item => item.category === activeTab);
  
  // Get gold, USD, and stocks prices from MarketEngine
  const goldAsset = marketState.assets.gold;
  const usdAsset = marketState.assets.usd;
  const stocksAsset = marketState.assets.stocks;
  const currentGoldPrice = goldAsset?.currentPrice || 8000;
  const currentDollarPrice = usdAsset?.currentPrice || 2500;
  const currentStocksPrice = stocksAsset?.currentPrice || 5000;
  const goldPriceHistory = goldAsset?.history || [8000];
  const dollarPriceHistory = usdAsset?.history || [2500];
  const stocksPriceHistory = stocksAsset?.history || [5000];

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const handleItemClick = (item: ShopItem, e: React.MouseEvent) => {
    // Right-click or Ctrl+Click for inspection
    if (e.button === 2 || e.ctrlKey) {
      e.preventDefault();
      openInspectionModal(item.type, item.id, item.name, item.price);
      return;
    }
    
    // Check prerequisites for animals
    if (item.type === 'animal' && item.requires) {
      const missingStructures = item.requires.filter(req => !hasStructureUnlocked(req));
      if (missingStructures.length > 0) {
        alert(`Requires: ${missingStructures.join(', ')}`);
        return;
      }
    }
    
    // Left-click to arm cursor
    if (cash >= item.price) {
      armCursor(item.id, item.name, item.price, item.type);
    }
  };

  // Glassmorphism style
  const glassStyle = {
    backgroundColor: 'rgba(248, 250, 252, 0.7)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
  };

  return (
    <div style={{
      position: 'fixed',
      right: 0,
      top: 0,
      width: '340px',
      height: '100vh',
      backgroundColor: 'rgba(248, 250, 252, 0.95)',
      backdropFilter: 'blur(16px)',
      borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#0f172a',
      overflowY: 'auto',
      boxShadow: '-4px 0 24px rgba(0,0,0,0.08)',
      zIndex: 100
    }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ 
          fontSize: '24px',
          fontWeight: '800',
          margin: '0 0 8px 0',
          color: '#f59e0b',
          letterSpacing: '2px',
          textShadow: '0 1px 2px #fff8'
        }}>
          SHOP
        </h2>
      </div>

      {/* Category Tabs - 4-Tab Flash Style (CROPS, ANIMALS, STRUCTURES, INVESTMENTS) */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: '6px', 
        marginBottom: '20px'
      }}>
        {(['CROPS', 'ANIMALS', 'STRUCTURES', 'INVESTMENTS'] as Category[]).map(category => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            style={{
              padding: '10px 4px',
              backgroundColor: activeTab === category ? '#e2e8f0' : 'rgba(248, 250, 252, 0.5)',
              border: `2px solid ${activeTab === category ? '#4b5563' : '#cbd5e1'}`,
              borderRadius: '8px',
              color: activeTab === category ? '#0f172a' : '#64748b',
              cursor: 'pointer',
              fontSize: '9px',
              fontFamily: 'inherit',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.3px',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease'
            }}
          >
            {category === 'INVESTMENTS' ? 'INVEST' : category}
          </button>
        ))}
      </div>

      {/* Inspection Help Text */}
      <div style={{
        marginBottom: '16px',
        padding: '10px',
        backgroundColor: 'rgba(100, 116, 139, 0.08)',
        borderRadius: '8px',
        border: '1px solid rgba(100, 116, 139, 0.15)'
      }}>
        <p style={{
          fontSize: '10px',
          color: '#64748b',
          margin: 0,
          lineHeight: '1.4',
          fontWeight: '500',
          textAlign: 'center'
        }}>
          <strong>Right-Click</strong> or <strong>Ctrl+Click</strong> any item for detailed info
        </p>
      </div>

      {/* Armed Item Indicator */}
      {armedItem && (
        <div style={{
          marginBottom: '16px',
          padding: '12px',
          ...glassStyle,
          background: '#e2e8f0',
          border: '2px solid #4b5563',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ 
              fontSize: '11px', 
              color: '#4b5563',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '4px'
            }}>
              READY TO PLACE
            </div>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '700',
              color: '#0f172a'
            }}>
              {armedItem.name}
            </div>
          </div>
          <button
            onClick={() => armCursor(null, null, 0, null)}
            style={{
              padding: '6px 12px',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '2px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '6px',
              color: '#ef4444',
              cursor: 'pointer',
              fontSize: '10px',
              fontFamily: 'inherit',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            CANCEL
          </button>
        </div>
      )}

      {/* Item Grid - 2 Column Flash Style */}
      {activeTab !== 'INVESTMENTS' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px'
        }}>
        {filteredItems.map(item => {
            const Icon = item.icon;
            const canAfford = cash >= item.price;
            const isArmed = armedItem?.id === item.id;
            
            // Check prerequisites
            let missingRequirements = '';
            if (item.requires) {
              const missing = item.requires.filter(req => !hasStructureUnlocked(req));
              if (missing.length > 0) {
                missingRequirements = `Needs: ${missing.join(', ')}`;
              }
            }

            return (
              <button
                key={item.id}
                onClick={(e) => handleItemClick(item, e)}
                onContextMenu={(e) => handleItemClick(item, e)}
                disabled={!canAfford || !!missingRequirements}
                style={{
                  padding: '16px',
                  ...glassStyle,
                  background: isArmed 
                    ? '#e2e8f0' 
                    : canAfford && !missingRequirements
                      ? 'rgba(248, 250, 252, 0.4)' 
                      : 'rgba(100, 116, 139, 0.1)',
                  border: isArmed 
                    ? '2px solid #4b5563' 
                    : `2px solid ${canAfford && !missingRequirements ? '#cbd5e1' : 'rgba(239, 68, 68, 0.2)'}`,
                  borderRadius: '12px',
                  cursor: canAfford && !missingRequirements ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  opacity: canAfford && !missingRequirements ? 1 : 0.5,
                  aspectRatio: '1',
                  position: 'relative'
                }}
              >
                {/* Icon */}
                <Icon size={42} color={isArmed ? '#4b5563' : canAfford && !missingRequirements ? '#0f172a' : '#94a3b8'} />
                
                {/* Name */}
                <div style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: isArmed ? '#0f172a' : canAfford && !missingRequirements ? '#0f172a' : '#94a3b8',
                  textAlign: 'center',
                  lineHeight: '1.2'
                }}>
                  {item.name}
                </div>
                
                {/* Price */}
                <div style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#0f172a'
                }}>
                  {formatCurrency(item.price)}
                </div>
                
                {/* Earn indicator */}
                {item.earn && (
                  <div style={{
                    fontSize: '10px',
                    color: '#22c55e',
                    fontWeight: '600'
                  }}>
                    Earn: {formatCurrency(item.earn)}
                  </div>
                )}
                
                {/* Missing requirements */}
                {missingRequirements && (
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    right: '8px',
                    fontSize: '8px',
                    color: '#ef4444',
                    fontWeight: '600',
                    textAlign: 'center',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    padding: '4px',
                    borderRadius: '4px'
                  }}>
                    {missingRequirements}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
      
      {/* INVESTMENTS TAB CONTENT */}
      {activeTab === 'INVESTMENTS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Crop Insurance */}
          <div style={{
            padding: '16px',
            ...glassStyle,
            borderRadius: '12px',
            border: '2px solid #cbd5e1'
          }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '700', 
              marginBottom: '12px',
              color: '#0f172a'
            }}>
              🛡️ Crop Insurance
            </h3>
            
            {hasCropInsurance ? (
              <div style={{
                padding: '12px',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                borderRadius: '8px',
                border: '2px solid rgba(34, 197, 94, 0.3)'
              }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#166534' }}>
                  ✓ Insured ({insuranceType === 'oneTime' ? 'One-Time' : 'Annual'})
                </div>
                <div style={{ fontSize: '11px', color: '#166534', marginTop: '4px' }}>
                  Protected from harvest failures
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => buyCropInsurance('oneTime')}
                  disabled={cash < 8000}
                  style={{
                    padding: '12px',
                    backgroundColor: cash >= 8000 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                    border: `2px solid ${cash >= 8000 ? '#22c55e' : '#cbd5e1'}`,
                    borderRadius: '8px',
                    cursor: cash >= 8000 ? 'pointer' : 'not-allowed',
                    opacity: cash >= 8000 ? 1 : 0.5
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                    One-Time Purchase
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#22c55e', marginTop: '4px' }}>
                    $8,000
                  </div>
                </button>
                
                <button
                  onClick={() => buyCropInsurance('annual')}
                  disabled={cash < 1000}
                  style={{
                    padding: '12px',
                    backgroundColor: cash >= 1000 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                    border: `2px solid ${cash >= 1000 ? '#3b82f6' : '#cbd5e1'}`,
                    borderRadius: '8px',
                    cursor: cash >= 1000 ? 'pointer' : 'not-allowed',
                    opacity: cash >= 1000 ? 1 : 0.5
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                    Annual Renewal
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#3b82f6', marginTop: '4px' }}>
                    $1,000/year
                  </div>
                </button>
              </div>
            )}
          </div>
          
          {/* Gold Investment */}
          <div style={{
            padding: '16px',
            ...glassStyle,
            borderRadius: '12px',
            border: '2px solid #f59e0b'
          }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '700', 
              marginBottom: '8px',
              color: '#0f172a'
            }}>
              🪙 Gold
            </h3>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>
              Holdings: {goldHoldings} oz | Price: {formatCurrency(currentGoldPrice)}/oz
            </div>
            
            {/* Interactive Line Graph */}
            <div style={{
              height: '60px',
              position: 'relative',
              marginBottom: '12px',
              padding: '8px',
              backgroundColor: 'rgba(0,0,0,0.05)',
              borderRadius: '6px'
            }}>
              <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {goldPriceHistory.length > 1 && (() => {
                  const prices = goldPriceHistory.slice(-12);
                  const maxPrice = Math.max(...prices);
                  const minPrice = Math.min(...prices);
                  const range = maxPrice - minPrice || 1;
                  const points = prices.map((price, i) => {
                    const x = (i / (prices.length - 1)) * 100;
                    const y = 40 - ((price - minPrice) / range) * 35;
                    return `${x},${y}`;
                  }).join(' ');
                  const areaPoints = `0,40 ${points} 100,40`;
                  return (
                    <>
                      <polygon points={areaPoints} fill="url(#goldGradient)"/>
                      <polyline
                        points={points}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  );
                })()}
              </svg>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => buyGold(1)}
                disabled={cash < currentGoldPrice}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: cash >= currentGoldPrice ? '#f59e0b' : '#cbd5e1',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: cash >= currentGoldPrice ? 'pointer' : 'not-allowed'
                }}
              >
                BUY 1
              </button>
              <button
                onClick={() => sellGold(1)}
                disabled={goldHoldings < 1}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: goldHoldings >= 1 ? '#ef4444' : '#cbd5e1',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: goldHoldings >= 1 ? 'pointer' : 'not-allowed'
                }}
              >
                SELL 1
              </button>
            </div>
          </div>
          
          {/* Dollar Investment */}
          <div style={{
            padding: '16px',
            ...glassStyle,
            borderRadius: '12px',
            border: '2px solid #22c55e'
          }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '700', 
              marginBottom: '8px',
              color: '#0f172a'
            }}>
              💵 US Dollar
            </h3>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>
              Holdings: {dollarHoldings} units | Price: {formatCurrency(currentDollarPrice)}/unit
            </div>
            
            {/* Interactive Line Graph */}
            <div style={{
              height: '60px',
              position: 'relative',
              marginBottom: '12px',
              padding: '8px',
              backgroundColor: 'rgba(0,0,0,0.05)',
              borderRadius: '6px'
            }}>
              <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="dollarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {dollarPriceHistory.length > 1 && (() => {
                  const prices = dollarPriceHistory.slice(-12);
                  const maxPrice = Math.max(...prices);
                  const minPrice = Math.min(...prices);
                  const range = maxPrice - minPrice || 1;
                  const points = prices.map((price, i) => {
                    const x = (i / (prices.length - 1)) * 100;
                    const y = 40 - ((price - minPrice) / range) * 35;
                    return `${x},${y}`;
                  }).join(' ');
                  const areaPoints = `0,40 ${points} 100,40`;
                  return (
                    <>
                      <polygon points={areaPoints} fill="url(#dollarGradient)"/>
                      <polyline
                        points={points}
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  );
                })()}
              </svg>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => buyDollar(1)}
                disabled={cash < currentDollarPrice}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: cash >= currentDollarPrice ? '#22c55e' : '#cbd5e1',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: cash >= currentDollarPrice ? 'pointer' : 'not-allowed'
                }}
              >
                BUY 1
              </button>
              <button
                onClick={() => sellDollar(1)}
                disabled={dollarHoldings < 1}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: dollarHoldings >= 1 ? '#ef4444' : '#cbd5e1',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: dollarHoldings >= 1 ? 'pointer' : 'not-allowed'
                }}
              >
                SELL 1
              </button>
            </div>
          </div>
          
          {/* Stocks Investment */}
          <div style={{
            padding: '16px',
            ...glassStyle,
            borderRadius: '12px',
            border: '2px solid #8b5cf6'
          }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '700', 
              marginBottom: '8px',
              color: '#0f172a'
            }}>
              📈 Stocks
            </h3>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>
              Holdings: {stockHoldings['stocks'] || 0} shares | Price: {formatCurrency(currentStocksPrice)}/share
            </div>
            
            {/* Interactive Line Graph */}
            <div style={{
              height: '60px',
              position: 'relative',
              marginBottom: '12px',
              padding: '8px',
              backgroundColor: 'rgba(0,0,0,0.05)',
              borderRadius: '6px'
            }}>
              <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="stocksGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {stocksPriceHistory.length > 1 && (() => {
                  const prices = stocksPriceHistory.slice(-12);
                  const maxPrice = Math.max(...prices);
                  const minPrice = Math.min(...prices);
                  const range = maxPrice - minPrice || 1;
                  const points = prices.map((price, i) => {
                    const x = (i / (prices.length - 1)) * 100;
                    const y = 40 - ((price - minPrice) / range) * 35;
                    return `${x},${y}`;
                  }).join(' ');
                  const areaPoints = `0,40 ${points} 100,40`;
                  return (
                    <>
                      <polygon points={areaPoints} fill="url(#stocksGradient)"/>
                      <polyline
                        points={points}
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  );
                })()}
              </svg>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => buyStock('stocks', 1)}
                disabled={cash < currentStocksPrice}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: cash >= currentStocksPrice ? '#8b5cf6' : '#cbd5e1',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: cash >= currentStocksPrice ? 'pointer' : 'not-allowed'
                }}
              >
                BUY 1
              </button>
              <button
                onClick={() => sellStock('stocks', 1)}
                disabled={(stockHoldings['stocks'] || 0) < 1}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: (stockHoldings['stocks'] || 0) >= 1 ? '#ef4444' : '#cbd5e1',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: (stockHoldings['stocks'] || 0) >= 1 ? 'pointer' : 'not-allowed'
                }}
              >
                SELL 1
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Helper Text */}
      <div style={{
        marginTop: '20px',
        padding: '12px',
        ...glassStyle,
        background: 'rgba(251, 191, 36, 0.1)',
        border: '2px solid rgba(251, 191, 36, 0.3)',
        borderRadius: '10px',
        fontSize: '11px',
        color: '#92400e',
        fontWeight: '500',
        lineHeight: '1.6',
        textAlign: 'center'
      }}>
        <strong>Click</strong> an item to arm your cursor, then <strong>click a tile</strong> to place.
      </div>
    </div>
  );
}
