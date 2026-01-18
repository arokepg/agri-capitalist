'use client';

// FinancialIconSet.tsx - Custom SVG icons (NO EMOJIS)
// Clean, minimalist line-art matching the Voxel aesthetic

import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

// CROPS
export const CornIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3L10 8L8 10L6 12L8 14L10 16L12 21L14 16L16 14L18 12L16 10L14 8L12 3Z" stroke={color} strokeWidth="2" strokeLinejoin="bevel"/>
    <circle cx="10" cy="10" r="1" fill={color}/>
    <circle cx="14" cy="10" r="1" fill={color}/>
    <circle cx="10" cy="14" r="1" fill={color}/>
    <circle cx="14" cy="14" r="1" fill={color}/>
  </svg>
);

export const WheatIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3V21M8 7H16M9 11H15M8 15H16" stroke={color} strokeWidth="2" strokeLinecap="square"/>
    <rect x="10" y="5" width="4" height="2" fill={color}/>
    <rect x="11" y="9" width="2" height="2" fill={color}/>
    <rect x="10" y="13" width="4" height="2" fill={color}/>
  </svg>
);

export const CoffeeIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="8" y="8" width="8" height="10" stroke={color} strokeWidth="2"/>
    <path d="M16 10H18C19 10 20 11 20 12C20 13 19 14 18 14H16" stroke={color} strokeWidth="2"/>
    <path d="M8 18H16" stroke={color} strokeWidth="2.5" strokeLinecap="square"/>
    <circle cx="10" cy="5" r="1" fill={color}/>
    <circle cx="12" cy="5" r="1" fill={color}/>
    <circle cx="14" cy="5" r="1" fill={color}/>
  </svg>
);

export const CottonIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="3" stroke={color} strokeWidth="2"/>
    <circle cx="9" cy="11" r="2" stroke={color} strokeWidth="1.5"/>
    <circle cx="15" cy="11" r="2" stroke={color} strokeWidth="1.5"/>
    <path d="M12 11V20" stroke={color} strokeWidth="2"/>
    <path d="M10 20H14" stroke={color} strokeWidth="2" strokeLinecap="square"/>
  </svg>
);

// ANIMALS
export const ChickenIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="9" y="10" width="6" height="6" stroke={color} strokeWidth="2"/>
    <rect x="11" y="7" width="2" height="3" fill={color}/>
    <path d="M8 10L7 9L8 8" stroke={color} strokeWidth="1.5"/>
    <rect x="9" y="16" width="2" height="3" stroke={color} strokeWidth="1.5"/>
    <rect x="13" y="16" width="2" height="3" stroke={color} strokeWidth="1.5"/>
  </svg>
);

export const PigIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="7" y="9" width="10" height="7" rx="1" stroke={color} strokeWidth="2"/>
    <rect x="11" y="6" width="4" height="3" fill={color}/>
    <circle cx="10" cy="11" r="1" fill={color}/>
    <circle cx="14" cy="11" r="1" fill={color}/>
    <rect x="8" y="16" width="2" height="3" stroke={color} strokeWidth="1.5"/>
    <rect x="14" y="16" width="2" height="3" stroke={color} strokeWidth="1.5"/>
    <path d="M17 11H19" stroke={color} strokeWidth="2" strokeLinecap="square"/>
  </svg>
);

export const CowIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="6" y="9" width="12" height="8" stroke={color} strokeWidth="2"/>
    <rect x="9" y="6" width="2" height="3" fill={color}/>
    <rect x="13" y="6" width="2" height="3" fill={color}/>
    <rect x="7" y="17" width="2" height="3" stroke={color} strokeWidth="1.5"/>
    <rect x="11" y="17" width="2" height="3" stroke={color} strokeWidth="1.5"/>
    <rect x="15" y="17" width="2" height="3" stroke={color} strokeWidth="1.5"/>
    <rect x="10" y="11" width="4" height="2" fill={color}/>
  </svg>
);

export const SheepIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="10" r="5" stroke={color} strokeWidth="2"/>
    <rect x="10" y="6" width="4" height="3" fill={color}/>
    <rect x="8" y="15" width="2" height="4" stroke={color} strokeWidth="1.5"/>
    <rect x="14" y="15" width="2" height="4" stroke={color} strokeWidth="1.5"/>
    <circle cx="10" cy="10" r="0.5" fill={color}/>
    <circle cx="14" cy="10" r="0.5" fill={color}/>
  </svg>
);

// STOCKS & FINANCE
export const StockUpIcon: React.FC<IconProps> = ({ size = 24, color = '#22c55e', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 5L16 10H13V19H11V10H8L12 5Z" fill={color}/>
    <rect x="7" y="19" width="10" height="2" fill={color}/>
  </svg>
);

export const StockDownIcon: React.FC<IconProps> = ({ size = 24, color = '#ef4444', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 19L16 14H13V5H11V14H8L12 19Z" fill={color}/>
    <rect x="7" y="3" width="10" height="2" fill={color}/>
  </svg>
);

export const StockStableIcon: React.FC<IconProps> = ({ size = 24, color = '#64748b', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="6" y="11" width="12" height="2" fill={color}/>
    <rect x="6" y="9" width="2" height="6" fill={color}/>
    <rect x="16" y="9" width="2" height="6" fill={color}/>
  </svg>
);

export const ChartIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 20L8 14L12 16L16 10L20 12" stroke={color} strokeWidth="2" strokeLinejoin="bevel"/>
    <rect x="3" y="3" width="18" height="18" stroke={color} strokeWidth="1.5" fill="none"/>
  </svg>
);

export const CoinIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2"/>
    <path d="M12 8V16M10 10H14M10 14H14" stroke={color} strokeWidth="2" strokeLinecap="square"/>
  </svg>
);

export const LandIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="8" width="6" height="6" stroke={color} strokeWidth="2"/>
    <rect x="10" y="8" width="6" height="6" stroke={color} strokeWidth="2"/>
    <rect x="16" y="8" width="4" height="6" stroke={color} strokeWidth="2"/>
    <rect x="4" y="14" width="6" height="6" stroke={color} strokeWidth="2"/>
    <rect x="10" y="14" width="6" height="6" stroke={color} strokeWidth="2"/>
  </svg>
);

export const IntegrityIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3L5 7V12C5 16 8 19 12 21C16 19 19 16 19 12V7L12 3Z" stroke={color} strokeWidth="2" strokeLinejoin="bevel"/>
    <path d="M9 12L11 14L15 10" stroke={color} strokeWidth="2" strokeLinecap="square"/>
  </svg>
);

export const WarningIcon: React.FC<IconProps> = ({ size = 24, color = '#ef4444', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3L3 20H21L12 3Z" stroke={color} strokeWidth="2" strokeLinejoin="bevel"/>
    <rect x="11" y="9" width="2" height="5" fill={color}/>
    <rect x="11" y="16" width="2" height="2" fill={color}/>
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="5" width="16" height="16" stroke={color} strokeWidth="2"/>
    <path d="M4 9H20" stroke={color} strokeWidth="2"/>
    <rect x="8" y="3" width="2" height="4" fill={color}/>
    <rect x="14" y="3" width="2" height="4" fill={color}/>
    <rect x="8" y="12" width="2" height="2" fill={color}/>
    <rect x="12" y="12" width="2" height="2" fill={color}/>
    <rect x="16" y="12" width="2" height="2" fill={color}/>
  </svg>
);

export const ExpandIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 8L12 4L20 8L12 12L4 8Z" stroke={color} strokeWidth="2" strokeLinejoin="bevel"/>
    <path d="M4 12L12 16L20 12" stroke={color} strokeWidth="2" strokeLinejoin="bevel"/>
    <path d="M4 16L12 20L20 16" stroke={color} strokeWidth="2" strokeLinejoin="bevel"/>
  </svg>
);

// STRUCTURES
export const WellIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="6" y="12" width="12" height="8" stroke={color} strokeWidth="2"/>
    <rect x="10" y="8" width="4" height="4" fill={color}/>
    <path d="M8 6L12 4L16 6" stroke={color} strokeWidth="2" strokeLinejoin="bevel"/>
    <circle cx="12" cy="16" r="2" stroke={color} strokeWidth="1.5"/>
    <path d="M12 14V18" stroke={color} strokeWidth="1.5"/>
  </svg>
);

export const FenceIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="5" y="8" width="2" height="12" fill={color}/>
    <rect x="11" y="8" width="2" height="12" fill={color}/>
    <rect x="17" y="8" width="2" height="12" fill={color}/>
    <rect x="4" y="10" width="16" height="2" fill={color}/>
    <rect x="4" y="15" width="16" height="2" fill={color}/>
    <path d="M6 8L6 5L6 8Z" stroke={color} strokeWidth="2"/>
    <path d="M12 8L12 5L12 8Z" stroke={color} strokeWidth="2"/>
    <path d="M18 8L18 5L18 8Z" stroke={color} strokeWidth="2"/>
  </svg>
);

export const SiloIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="8" y="8" width="8" height="12" stroke={color} strokeWidth="2"/>
    <path d="M8 8C8 6 10 4 12 4C14 4 16 6 16 8" stroke={color} strokeWidth="2"/>
    <rect x="10" y="14" width="4" height="4" stroke={color} strokeWidth="1.5"/>
    <path d="M8 10H16M8 13H16M8 16H16" stroke={color} strokeWidth="1"/>
  </svg>
);

export const ClinicIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="5" y="7" width="14" height="13" stroke={color} strokeWidth="2"/>
    <path d="M12 4L8 7H16L12 4Z" fill={color}/>
    <path d="M12 10V16M9 13H15" stroke={color} strokeWidth="2.5" strokeLinecap="square"/>
    <rect x="10" y="17" width="4" height="3" fill={color}/>
  </svg>
);

// Utility function to get icon by name
export const getIconByName = (name: string, props: IconProps = {}) => {
  const icons: Record<string, React.FC<IconProps>> = {
    corn: CornIcon,
    wheat: WheatIcon,
    coffee: CoffeeIcon,
    cotton: CottonIcon,
    chicken: ChickenIcon,
    pig: PigIcon,
    cow: CowIcon,
    sheep: SheepIcon,
    well: WellIcon,
    fence: FenceIcon,
    silo: SiloIcon,
    clinic: ClinicIcon,
    stockUp: StockUpIcon,
    stockDown: StockDownIcon,
    stockStable: StockStableIcon,
    chart: ChartIcon,
    coin: CoinIcon,
    land: LandIcon,
    integrity: IntegrityIcon,
    warning: WarningIcon,
    calendar: CalendarIcon,
    expand: ExpandIcon
  };

  const Icon = icons[name];
  return Icon ? <Icon {...props} /> : null;
};
