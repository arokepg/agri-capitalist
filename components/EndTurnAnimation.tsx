'use client';

import React from 'react';
import FourSeasonCycle from './FourSeasonCycle';

interface EndTurnAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

export default function EndTurnAnimation({ isVisible, onComplete }: EndTurnAnimationProps) {
  return <FourSeasonCycle isActive={isVisible} onComplete={onComplete} />;
}
