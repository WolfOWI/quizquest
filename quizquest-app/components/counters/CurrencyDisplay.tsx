import { View, Text, Image } from 'react-native';
import React from 'react';
import { UI_ICONS } from '@/lib/constants/uiIcons';

const CurrencyDisplay = ({
  gemCount = 0,
  goldCount = 0,
}: {
  gemCount: number;
  goldCount: number;
}) => {
  return (
    <View className="flex-row gap-2">
      <View className="w-28 flex-row items-center gap-1 rounded-full bg-black/40">
        <Image source={UI_ICONS.currency.gem} className="h-8 w-8" />
        <Text className="font-kenney text-base text-white">{gemCount}</Text>
      </View>
      <View className="w-28 flex-row items-center gap-1 rounded-full bg-black/40">
        <Image source={UI_ICONS.currency.gold} className="h-8 w-8" />
        <Text className="font-kenney text-base text-white">{goldCount}</Text>
      </View>
    </View>
  );
};

export default CurrencyDisplay;
