// Minimalist 2D SVG Line-Art Icons for Assets
// All icons are high-contrast Slate-900 (#0f172a) line art
// NO EMOJIS - Pure geometric shapes only

interface IconProps {
  size?: number;
  color?: string;
}

// ========== CROPS ==========

export function PaddyRiceIcon({ size = 24, color = '#0f172a' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Single vertical grain stalk */}
      <path 
        d="M12 3 L12 21" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      {/* Rice grains along the stalk */}
      <ellipse cx="10" cy="6" rx="2" ry="1.5" fill={color} opacity="0.7" />
      <ellipse cx="14" cy="8" rx="2" ry="1.5" fill={color} opacity="0.7" />
      <ellipse cx="10" cy="10" rx="2" ry="1.5" fill={color} opacity="0.7" />
      <ellipse cx="14" cy="12" rx="2" ry="1.5" fill={color} opacity="0.7" />
      <ellipse cx="10" cy="14" rx="2" ry="1.5" fill={color} opacity="0.7" />
    </svg>
  );
}

export function SugarcaneIcon({ size = 24, color = '#0f172a' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Two intersecting vertical reed lines */}
      <path 
        d="M9 2 L9 22" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      <path 
        d="M15 2 L15 22" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      {/* Horizontal segments */}
      <line x1="7" y1="7" x2="17" y2="7" stroke={color} strokeWidth="1" />
      <line x1="7" y1="12" x2="17" y2="12" stroke={color} strokeWidth="1" />
      <line x1="7" y1="17" x2="17" y2="17" stroke={color} strokeWidth="1" />
    </svg>
  );
}

export function DragonFruitIcon({ size = 24, color = '#0f172a' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Geometric seed-speckled fruit cross-section */}
      <circle 
        cx="12" 
        cy="12" 
        r="9" 
        stroke={color} 
        strokeWidth="2" 
        fill="none"
      />
      {/* Seeds scattered inside */}
      <circle cx="10" cy="9" r="1" fill={color} />
      <circle cx="14" cy="9" r="1" fill={color} />
      <circle cx="9" cy="12" r="1" fill={color} />
      <circle cx="12" cy="12" r="1" fill={color} />
      <circle cx="15" cy="12" r="1" fill={color} />
      <circle cx="10" cy="15" r="1" fill={color} />
      <circle cx="14" cy="15" r="1" fill={color} />
      {/* Outer petals */}
      <path d="M12 3 L13 6 L12 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 7 L15 8 L12 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 12 L18 12 L15 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DurianIcon({ size = 24, color = '#0f172a' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Stylized circle with outward-pointing spikes */}
      <circle 
        cx="12" 
        cy="12" 
        r="7" 
        stroke={color} 
        strokeWidth="2" 
        fill="none"
      />
      {/* Spikes radiating outward */}
      <path d="M12 5 L12 1" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M17 7 L20 4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M19 12 L23 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M17 17 L20 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 19 L12 23" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M7 17 L4 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M5 12 L1 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M7 7 L4 4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ========== ANIMALS ==========

export function DuckIcon({ size = 24, color = '#0f172a' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Profile of a bird on water */}
      {/* Body */}
      <ellipse cx="14" cy="13" rx="6" ry="4" stroke={color} strokeWidth="2" fill="none" />
      {/* Head */}
      <circle cx="9" cy="10" r="3" stroke={color} strokeWidth="2" fill="none" />
      {/* Beak */}
      <path d="M6 10 L3 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Water line */}
      <path d="M2 17 Q7 16 12 17 T22 17" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function FishIcon({ size = 24, color = '#0f172a' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Sleek, curved fish outline */}
      <path 
        d="M20 12 C20 12 18 8 14 8 C10 8 6 10 4 12 C6 14 10 16 14 16 C18 16 20 12 20 12 Z" 
        stroke={color} 
        strokeWidth="2" 
        fill="none"
      />
      {/* Tail */}
      <path d="M4 12 L2 9 M4 12 L2 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="15" cy="11" r="1.5" fill={color} />
      {/* Fins */}
      <path d="M11 10 L10 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 14 L8 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PigIcon({ size = 24, color = '#0f172a' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Minimalist head-on snout and ears */}
      {/* Head */}
      <circle cx="12" cy="13" r="7" stroke={color} strokeWidth="2" fill="none" />
      {/* Snout */}
      <ellipse cx="12" cy="15" rx="3" ry="2" stroke={color} strokeWidth="2" fill="none" />
      {/* Nostrils */}
      <circle cx="10.5" cy="15" r="0.8" fill={color} />
      <circle cx="13.5" cy="15" r="0.8" fill={color} />
      {/* Ears */}
      <path d="M6 9 L6 6 L8 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M18 9 L18 6 L16 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Eyes */}
      <circle cx="9" cy="11" r="1" fill={color} />
      <circle cx="15" cy="11" r="1" fill={color} />
    </svg>
  );
}

export function ShrimpIcon({ size = 24, color = '#0f172a' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Simplified curved shrimp body segments */}
      <path 
        d="M20 12 Q18 10 16 10 Q14 10 12 11 Q10 12 8 13 Q6 14 4 14" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        fill="none"
      />
      {/* Segments */}
      <line x1="16" y1="10" x2="16" y2="13" stroke={color} strokeWidth="1.5" />
      <line x1="12" y1="11" x2="12" y2="14" stroke={color} strokeWidth="1.5" />
      <line x1="8" y1="13" x2="8" y2="16" stroke={color} strokeWidth="1.5" />
      {/* Antennae */}
      <path d="M20 12 L22 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 12 L22 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Legs */}
      <path d="M16 13 L17 16" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M12 14 L13 17" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M8 16 L9 19" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

// ========== STRUCTURES ==========

export function PondIcon({ size = 24, color = '#0f172a' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Concentric rounded squares */}
      <rect 
        x="4" 
        y="4" 
        width="16" 
        height="16" 
        rx="2" 
        stroke={color} 
        strokeWidth="2" 
        fill="none"
      />
      <rect 
        x="7" 
        y="7" 
        width="10" 
        height="10" 
        rx="1.5" 
        stroke={color} 
        strokeWidth="1.5" 
        fill="none"
      />
      <rect 
        x="10" 
        y="10" 
        width="4" 
        height="4" 
        rx="1" 
        stroke={color} 
        strokeWidth="1" 
        fill="none"
      />
    </svg>
  );
}

export function BarnIcon({ size = 24, color = '#0f172a' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Geometric barn-door silhouette */}
      {/* Roof */}
      <path d="M3 10 L12 3 L21 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Walls */}
      <path d="M5 10 L5 21 L19 21 L19 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Door */}
      <rect x="9" y="13" width="6" height="8" stroke={color} strokeWidth="2" fill="none" />
      <line x1="12" y1="13" x2="12" y2="21" stroke={color} strokeWidth="2" />
      {/* Window */}
      <circle cx="12" cy="8" r="1.5" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function WellIcon({ size = 24, color = '#0f172a' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Circle with a centered vertical line */}
      <circle cx="12" cy="14" r="7" stroke={color} strokeWidth="2" fill="none" />
      <line x1="12" y1="7" x2="12" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Roof structure */}
      <path d="M7 7 L12 3 L17 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Crank handle */}
      <circle cx="15" cy="10" r="1.5" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="12" y1="10" x2="15" y2="10" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export function WaterAeratorIcon({ size = 24, color = '#0f172a' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Three-blade turbine icon */}
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" fill="none" />
      {/* Blade 1 - top */}
      <path 
        d="M12 9 L12 3 L13 3 L13 9" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      {/* Blade 2 - bottom left */}
      <path 
        d="M10.5 13.5 L6 18 L6.5 18.5 L11 14" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      {/* Blade 3 - bottom right */}
      <path 
        d="M13.5 13.5 L18 18 L17.5 18.5 L13 14" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      {/* Center hub */}
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  );
}
