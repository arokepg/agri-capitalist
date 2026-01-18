// MarketEngine.ts - Gold & USD Investment System

export interface Asset {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  basePrice: number;
  volatility: number;
  history: number[];
  description: string;
  type: 'commodity' | 'currency';
}

export interface MarketState {
  assets: Record<string, Asset>;
  lastUpdate: number;
}

export interface EventImpact {
  [assetId: string]: number; // Multiplier for asset price
}

export class MarketEngine {
  private assets: Record<string, Asset> = {
    gold: {
      id: 'gold',
      name: 'Gold',
      symbol: 'XAU',
      currentPrice: 8000,  // v6.0: 8000k
      basePrice: 8000,
      volatility: 0.03, // Low volatility, safe haven
      history: [8000],
      description: 'Precious metal commodity - stable long-term value retention',
      type: 'commodity'
    },
    usd: {
      id: 'usd',
      name: 'US Dollar',
      symbol: 'USD',
      currentPrice: 2500,  // v6.0: 2500k
      basePrice: 2500,
      volatility: 0.06, // Moderate volatility, exchange rate fluctuations
      history: [2500],
      description: 'United States Dollar - moderate volatility reflecting global exchange trends',
      type: 'currency'
    }
  };

  constructor() {
    this.initializeMarket();
  }

  private initializeMarket(): void {
    Object.keys(this.assets).forEach(key => {
      this.assets[key].history = [this.assets[key].basePrice];
    });
  }

  /**
   * Apply event-driven correlations
   * Example: Disaster → Gold UP (safe haven), USD fluctuates
   */
  applyEventImpacts(impacts: EventImpact): void {
    Object.entries(impacts).forEach(([assetId, multiplier]) => {
      if (this.assets[assetId]) {
        const asset = this.assets[assetId];
        const newPrice = asset.currentPrice * multiplier;
        
        // Apply multiplier with bounds
        asset.currentPrice = Math.max(0.1, Math.min(10000, Math.round(newPrice * 100) / 100));
        asset.history.push(asset.currentPrice);
        
        // Keep last 10 turns of history for mini-charts
        if (asset.history.length > 10) {
          asset.history.shift();
        }
      }
    });
  }

  /**
   * Add natural market volatility (random walk)
   */
  simulateRandomFluctuation(): void {
    Object.keys(this.assets).forEach(assetId => {
      const asset = this.assets[assetId];
      
      // Gold: Safe haven - low volatility with upward bias during uncertainty
      if (asset.id === 'gold') {
        const randomChange = 1 + (Math.random() - 0.45) * 2 * asset.volatility; // Slight upward bias
        let newPrice = asset.currentPrice * randomChange;
        
        // Mean reversion toward base price
        const meanReversionStrength = 0.02;
        const meanReversionAdjustment = (asset.basePrice - newPrice) * meanReversionStrength;
        newPrice += meanReversionAdjustment;
        
        asset.currentPrice = Math.max(5000, Math.min(12000, Math.round(newPrice)));
      } 
      // USD: Currency - moderate volatility with mean reversion
      else if (asset.id === 'usd') {
        const randomChange = 1 + (Math.random() - 0.5) * 2 * asset.volatility;
        let newPrice = asset.currentPrice * randomChange;
        
        // Strong mean reversion for currency
        const meanReversionStrength = 0.05;
        const meanReversionAdjustment = (asset.basePrice - newPrice) * meanReversionStrength;
        newPrice += meanReversionAdjustment;
        
        asset.currentPrice = Math.max(1800, Math.min(4000, Math.round(newPrice)));
      }
      // Stocks: High volatility with trending behavior
      else if (asset.id === 'stocks') {
        const randomChange = 1 + (Math.random() - 0.5) * 2 * asset.volatility;
        let newPrice = asset.currentPrice * randomChange;
        
        // Weaker mean reversion - allows trends
        const meanReversionStrength = 0.01;
        const meanReversionAdjustment = (asset.basePrice - newPrice) * meanReversionStrength;
        newPrice += meanReversionAdjustment;
        
        asset.currentPrice = Math.max(1000, Math.min(15000, Math.round(newPrice)));
      }
      
      asset.history.push(asset.currentPrice);
      
      if (asset.history.length > 10) {
        asset.history.shift();
      }
    });
  }

  /**
   * Get current market snapshot
   */
  getMarketState(): MarketState {
    return {
      assets: { ...this.assets },
      lastUpdate: Date.now()
    };
  }

  /**
   * Calculate portfolio value
   */
  calculatePortfolioValue(holdings: Record<string, number>): number {
    let totalValue = 0;
    Object.entries(holdings).forEach(([assetId, quantity]) => {
      if (this.assets[assetId]) {
        totalValue += this.assets[assetId].currentPrice * quantity;
      }
    });
    return Math.round(totalValue * 100) / 100;
  }

  /**
   * Buy asset transaction
   */
  buyAsset(assetId: string, quantity: number, playerCash: number): {
    success: boolean;
    cost: number;
    message: string;
  } {
    if (!this.assets[assetId]) {
      return { success: false, cost: 0, message: 'Asset not found' };
    }

    const asset = this.assets[assetId];
    const cost = asset.currentPrice * quantity;

    if (cost > playerCash) {
      return {
        success: false,
        cost,
        message: `Insufficient funds. Need $${cost.toFixed(2)}`
      };
    }

    return {
      success: true,
      cost,
      message: `Bought ${quantity} ${asset.symbol} @ $${asset.currentPrice.toFixed(asset.id === 'usd' ? 3 : 2)}`
    };
  }

  /**
   * Sell asset transaction
   */
  sellAsset(assetId: string, quantity: number, playerHoldings: number): {
    success: boolean;
    revenue: number;
    message: string;
  } {
    if (!this.assets[assetId]) {
      return { success: false, revenue: 0, message: 'Asset not found' };
    }

    if (quantity > playerHoldings) {
      return {
        success: false,
        revenue: 0,
        message: `You only own ${playerHoldings} units`
      };
    }

    const asset = this.assets[assetId];
    const revenue = asset.currentPrice * quantity;

    return {
      success: true,
      revenue,
      message: `Sold ${quantity} ${asset.symbol} @ $${asset.currentPrice.toFixed(asset.id === 'usd' ? 3 : 2)}`
    };
  }

  /**
   * Reset market to base state
   */
  resetMarket(): void {
    Object.keys(this.assets).forEach(key => {
      const asset = this.assets[key];
      asset.currentPrice = asset.basePrice;
      asset.history = [asset.basePrice];
    });
  }

  /**
   * Get asset price change percentage
   */
  getPriceChange(assetId: string): number {
    const asset = this.assets[assetId];
    if (!asset || asset.history.length < 2) return 0;
    
    const current = asset.currentPrice;
    const previous = asset.history[asset.history.length - 2];
    return ((current - previous) / previous) * 100;
  }

  /**
   * Apply disaster event - Gold goes up as safe haven
   */
  applyDisasterEvent(): void {
    if (this.assets.gold) {
      this.assets.gold.currentPrice *= 1.1; // 10% increase
      this.assets.gold.history.push(this.assets.gold.currentPrice);
      if (this.assets.gold.history.length > 10) this.assets.gold.history.shift();
    }
  }
}

export const marketEngine = new MarketEngine();
