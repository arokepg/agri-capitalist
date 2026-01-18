# Agri-Capitalist 3D

A hardcore financial survival simulation disguised as a cheerful farming game. Built with Next.js 14, React Three Fiber, and Zustand.

## 🎮 Game Concept

Behind the vibrant voxel aesthetic and cheerful colors lies a brutal economic simulation inspired by "3rd World Farmer." Watch your cute farm struggle with droughts, corruption, war, and market crashes—all while maintaining a sunny disposition!

## ✨ Features

### Visual Design
- **Cheerful Voxel Aesthetic**: Crossy Road meets Hay Day
- **Light Mode UI**: Bright, modern FinTech-style interface
- **Vibrant Colors**: Lime greens, turquoise blues, sunny yellows
- **Animated Animals**: Cute hopping livestock with sine-wave bounce
- **Visual Feedback**: Grass turns brown during droughts, returns green after rain

### Core Mechanics
- **Turn-Based**: 1 Year = 1 Turn
- **5x5 Starting Grid**: Expand infinitely (Price = $1,000 × 1.5^n)
- **Property Tax**: Every tile costs $50/year in taxes
- **Farm Integrity**: Depreciates 5% per year; game over at 0%

### Financial Systems
- **Balance Sheet**: Formal Assets, Liabilities, and Equity tracking
- **Depreciation**: Buildings lose 10% value annually
- **Loan Interest**: 8% APR compounds yearly
- **Stock Market**: 4 correlated securities (AGI, H2O, SEED, GRWT)
- **Event-Driven Correlations**: Disasters affect stock prices

### Events
- **Disasters**: Droughts, Floods, Locusts, Livestock Disease
- **Corruption**: Pay bribes or lose integrity
- **War**: Border conflicts, farm occupations
- **Market**: Price crashes, fortunes
- **Weather**: Perfect harvests, rain

## 🚀 Getting Started

### Installation

```bash
cd agri-capitalist
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## 🎯 How to Play

1. **Plant Crops**: Click empty tiles ($500 each)
2. **Trade Stocks**: Use the sidebar to hedge against disasters
3. **End Year**: Triggers random events and financial calculations
4. **Survive**: Keep Integrity > 0 to avoid farm seizure

### Controls
- **Left Click**: Place crops on tiles
- **Right Click + Drag**: Rotate camera
- **Mouse Wheel**: Zoom in/out
- **Trading**: Buy/sell stocks in right sidebar

## 📊 Financial Mechanics

### The Turn Engine
Each "End Year" processes:
1. **Depreciation** (5% integrity, 10% buildings)
2. **Event Roll** (disasters, corruption, fortunes)
3. **Visual Feedback** (drought = brown tiles)
4. **Market Correlation** (event impacts stocks)
5. **Farm Income** (crops + livestock)
6. **Loan Interest** (8% APR compounds)
7. **Property Tax** ($50 per tile)
8. **Maintenance** (2% of land value)

### Stock Correlations
- **Drought** → Water Utility ↑, Grain Futures ↑
- **War** → Agri-Giant ↑, Grain Futures ↑
- **Flood** → Water Utility ↓
- **Good Harvest** → Grain Futures ↓

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **3D**: React Three Fiber + Three.js
- **State**: Zustand
- **Camera**: Orthographic (isometric view)
- **Language**: TypeScript

## 📁 Project Structure

```
agri-capitalist/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main game page
│   └── globals.css         # Cheerful color palette
├── components/
│   ├── GameCanvas.tsx      # 3D scene setup
│   ├── VoxelGrid.tsx       # Animated voxel tiles
│   ├── GameUI.tsx          # HUD overlay
│   ├── TradingSidebar.tsx  # FinTech stock interface
│   └── BalanceSheetModal.tsx # Financial statement
├── store/
│   └── GameStore.ts        # Zustand state management
├── engine/
│   └── MarketEngine.ts     # Event-driven stock market
└── data/
    └── EventList.json      # All game events
```

## 🎨 Color Palette

```css
--grass-green: #7FFF00      /* Vibrant lime green */
--water-turquoise: #40E0D0  /* Bright turquoise */
--wheat-yellow: #FFD700     /* Sunny yellow */
--dirt-tan: #D2B48C         /* Light sandy tan */
--sky-blue: #87CEEB         /* Clear sky blue */
```

## 🎓 Educational Value

This game teaches:
- **Accounting**: Balance sheets, assets, liabilities, equity
- **Depreciation**: Asset value decay over time
- **Interest**: Compound loan interest mechanics
- **Hedging**: Using correlated assets to offset risk
- **Economic Correlation**: Supply shocks affect markets
- **Resource Management**: Prioritization under scarcity

## 📝 License

MIT

## 🤝 Contributing

This is an educational demonstration project. Feel free to fork and extend!

---

**Warning**: Don't be fooled by the cheerful voxels and sunny colors. This game is brutally realistic about agricultural economics. Your first farm *will* be seized. 🌾💀
