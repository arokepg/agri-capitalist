'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useGameStore } from '@/store/GameStore';
import GameUI from '@/components/GameUI';
import ShopSidebar from '@/components/ShopSidebar';
import BalanceSheetModal from '@/components/BalanceSheetModal';
import StockTicker from '@/components/StockTicker';
import InspectionModal from '@/components/InspectionModal';
import HowToPlayModal from '@/components/HowToPlayModal';
import YearReportModal from '@/components/YearReportModal';
import EndTurnAnimation from '@/components/EndTurnAnimation';

// Dynamic import to avoid SSR issues with Three.js
const GameCanvas = dynamic(() => import('@/components/GameCanvas'), {
  ssr: false,
  loading: () => null
});

export default function Home() {
  const initializeGame = useGameStore(state => state.initializeGame);
  const showInspectionModal = useGameStore(state => state.showInspectionModal);
  const inspectedAsset = useGameStore(state => state.inspectedAsset);
  const closeInspectionModal = useGameStore(state => state.closeInspectionModal);
  const showTutorialModal = useGameStore(state => state.showTutorialModal);
  const closeTutorialModal = useGameStore(state => state.closeTutorialModal);
  const showYearReportModal = useGameStore(state => state.showYearReportModal);
  const closeYearReportModal = useGameStore(state => state.closeYearReportModal);
  const yearHistory = useGameStore(state => state.yearHistory);
  const year = useGameStore(state => state.year);
  const showEndTurnAnimation = useGameStore(state => state.showEndTurnAnimation);
  const processYearEnd = useGameStore(state => state.processYearEnd);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return (
    <main style={{ width: '100vw', height: '100vh', display: 'flex', background: '#ADD8E6' }}>
      {/* 3D Canvas */}
      <div style={{ flex: 1, position: 'relative' }}>
        <GameCanvas />
        <GameUI />
        <StockTicker />
      </div>

      {/* Shop Sidebar */}
      <ShopSidebar />

      {/* Balance Sheet Modal */}
      <BalanceSheetModal />

      {/* Inspection Modal */}
      <InspectionModal 
        isOpen={showInspectionModal}
        onClose={closeInspectionModal}
        assetType={inspectedAsset?.type || null}
        assetId={inspectedAsset?.id || null}
        assetName={inspectedAsset?.name || null}
        price={inspectedAsset?.price || 0}
      />

      {/* How To Play Modal */}
      <HowToPlayModal 
        isOpen={showTutorialModal}
        onClose={closeTutorialModal}
      />

      {/* Year Report Modal */}
      <YearReportModal 
        isOpen={showYearReportModal}
        onClose={closeYearReportModal}
        yearHistory={yearHistory}
        currentYear={year}
      />

      {/* End Turn Animation */}
      <EndTurnAnimation 
        isVisible={showEndTurnAnimation}
        onComplete={processYearEnd}
      />
    </main>
  );
}
