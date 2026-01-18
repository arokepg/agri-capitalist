// v3.1 Minimalist Line-Art SVG Icons
// NO EMOJIS - Pure SVG implementation

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// Game Mode Icons
export const PlantIcon = ({ size = 20, color = '#22c55e', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22v-8m0 0c-2.5 0-4.5-2-4.5-4.5S9.5 5 12 5c2.5 0 4.5 2 4.5 4.5S14.5 14 12 14z" />
    <path d="M12 14c0-2.5-2-4.5-4.5-4.5M12 14c0-2.5 2-4.5 4.5-4.5" />
  </svg>
);

export const RenovateIcon = ({ size = 20, color = '#3b82f6', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

export const SellIcon = ({ size = 20, color = '#ef4444', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8m-4-4l4 4-4 4" />
  </svg>
);

// UI Control Icons
export const GamepadIcon = ({ size = 20, color = '#7c3aed', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 11V5h12v6M6 11v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8M6 11h12" />
    <circle cx="9" cy="16" r="1" fill={color} />
    <circle cx="15" cy="14" r="1" fill={color} />
  </svg>
);

export const ChartBarIcon = ({ size = 20, color = '#2563eb', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M7 12v6M12 8v10M17 5v13" />
  </svg>
);

export const BookOpenIcon = ({ size = 20, color = '#64748b', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

// Asset Category Icons
export const CropIcon = ({ size = 20, color = '#eab308', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 20h10M12 20V8m0 0c-2.5 0-4-2-4-4s1.5-2 4-2 4 0 4 2-1.5 4-4 4z" />
    <path d="M8 8c0-2-1-3-2-3s-2 1-2 3 1 3 2 3M16 8c0-2 1-3 2-3s2 1 2 3-1 3-2 3" />
  </svg>
);

export const LivestockIcon = ({ size = 20, color = '#8b5cf6', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M8 15v4M16 15v4M5 19h14" />
    <path d="M8 5c-1 0-2 1-2 2v4c0 1 1 2 2 2h8c1 0 2-1 2-2V7c0-1-1-2-2-2" />
    <circle cx="9" cy="9" r="1" fill={color} />
    <circle cx="15" cy="9" r="1" fill={color} />
  </svg>
);

export const InfrastructureIcon = ({ size = 20, color = '#3b82f6', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M5 21V7l7-4 7 4v14" />
    <path d="M9 9h2M13 9h2M9 13h2M13 13h2M9 17h6" />
  </svg>
);

// Event Icons
export const AlertIcon = ({ size = 20, color = '#f59e0b', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <circle cx="12" cy="17" r="0.5" fill={color} />
  </svg>
);

export const TrendingUpIcon = ({ size = 20, color = '#22c55e', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export const TrendingDownIcon = ({ size = 20, color = '#ef4444', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);

// UI Action Icons
export const InfoIcon = ({ size = 20, color = '#64748b', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <circle cx="12" cy="8" r="0.5" fill={color} />
  </svg>
);

export const CheckIcon = ({ size = 20, color = '#22c55e', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const XIcon = ({ size = 20, color = '#64748b', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const ZoomInIcon = ({ size = 20, color = '#64748b', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
  </svg>
);

export const LayersIcon = ({ size = 20, color = '#3b82f6', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

// Empty State Icons
export const InboxIcon = ({ size = 48, color = '#94a3b8', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

export const FileTextIcon = ({ size = 48, color = '#94a3b8', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

export const LightbulbIcon = ({ size = 20, color = '#f59e0b', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6M10 22h4M15 8.5a3.5 3.5 0 0 0-7 0c0 2 1 3 2 4.5V15a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2c1-1.5 2-2.5 2-4.5z" />
    <path d="M12 2v1" />
  </svg>
);
