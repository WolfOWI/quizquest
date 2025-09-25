import { addLeadingZero } from '@/lib/utils/textUtils';
import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import { UI_ICONS } from '@/lib/constants/uiIcons';

interface BattleArenaCounterProps {
  leftHealth: number;
  rightHealth: number;
  currentQuestion: number;
  totalQuestions: number;
  className?: string;
}

const BattleArenaCounter: React.FC<BattleArenaCounterProps> = ({
  leftHealth,
  rightHealth,
  currentQuestion,
  totalQuestions,
  className = '',
}) => {
  const healthIcon = UI_ICONS.health.default;

  return (
    <View className={`flex-row items-center px-4 ${className}`}>
      {/* Left Health */}
      <View className="flex-1 flex-row items-center gap-2">
        <Image source={healthIcon} className="h-8 w-8" />
        <Text className="font-kenney text-2xl text-white">{leftHealth}</Text>
      </View>

      {/* Question Counter */}
      <View className="flex-shrink-0 rounded-full border border-white/20 bg-black/70 px-3 py-1">
        <Text className="font-pixelify text-base text-white">
          {addLeadingZero(currentQuestion)} / {addLeadingZero(totalQuestions)}
        </Text>
      </View>

      {/* Right Health */}
      <View className="flex-1 flex-row items-center justify-end gap-2">
        <Text className="font-kenney text-2xl text-white">{rightHealth}</Text>
        <Image source={healthIcon} className="h-8 w-8" />
      </View>
    </View>
  );
};

export default BattleArenaCounter;
