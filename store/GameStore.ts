// GameStore.ts - Zustand state management for Agri-Capitalist 3D

import { create } from 'zustand';
import { marketEngine, MarketState } from '@/engine/MarketEngine';
import eventListData from '@/data/EventList.json';

export interface GridTile {
  id: string;
  x: number;
  z: number;
  type: 'EMPTY' | 'CROP' | 'LIVESTOCK' | 'STRUCTURE';
  content: string | null; // 'corn', 'wheat', 'chicken', 'well', etc.
  health: number;
  cropValue: number;
  livestockCount: number;
}

export interface ArmedItem {
  id: string | null;
  name: string | null;
  price: number;
  type: 'crop' | 'animal' | 'structure' | null;
}

export interface GameEvent {
  id: string;
  type: string;
  name: string;
  description: string;
  effects: any;
}

export interface BalanceSheet {
  assets: {
    cash: number;
    stockValue: number;
    landValue: number;
    livestockValue: number;
    buildingValue: number;
    total: number;
  };
  liabilities: {
    loans: number;
    unpaidMaintenance: number;
    yearlyTaxLiability: number;
    total: number;
  };
  equity: {
    netWorth: number;
  };
}

export interface YearHistory {
  year: number;
  balanceSheet: BalanceSheet;
  event: GameEvent | null;
  revenue: number;
  expenses: number;
}

interface GameState {
  // Core State
  year: number;
  cash: number;
  integrity: number;
  grid: GridTile[];
  gridSize: number;
  
  // Visual State
  isDrought: boolean;
  
  // Market & Trading
  marketState: MarketState;
  stockHoldings: Record<string, number>;
  
  // Investments
  goldHoldings: number;
  dollarHoldings: number;
  stocksHoldings: number;
  
  // Insurance
  hasCropInsurance: boolean;
  insuranceType: 'none' | 'oneTime' | 'annual';
  
  // Events
  currentEvent: GameEvent | null;
  eventHistory: GameEvent[];
  
  // Financial
  loans: number;
  loanInterestRate: number; // 8% APR
  unpaidMaintenance: number;
  yearlyTaxLiability: number;
  buildingValue: number;
  nextTurnForecast: string | null;
  tools: {
    handTools: boolean;
    animalPlow: boolean;
    tractor: boolean;
    tractorRenovated: boolean;
    harvester: boolean;
  };
  
  // Modifiers
  cropYieldMultiplier: number;
  sellPriceMultiplier: number;
  livestockMultiplier: number;
  specificCropMultipliers: Record<string, number>;
  
  // Shop & Placement
  armedItem: ArmedItem | null;
  interactionMode: 'PLANT' | 'SELL' | 'RENOVATE'; // v2.0: Added RENOVATE mode
  
  // UI
  showBalanceSheet: boolean;
  balanceSheet: BalanceSheet | null;
  gameOver: boolean;
  showInspectionModal: boolean;
  inspectedAsset: {
    type: 'crop' | 'animal' | 'structure' | null;
    id: string | null;
    name: string | null;
    price: number;
  } | null;
  showTutorialModal: boolean;
  showYearReportModal: boolean;
  yearHistory: YearHistory[];
  showEndTurnAnimation: boolean;
  currentAnimationMonth: number;
  
  // Actions
  initializeGame: () => void;
  endYear: () => void;
  processYearEnd: () => void;
  buyStock: (stockId: string, quantity: number) => void;
  sellStock: (stockId: string, quantity: number) => void;
  expandGrid: () => void;
  armCursor: (id: string | null, name: string | null, price: number, type: 'crop' | 'animal' | 'structure' | null) => void;
  placeArmedItem: (x: number, z: number) => void;
  liquidateAsset: (x: number, z: number) => void; // Sell mechanic: 70% refund
  renovateAsset: (x: number, z: number) => void; // v2.0: Upgrade structures
  setInteractionMode: (mode: 'PLANT' | 'SELL' | 'RENOVATE') => void; // v2.0: Added RENOVATE
  handleCorruptionChoice: (accept: boolean) => void;
  calculateBalanceSheet: () => BalanceSheet;
  closeBalanceSheet: () => void;
  openInspectionModal: (type: 'crop' | 'animal' | 'structure', id: string, name: string, price: number) => void;
  closeInspectionModal: () => void;
  openTutorialModal: () => void;
  closeTutorialModal: () => void;
  openYearReportModal: () => void;
  closeYearReportModal: () => void;
  setTool: (tool: keyof GameState['tools'], value: boolean) => void;
  buyGold: (amount: number) => void;
  sellGold: (amount: number) => void;
  buyDollar: (amount: number) => void;
  sellDollar: (amount: number) => void;
  buyStocks: (amount: number) => void;
  sellStocks: (amount: number) => void;
  buyCropInsurance: (type: 'oneTime' | 'annual') => void;
  hasStructureUnlocked: (structureId: string) => boolean;
}

const BASE_LAND_PRICE = 1000;
const LIVESTOCK_VALUE = 300;
const CROP_BASE_VALUE = 150;
const TAX_PER_TILE = 50;

// NEW ECONOMY DATA
const CROP_DATA: Record<string, { cost: number; earn: number; risk: string }> = {
  paddyRice: { cost: 20, earn: 40, risk: 'Low' },
  sugarcane: { cost: 30, earn: 70, risk: 'Moderate' },
  dragonFruit: { cost: 65, earn: 120, risk: 'High' },
  durian: { cost: 120, earn: 900, risk: 'Extremely High' }
};

const ANIMAL_DATA: Record<string, { cost: number; earn: number; requires: string[] }> = {
  duck: { cost: 70, earn: 100, requires: ['barn'] },
  fish: { cost: 90, earn: 140, requires: ['pond', 'well'] },
  pig: { cost: 120, earn: 250, requires: ['well', 'barn'] },
  shrimp: { cost: 200, earn: 1200, requires: ['pond', 'waterAerator'] }
};

const STRUCTURE_DATA: Record<string, { cost: number }> = {
  pond: { cost: 200 },
  barn: { cost: 150 },
  well: { cost: 250 },
  waterAerator: { cost: 300 }
};

const INTEGRITY_PROFIT_BOOST = 5; // 5% increase per profitable year

export const useGameStore = create<GameState>((set, get) => ({
  // Initial State
  year: 1,
  cash: 10000, // v5.8: Start with 10k
  integrity: 100,
  grid: [],
  gridSize: 5,
  isDrought: false,
  marketState: marketEngine.getMarketState(),
  stockHoldings: {},
  goldHoldings: 0,
  dollarHoldings: 0,
  stocksHoldings: 0,
  hasCropInsurance: false,
  insuranceType: 'none',
  currentEvent: null,
  eventHistory: [],
  loans: 0,
  loanInterestRate: 0.08,
  unpaidMaintenance: 0,
  armedItem: null,
  interactionMode: 'PLANT',
  yearlyTaxLiability: 0,
  buildingValue: 0,
  nextTurnForecast: null,
  tools: {
    handTools: false,
    animalPlow: false,
    tractor: false,
    tractorRenovated: false,
    harvester: false
  },
  cropYieldMultiplier: 1,
  sellPriceMultiplier: 1,
  livestockMultiplier: 1,
  specificCropMultipliers: {},
  showBalanceSheet: false,
  balanceSheet: null,
  gameOver: false,
  showInspectionModal: false,
  inspectedAsset: null,
  showTutorialModal: false,
  showYearReportModal: false,
  yearHistory: [],
  showEndTurnAnimation: false,
  currentAnimationMonth: 0,

  initializeGame: () => {
    const initialGrid: GridTile[] = [];
    for (let x = 0; x < 5; x++) {
      for (let z = 0; z < 5; z++) {
        initialGrid.push({
          id: `tile-${x}-${z}`,
          x,
          z,
          type: 'EMPTY',
          content: null,
          health: 100,
          cropValue: 0,
          livestockCount: 0
        });
      }
    }
    
    const initialTaxLiability = 5 * 5 * TAX_PER_TILE;
    
    set({
      grid: initialGrid,
      year: 1,
      cash: 10000,
      integrity: 100,
      gameOver: false,
      isDrought: false,
      stockHoldings: {},
      goldHoldings: 0,
      dollarHoldings: 0,
      stocksHoldings: 0,
      currentEvent: null,
      cropYieldMultiplier: 1,
      sellPriceMultiplier: 1,
      livestockMultiplier: 1,
      specificCropMultipliers: {},
      loans: 0,
      unpaidMaintenance: 0,
      yearlyTaxLiability: initialTaxLiability,
      buildingValue: 0,
      armedItem: null,
      showEndTurnAnimation: false,
      currentAnimationMonth: 0
    });
    
    marketEngine.resetMarket();
    set({ marketState: marketEngine.getMarketState() });
  },

  endYear: () => {
    const state = get();
    
    if (state.integrity <= 0) {
      set({
        gameOver: true,
        balanceSheet: get().calculateBalanceSheet(),
        showBalanceSheet: true
      });
      return;
    }

    // Trigger the month-flip calendar animation
    set({ showEndTurnAnimation: true });
    // processYearEnd will be called by the animation's onComplete callback
  },

  processYearEnd: () => {
    const state = get();

    const openingCash = state.cash;
    const nextYear = state.year + 1;

    // STEP 1: EVENT ROLL
    const events = eventListData.events;
    const randomRoll = Math.random();
    let selectedEvent: GameEvent | null = null;
    let cumulativeProbability = 0;
    for (const event of events) {
      cumulativeProbability += event.probability;
      if (randomRoll < cumulativeProbability) {
        selectedEvent = event as GameEvent;
        break;
      }
    }

    // Apply event immediately to align with sequence
    if (selectedEvent) {
      const effects = selectedEvent.effects;
      let updatedIntegrity = state.integrity;
      let updatedCash = state.cash;
      let newGrid = [...state.grid];
      let droughtState = state.isDrought;

      if (effects.visualFeedback === 'drought') droughtState = true;
      if (effects.visualFeedback === 'rain' || effects.visualFeedback === 'sunshine') droughtState = false;

      if (effects.cropYieldMultiplier !== undefined) set({ cropYieldMultiplier: effects.cropYieldMultiplier });
      if (effects.sellPriceMultiplier !== undefined) set({ sellPriceMultiplier: effects.sellPriceMultiplier });
      if (effects.livestockMultiplier !== undefined) set({ livestockMultiplier: effects.livestockMultiplier });

      // Handle crop failures with insurance protection
      if (effects.cropFailure && effects.insuranceProtected) {
        if (!state.hasCropInsurance) {
          // No insurance - wipe out the crop
          newGrid = newGrid.map(tile => {
            if (tile.type === 'CROP' && tile.content === effects.cropFailure) {
              return { ...tile, type: 'EMPTY', content: null, cropValue: 0, livestockCount: 0 };
            }
            return tile;
          });
        } else {
          // Insurance protects - set multiplier to 1.0 instead of 0
          set({ specificCropMultipliers: { ...get().specificCropMultipliers, [effects.cropFailure]: 1.0 } });
        }
      }

      // Handle animal losses
      if (effects.animalLoss) {
        newGrid = newGrid.map(tile => {
          if (tile.type === 'LIVESTOCK' && effects.animalLoss.includes(tile.content || '')) {
            return { ...tile, type: 'EMPTY', content: null, cropValue: 0, livestockCount: 0 };
          }
          return tile;
        });
      }

      // Handle specific crop/animal multipliers
      if (effects.specificCropMultiplier) {
        // Store for later use during harvest
        set({ specificCropMultipliers: effects.specificCropMultiplier });
      }

      if (effects.integrity) {
        updatedIntegrity = Math.max(0, Math.min(100, updatedIntegrity + effects.integrity));
      }
      if (effects.cashLoss) updatedCash = Math.max(0, updatedCash - effects.cashLoss);
      if (effects.cashGain) updatedCash += effects.cashGain;

      if (effects.tilesLost) {
        let removed = 0;
        newGrid = newGrid.map(tile => {
          if (tile.type !== 'EMPTY' && removed < effects.tilesLost) {
            removed++;
            return { ...tile, type: 'EMPTY', content: null, cropValue: 0, livestockCount: 0 };
          }
          return tile;
        });
      }

      if (effects.marketImpact) {
        marketEngine.applyEventImpacts(effects.marketImpact);
      }

      set({
        currentEvent: selectedEvent,
        integrity: updatedIntegrity,
        cash: updatedCash,
        grid: newGrid,
        isDrought: droughtState,
        eventHistory: [...state.eventHistory, selectedEvent]
      });
    }

    // Comm Tower: forecast next turn event
    const hasCommTower = get().grid.some(t => t.type === 'STRUCTURE' && t.content === 'comm_tower');
    if (hasCommTower) {
      const forecastRoll = Math.random();
      let forecast: GameEvent | null = null;
      let cumulative = 0;
      for (const event of events) {
        cumulative += event.probability;
        if (forecastRoll < cumulative) {
          forecast = event as GameEvent;
          break;
        }
      }
      set({ nextTurnForecast: forecast ? forecast.name : null });
    } else {
      set({ nextTurnForecast: null });
    }

    // Keep market volatility in sync with events
    marketEngine.simulateRandomFluctuation();
    set({ marketState: marketEngine.getMarketState() });

    const hasWell = get().grid.some(t => t.type === 'STRUCTURE' && t.content?.includes('well'));
    if (hasWell) {
      set({ isDrought: false });
    }

    // STEP 2: DEPRECIATION (-10%)
    const hasBarn = get().grid.some(t => t.type === 'STRUCTURE' && t.content?.startsWith('barn'));
    const depreciationRate = hasBarn ? 0.98 : 0.9;
    const integrityAfterDepreciation = Math.max(0, (selectedEvent ? get().integrity : state.integrity) * depreciationRate);
    const buildingAfterDepreciation = state.buildingValue * depreciationRate;
    set({ integrity: integrityAfterDepreciation, buildingValue: buildingAfterDepreciation });

    // STEP 3: PROPERTY TAX (-$50/tile)
    const propertyTax = state.gridSize * state.gridSize * TAX_PER_TILE;
    const cashAfterTax = Math.max(0, get().cash - propertyTax);
    set({ cash: cashAfterTax, yearlyTaxLiability: propertyTax });

    // STEP 4: INTEREST (+8% gain on cash reserves)
    const interestGain = cashAfterTax * 0.08;
    const postInterestCash = cashAfterTax + interestGain;
    set({ cash: postInterestCash });

    // STEP 5: HARVEST WITH CROP CLEARING
    const cropBase: Record<string, number> = {
      paddyRice: CROP_DATA.paddyRice.earn,
      sugarcane: CROP_DATA.sugarcane.earn,
      dragonFruit: CROP_DATA.dragonFruit.earn,
      durian: CROP_DATA.durian.earn,
      // Legacy crops
      corn: 80,
      wheat: 120,
      coffee: 400,
      cotton: 250,
      peanuts: 180,
      poppies: 500
    };
    const livestockYield: Record<string, number> = {
      duck: ANIMAL_DATA.duck.earn,
      fish: ANIMAL_DATA.fish.earn,
      pig: ANIMAL_DATA.pig.earn,
      shrimp: ANIMAL_DATA.shrimp.earn,
      // Legacy animals
      chicken: 22,
      cow: 360,
      sheep: 200
    };

    let farmIncome = 0;
    const hasLivestock = get().grid.some(tile => tile.type === 'LIVESTOCK' && tile.livestockCount > 0);
    const yieldTools = get().tools;
    let toolYieldMultiplier = 1;
    if (yieldTools.handTools) toolYieldMultiplier *= 1.05;
    if (yieldTools.animalPlow && hasLivestock) toolYieldMultiplier *= 1.15;
    if (yieldTools.tractor) toolYieldMultiplier *= 1.4;
    if (yieldTools.harvester && yieldTools.tractorRenovated) toolYieldMultiplier *= 2;

    const tractorFuelCost = yieldTools.tractor ? 100 : 0;

    const droughtPenalty = get().isDrought ? (hasWell ? 1 : 0.6) : 1;
    const currentState = get();

    const clearedGrid: GridTile[] = currentState.grid.map((tile): GridTile => {
      if (tile.type === 'CROP' && tile.content) {
        const base = cropBase[tile.content] ?? CROP_BASE_VALUE;
        const marketFactor = (currentState.marketState as any)?.commodities?.[tile.content]?.priceMultiplier ?? currentState.sellPriceMultiplier;
        const specificMultiplier = currentState.specificCropMultipliers[tile.content] ?? 1;
        farmIncome += base * currentState.cropYieldMultiplier * toolYieldMultiplier * droughtPenalty * marketFactor * specificMultiplier;

        return {
          ...tile,
          type: 'EMPTY',
          content: null,
          cropValue: 0,
          livestockCount: 0
        };
      }

      if (tile.type === 'LIVESTOCK' && tile.content && tile.livestockCount > 0) {
        const yieldPerHead = livestockYield[tile.content] ?? 80;
        const specificMultiplier = currentState.specificCropMultipliers[tile.content] ?? 1;
        farmIncome += tile.livestockCount * yieldPerHead * currentState.livestockMultiplier * specificMultiplier;
      }

      return tile;
    });

    const finalCash = postInterestCash + farmIncome - tractorFuelCost;
    set({ cash: finalCash, grid: clearedGrid });
    
    // Reset specific crop multipliers after harvest
    set({ specificCropMultipliers: {} });

    // STEP 6: INTEGRITY BOOST (if profitable year)
    const currentCash = get().cash;
    const wasProfit = currentCash > openingCash;
    if (wasProfit) {
      const integrityBoost = Math.min(100, get().integrity + INTEGRITY_PROFIT_BOOST);
      set({ integrity: integrityBoost });
    }

    // STEP 7: ANNUAL INSURANCE RENEWAL
    const currentState2 = get();
    if (currentState2.insuranceType === 'annual') {
      // Deduct annual insurance fee
      set({ 
        cash: Math.max(0, currentState2.cash - 1000),
        hasCropInsurance: true 
      });
    }

    // STEP 8: UPDATE INVESTMENT PRICES (simulate market fluctuations)
    // Market prices are handled by MarketEngine.simulateRandomFluctuation()
    const balanceSheet = get().calculateBalanceSheet();
    set({ 
      balanceSheet, 
      showBalanceSheet: true, 
      year: nextYear,
      showEndTurnAnimation: false  // Hide animation after processing
    });

    const yearRecord: YearHistory = {
      year: state.year,
      balanceSheet,
      event: selectedEvent,
      revenue: farmIncome + interestGain,
      expenses: propertyTax + tractorFuelCost
    };

    set({ yearHistory: [...state.yearHistory, yearRecord] });
  },

  buyStock: (stockId: string, quantity: number) => {
    const state = get();
    const result = marketEngine.buyAsset(stockId, quantity, state.cash);
    
    if (result.success) {
      set({
        cash: state.cash - result.cost,
        stockHoldings: {
          ...state.stockHoldings,
          [stockId]: (state.stockHoldings[stockId] || 0) + quantity
        }
      });
    }
  },

  sellStock: (stockId: string, quantity: number) => {
    const state = get();
    const holdings = state.stockHoldings[stockId] || 0;
    const result = marketEngine.sellAsset(stockId, quantity, holdings);
    
    if (result.success) {
      set({
        cash: state.cash + result.revenue,
        stockHoldings: {
          ...state.stockHoldings,
          [stockId]: holdings - quantity
        }
      });
    }
  },

  expandGrid: () => {
    const state = get();
    const newSize = state.gridSize + 1;
    const expansionCost = Math.round(BASE_LAND_PRICE * Math.pow(1.5, newSize - 5));
    
    if (state.cash >= expansionCost) {
      const newGrid = [...state.grid];
      
      for (let x = 0; x < newSize; x++) {
        for (let z = 0; z < newSize; z++) {
          const exists = newGrid.some(tile => tile.x === x && tile.z === z);
          if (!exists) {
            newGrid.push({
              id: `tile-${x}-${z}`,
              x,
              z,
              type: 'EMPTY',
              content: null,
              health: 100,
              cropValue: 0,
              livestockCount: 0
            });
          }
        }
      }
      
      // Update yearly tax liability
      const newTaxLiability = newSize * newSize * TAX_PER_TILE;
      
      set({
        grid: newGrid,
        gridSize: newSize,
        cash: state.cash - expansionCost,
        yearlyTaxLiability: newTaxLiability
      });
    }
  },

  armCursor: (id: string | null, name: string | null, price: number, type: 'crop' | 'animal' | 'structure' | null) => {
    set({
      armedItem: id ? { id, name, price, type } : null
    });
  },

  placeArmedItem: (x: number, z: number) => {
    const state = get();
    
    if (!state.armedItem) return;
    
    const { id, price, type } = state.armedItem;
    
    // Check if can afford
    if (state.cash < price) {
      return;
    }
    
    // Check if tile is empty
    const tile = state.grid.find(t => t.x === x && t.z === z);
    if (!tile || tile.type !== 'EMPTY') {
      return;
    }
    
    // Determine tile type
    let tileType: 'CROP' | 'LIVESTOCK' | 'STRUCTURE' = 'EMPTY' as any;
    if (type === 'crop') tileType = 'CROP';
    else if (type === 'animal') tileType = 'LIVESTOCK';
    else if (type === 'structure') tileType = 'STRUCTURE';
    
    // Place item
    const newGrid = state.grid.map(t => {
      if (t.x === x && t.z === z) {
        return {
          ...t,
          type: tileType,
          content: id,
          health: 100,
          cropValue: type === 'crop' ? price * 2 : 0,
          livestockCount: type === 'animal' ? 1 : 0
        };
      }
      return t;
    });
    
    // Update building value if structure
    const newBuildingValue = type === 'structure' 
      ? state.buildingValue + price 
      : state.buildingValue;
    
    set({
      grid: newGrid,
      cash: state.cash - price,
      buildingValue: newBuildingValue,
      armedItem: null // Clear armed item after placement
    });
  },

  handleCorruptionChoice: (accept: boolean) => {
    const state = get();
    if (!state.currentEvent || state.currentEvent.type !== 'CORRUPTION') return;

    const effects = state.currentEvent.effects;
    
    if (accept) {
      set({
        cash: Math.max(0, state.cash - effects.payAmount),
        currentEvent: null
      });
    } else {
      set({
        integrity: Math.max(0, state.integrity + effects.refuseIntegrityLoss),
        currentEvent: null
      });
    }
  },

  calculateBalanceSheet: () => {
    const state = get();
    
    // ASSETS
    const stockValue = marketEngine.calculatePortfolioValue(state.stockHoldings);
    const landValue = state.gridSize * state.gridSize * BASE_LAND_PRICE;
    let livestockValue = 0;
    
    state.grid.forEach(tile => {
      if (tile.type === 'LIVESTOCK') {
        livestockValue += tile.livestockCount * LIVESTOCK_VALUE;
      }
    });
    
    const totalAssets = state.cash + stockValue + landValue + livestockValue + state.buildingValue;
    
    // LIABILITIES
    const totalLiabilities = state.loans + state.unpaidMaintenance + state.yearlyTaxLiability;
    
    // EQUITY
    const netWorth = totalAssets - totalLiabilities;
    
    return {
      assets: {
        cash: state.cash,
        stockValue,
        landValue,
        livestockValue,
        buildingValue: state.buildingValue,
        total: totalAssets
      },
      liabilities: {
        loans: state.loans,
        unpaidMaintenance: state.unpaidMaintenance,
        yearlyTaxLiability: state.yearlyTaxLiability,
        total: totalLiabilities
      },
      equity: {
        netWorth
      }
    };
  },

  closeBalanceSheet: () => {
    set({ showBalanceSheet: false, currentEvent: null });
  },

  setInteractionMode: (mode: 'PLANT' | 'SELL' | 'RENOVATE') => {
    set({ interactionMode: mode, armedItem: null });
  },

  liquidateAsset: (x: number, z: number) => {
    const state = get();
    const tileIndex = state.grid.findIndex(t => t.x === x && t.z === z);
    
    if (tileIndex === -1) return;
    
    const tile = state.grid[tileIndex];
    
    // Only allow liquidation if tile is occupied
    if (tile.type === 'EMPTY') return;
    
    let refund = 0;
    
    // Calculate 70% refund based on asset type
    if (tile.type === 'CROP') {
      if (tile.content === 'corn') refund = 50 * 0.7;
      if (tile.content === 'wheat') refund = 100 * 0.7;
      if (tile.content === 'coffee') refund = 300 * 0.7;
      if (tile.content === 'cotton') refund = 200 * 0.7;
    } else if (tile.type === 'LIVESTOCK') {
      if (tile.content === 'chicken') refund = tile.livestockCount * 20 * 0.7;
      if (tile.content === 'pig') refund = tile.livestockCount * 150 * 0.7;
      if (tile.content === 'cow') refund = tile.livestockCount * 500 * 0.7;
      if (tile.content === 'sheep') refund = tile.livestockCount * 250 * 0.7;
    } else if (tile.type === 'STRUCTURE') {
      if (tile.content === 'well') refund = 800 * 0.7;
      if (tile.content === 'fence') refund = 400 * 0.7;
      if (tile.content === 'silo') refund = 1200 * 0.7;
      
      // Update building value
      const buildingValueLoss = refund / 0.7;
      set({ buildingValue: Math.max(0, state.buildingValue - buildingValueLoss) });
      } else if (tile.type === 'STRUCTURE') {
        const hasRoadBoost = state.grid.some(t => t.type === 'STRUCTURE' && t.content === 'paved_road');
        const refundRate = hasRoadBoost ? 0.85 : 0.7;
        if (tile.content === 'well') refund = 800 * refundRate;
        if (tile.content === 'fence') refund = 400 * refundRate;
        if (tile.content === 'silo') refund = 1200 * refundRate;
        if (tile.content === 'barn') refund = 1000 * refundRate;
        if (tile.content === 'comm_tower') refund = 900 * refundRate;
        if (tile.content === 'paved_road') refund = 500 * refundRate;
      
        const buildingValueLoss = refund / refundRate;
        set({ buildingValue: Math.max(0, state.buildingValue - buildingValueLoss) });
      }
    
    // Clear the tile and add refund to cash
    const newGrid = [...state.grid];
    newGrid[tileIndex] = {
      ...tile,
      type: 'EMPTY',
      content: null,
      health: 100,
      cropValue: 0,
      livestockCount: 0
    };
    
    set({
      grid: newGrid,
      cash: state.cash + refund
    });
  },

  // v2.0: RENOVATE MECHANIC - Upgrade structures (e.g., Mud Shed → Brick Barn)
  renovateAsset: (x: number, z: number) => {
    const state = get();
    const tileIndex = state.grid.findIndex(t => t.x === x && t.z === z);
    if (tileIndex === -1) return;

    const tile = state.grid[tileIndex];
    if (tile.type !== 'STRUCTURE') return; // Only structures can be renovated

    let renovationCost = 0;
    let upgradedContent = tile.content;

    // Define renovation paths
    if (tile.content === 'well') {
      upgradedContent = 'well_upgraded'; // Deep Well (better irrigation)
      renovationCost = 400;
    } else if (tile.content === 'fence') {
      upgradedContent = 'fence_upgraded'; // Steel Fence (higher security)
      renovationCost = 200;
    } else if (tile.content === 'silo') {
      upgradedContent = 'silo_upgraded'; // Climate-Controlled Silo
      renovationCost = 600;
    } else {
      return; // Already upgraded or unknown structure
    }

    if (state.cash < renovationCost) return;

    const newGrid = [...state.grid];
    newGrid[tileIndex] = {
      ...tile,
      content: upgradedContent,
      health: 100 // Restore to full health
    };

    set({
      grid: newGrid,
      cash: state.cash - renovationCost,
      buildingValue: state.buildingValue + renovationCost
    });
  },

  openInspectionModal: (type, id, name, price) => {
    set({
      showInspectionModal: true,
      inspectedAsset: { type, id, name, price }
    });
  },

  closeInspectionModal: () => {
    set({
      showInspectionModal: false,
      inspectedAsset: null
    });
  },

  openTutorialModal: () => {
    set({ showTutorialModal: true });
  },

  closeTutorialModal: () => {
    set({ showTutorialModal: false });
  },

  openYearReportModal: () => {
    set({ showYearReportModal: true });
  },

  closeYearReportModal: () => {
    set({ showYearReportModal: false });
  },

  setTool: (tool, value) => {
    set(state => ({ tools: { ...state.tools, [tool]: value } }));
  },

  // Investment Methods
  buyGold: (amount: number) => {
    const state = get();
    const goldAsset = state.marketState.assets.gold;
    const currentPrice = goldAsset?.currentPrice || 1800;
    const cost = amount * currentPrice;
    
    if (state.cash >= cost) {
      set({
        cash: state.cash - cost,
        goldHoldings: state.goldHoldings + amount
      });
    }
  },

  sellGold: (amount: number) => {
    const state = get();
    const goldAsset = state.marketState.assets.gold;
    const currentPrice = goldAsset?.currentPrice || 1800;
    
    if (state.goldHoldings >= amount) {
      const revenue = amount * currentPrice;
      set({
        cash: state.cash + revenue,
        goldHoldings: state.goldHoldings - amount
      });
    }
  },

  buyDollar: (amount: number) => {
    const state = get();
    const usdAsset = state.marketState.assets.usd;
    const currentPrice = usdAsset?.currentPrice || 1.0;
    const cost = amount * currentPrice;
    
    if (state.cash >= cost) {
      set({
        cash: state.cash - cost,
        dollarHoldings: state.dollarHoldings + amount
      });
    }
  },

  sellDollar: (amount: number) => {
    const state = get();
    const usdAsset = state.marketState.assets.usd;
    const currentPrice = usdAsset?.currentPrice || 2500;

    if (state.dollarHoldings >= amount) {
      const revenue = amount * currentPrice;
      set({
        cash: state.cash + revenue,
        dollarHoldings: state.dollarHoldings - amount
      });
    }
  },

  buyStocks: (amount: number) => {
    const state = get();
    const stocksAsset = state.marketState.assets.stocks;
    const currentPrice = stocksAsset?.currentPrice || 5000;
    const cost = amount * currentPrice;
    
    if (state.cash >= cost) {
      set({
        cash: state.cash - cost,
        stocksHoldings: state.stocksHoldings + amount
      });
    }
  },

  sellStocks: (amount: number) => {
    const state = get();
    const stocksAsset = state.marketState.assets.stocks;
    const currentPrice = stocksAsset?.currentPrice || 5000;

    if (state.stocksHoldings >= amount) {
      const revenue = amount * currentPrice;
      set({
        cash: state.cash + revenue,
        stocksHoldings: state.stocksHoldings - amount
      });
    }
  },

  buyCropInsurance: (type: 'oneTime' | 'annual') => {
    const state = get();
    const cost = type === 'oneTime' ? 8000 : 1000;

    if (state.cash >= cost) {
      set({
        cash: state.cash - cost,
        hasCropInsurance: true,
        insuranceType: type
      });
    }
  },

  hasStructureUnlocked: (structureId: string) => {
    const state = get();
    return state.grid.some(tile => 
      tile.type === 'STRUCTURE' && tile.content === structureId
    );
  }
}));

// Export for easier access
export { CROP_DATA, ANIMAL_DATA, STRUCTURE_DATA };
