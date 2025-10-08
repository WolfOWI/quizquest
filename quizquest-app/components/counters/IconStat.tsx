import { View, Text, Image } from 'react-native';
import React from 'react';
import { UI_ICONS } from '@/lib/constants/uiIcons';
import { shortenNumber } from '@/lib/utils/numberUtils';

interface IconNumCountProps {
  uiIcon?: any;
  numStat?: number;
  strStat?: string;
  label: string;
  className?: string;
}

const IconStat: React.FC<IconNumCountProps> = ({ uiIcon, numStat, strStat, label, className }) => {
  return (
    <View className={`flex-col items-center gap-1 ${className}`}>
      <View className="flex-row items-center gap-1">
        {uiIcon && <Image source={uiIcon} className="h-6 w-6" />}
        {/* numStat can be 0 */}
        {numStat !== undefined && numStat !== null && (
          <Text className="font-kenney text-lg text-white">{shortenNumber(numStat, 0)}</Text>
        )}
        {strStat && <Text className="font-kenney text-lg text-white">{strStat}</Text>}
      </View>
      <Text className="font-pixelify text-sm text-white/70">{label}</Text>
    </View>
  );
};

export default IconStat;
