// LiveStocksTicker.tsx - Real-time scrolling price ticker for all products

'use client';

import { useGameStore, CROP_DATA, ANIMAL_DATA, STRUCTURE_DATA } from '@/store/GameStore';
import { useEffect, useState } from 'react';

export default function LiveStocksTicker() {
  const marketState = useGameStore(state => state.marketState);
  const [scrollOffset, setScrollOffset] = useState(0);

  // Animate the ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollOffset(prev => (prev + 1) % 1000);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Get live prices
  const goldPrice = marketState.assets.gold?.currentPrice || 8000;
  const dollarPrice = marketState.assets.usd?.currentPrice || 2500;

  // Build ticker items
  const tickerItems = [
    { name: 'Gold', price: goldPrice, change: 0, emoji: '🪙' },
    { name: 'Dollar', price: dollarPrice, change: 0, emoji: '💵' },
    { name: 'Paddy Rice', price: CROP_DATA.paddyRice.earn, change: 0, emoji: '🌾' },
    { name: 'Sugarcane', price: CROP_DATA.sugarcane.earn, change: 0, emoji: '🎋' },
    { name: 'Dragon Fruit', price: CROP_DATA.dragonFruit.earn, change: 0, emoji: '🐉' },
    { name: 'Durian', price: CROP_DATA.durian.earn, change: 0, emoji: '🥭' },
    { name: 'Duck', price: ANIMAL_DATA.duck.earn, change: 0, emoji: '🦆' },
    { name: 'Fish', price: ANIMAL_DATA.fish.earn, change: 0, emoji: '🐟' },
    { name: 'Pig', price: ANIMAL_DATA.pig.earn, change: 0, emoji: '🐷' },
    { name: 'Shrimp', price: ANIMAL_DATA.shrimp.earn, change: 0, emoji: '🦐' }
  ];

  // Duplicate items for seamless loop
  const loopedItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 340, // Leave space for ShopSidebar
      height: '48px',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(12px)',
      borderTop: '2px solid rgba(255, 255, 255, 0.1)',
      overflow: 'hidden',
      zIndex: 90,
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Animated Ticker Track */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
        transform: `translateX(-${scrollOffset}px)`,
        whiteSpace: 'nowrap'
      }}>
        {loopedItems.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0 16px',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
          >
            <span style={{ fontSize: '18px' }}>{item.emoji}</span>
            <span style={{ color: '#cbd5e1' }}>{item.name}</span>
            <span style={{ 
              color: '#22c55e',
              fontWeight: '700',
              letterSpacing: '0.5px'
            }}>
              ${item.price.toFixed(0)}
            </span>
          </div>
        ))}
      </div>

      {/* Gradient Fade Edges */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '100px',
        background: 'linear-gradient(to right, rgba(15, 23, 42, 0.95), transparent)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '100px',
        background: 'linear-gradient(to left, rgba(15, 23, 42, 0.95), transparent)',
        pointerEvents: 'none'
      }} />
    </div>
  );
}
