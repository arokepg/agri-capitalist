'use client';

import React from 'react';
import MonthFlipCalendar from './MonthFlipCalendar';

interface EndTurnAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

export default function EndTurnAnimation({ isVisible, onComplete }: EndTurnAnimationProps) {
  return <MonthFlipCalendar isActive={isVisible} onComplete={onComplete} />;
}
