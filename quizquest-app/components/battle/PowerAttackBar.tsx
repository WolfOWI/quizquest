import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { UI_ICONS } from '@/lib/constants/uiIcons';
import {
  calculatePowerAttackDamageFromProgress,
  getTotalPowerAttackDurationMs,
  getPowerAttackTiers,
} from '@/services/questRun/powerAttackService';

interface PowerAttackBarProps {
  isActive: boolean;
  onDamageCalculated: (damage: number) => void;
  isCorrect: boolean;
  currentPhase: string;
}

const PowerAttackBar = ({
  isActive,
  onDamageCalculated,
  isCorrect,
  currentPhase,
}: PowerAttackBarProps) => {
  const progress = useSharedValue(1); // Start at 100%
  const startTimeRef = useRef<number | null>(null);
  const [currentDamage, setCurrentDamage] = useState(0);

  const totalDuration = getTotalPowerAttackDurationMs();
  const powerAttackTiers = getPowerAttackTiers();

  // Get discrete damage value based on current tier
  const getDamageValue = useCallback(
    (progressValue: number) => {
      return calculatePowerAttackDamageFromProgress(progressValue, totalDuration);
    },
    [totalDuration]
  );

  // Update damage display
  const updateDamage = useCallback(
    (progressValue: number) => {
      const damage = getDamageValue(progressValue);
      setCurrentDamage(damage);
    },
    [getDamageValue]
  );

  useEffect(() => {
    if (currentPhase === 'q-only') {
      // Reset
      setCurrentDamage(0);
      startTimeRef.current = null;

      // Animate bar back to full
      progress.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.quad),
      });
    } else if (isActive && !startTimeRef.current) {
      // Start animation
      startTimeRef.current = Date.now();
      progress.value = 1;

      progress.value = withTiming(
        0,
        {
          duration: totalDuration,
          easing: Easing.linear,
        },
        (finished) => {
          if (finished) {
            runOnJS(updateDamage)(0);
          }
        }
      );
    } else if (currentPhase === 'answered' && startTimeRef.current) {
      // Pause animation and calc damage
      progress.value = progress.value; // Freeze bar

      const endTime = Date.now();
      const timeInMs = endTime - startTimeRef.current;
      const finalDamage = getDamageValue(1 - timeInMs / totalDuration);

      if (isCorrect) {
        onDamageCalculated(finalDamage);
      } else {
        onDamageCalculated(0);
      }

      startTimeRef.current = null;
    }
  }, [
    currentPhase,
    isActive,
    progress,
    totalDuration,
    getDamageValue,
    updateDamage,
    isCorrect,
    onDamageCalculated,
  ]);

  // Animation: Progress Bar Width (Deplete & Freeze)
  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(progress.value, [0, 1], [0, 100]);

    if (currentPhase !== 'answered') {
      runOnJS(updateDamage)(progress.value);
    }

    return {
      width: `${width}%`,
    };
  });

  // Style: Bar Background
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    // When bar is at 0, use a faded grey (missed attack)
    const backgroundColor = progress.value === 0 ? '#374151' : '#111827';
    return {
      backgroundColor,
    };
  });

  // Style: Progress Bar
  const animatedFillStyle = useAnimatedStyle(() => {
    // Change bar colour based on unanswered / correct / wrong answer
    let backgroundColor = '#06b6d4';
    if (currentPhase === 'answered') {
      backgroundColor = isCorrect ? '#22c55e' : '#374151';
    }
    return {
      backgroundColor,
    };
  });

  const calcLineLeftPosPercent = (combinedMs: number) => {
    return 100 - (combinedMs / totalDuration) * 100;
  };

  // Power Attack Line Durations (Visual lines on bar) - exclude the last tier (pOne)
  const pLinesDurations = powerAttackTiers.slice(0, -1).map((tier) => tier.combinedMs);

  return (
    <View className="mb-2 flex-row items-center justify-center">
      <View className="w-14 flex-row items-center gap-2">
        <Image source={UI_ICONS.stats.damage} className="h-6 w-6" />
        <Text className="mb-1 font-kenney text-2xl text-white">{currentDamage}</Text>
      </View>

      <Animated.View
        className="relative h-6 flex-grow overflow-hidden rounded-full border-2 border-gray-900"
        style={animatedBackgroundStyle}>
        <Animated.View className="h-full" style={[animatedStyle, animatedFillStyle]} />

        {/* Power Attack Lines */}
        {pLinesDurations.map((durationMs, index) => (
          <View
            key={`pAttackLine-${index}`}
            className={`absolute top-0 h-full w-0.5 bg-gray-900 ${progress.value === 0 ? 'opacity-0' : 'opacity-60'}`}
            style={{ left: `${calcLineLeftPosPercent(durationMs)}%` }}
          />
        ))}
      </Animated.View>
    </View>
  );
};

export default PowerAttackBar;
