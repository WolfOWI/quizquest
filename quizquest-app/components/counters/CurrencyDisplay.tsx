import { View, Text, Image } from 'react-native';
import React from 'react';

const CurrencyDisplay = ({ gemCount = 0, goldCount = 0 }: { gemCount: number; goldCount: number }) => {
  return (
    <View className="flex-row gap-2">
      <View className="w-28 flex-row items-center gap-1 rounded-full bg-[#32231C]">
        <Image source={require('@/assets/icons/currency/gem.png')} className="h-8 w-8" />
        <Text className="font-kenney text-base text-white">{gemCount}</Text>
      </View>
      <View className="w-28 flex-row items-center gap-1 rounded-full bg-[#32231C]">
        <Image source={require('@/assets/icons/currency/gold.png')} className="h-8 w-8" />
        <Text className="font-kenney text-base text-white">{goldCount}</Text>
      </View>
    </View>
  );
};

export default CurrencyDisplay;
