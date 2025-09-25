import React, { useState } from 'react';
import { View, Text } from 'react-native';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import { ChipTabs, ChipTabInterface } from '@/components/navigation/ChipTabs';
import CurrencyDisplay from '@/components/counters/CurrencyDisplay';
import { useAppStore } from '@/lib/state/appStore';
import Heading from '@/components/typography/Heading';

const StoreScreen = () => {
  const { userDoc } = useAppStore();
  const backgroundTexture = require('@/assets/textures/leather_purple.png');

  const [activeTab, setActiveTab] = useState('stories');

  const storeTabs: ChipTabInterface[] = [
    { id: 'stories', label: 'Stories' },
    { id: 'items', label: 'Items' },
    { id: 'characters', label: 'Characters' },
    { id: 'currency', label: 'Currency' },
    { id: 'pets', label: 'Pets' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stories':
        return <Text className="text-center text-gray-400">Stories Store</Text>;
      case 'items':
        return <Text className="text-center text-gray-400">Items Store</Text>;
      case 'characters':
        return <Text className="text-center text-gray-400">Characters Store</Text>;
      case 'currency':
        return <Text className="text-center text-gray-400">Currency Store</Text>;
      case 'pets':
        return <Text className="text-center text-gray-400">Pets Store</Text>;
      default:
        return <Text className="text-center text-gray-400">Store Page</Text>;
    }
  };

  if (!userDoc) {
    return null;
  }

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4} noHorizontalPadding>
      <View className="mx-4 flex-row items-center justify-between">
        <Heading size="large">Shop</Heading>
        <CurrencyDisplay gemCount={userDoc.economy.gems} goldCount={userDoc.economy.gold} />
      </View>
      <View className="flex-1">
        <ChipTabs
          tabs={storeTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mt-4 ps-4"
        />
        <View className="flex-1 items-center justify-center px-4">{renderTabContent()}</View>
      </View>
    </StandardSafeLayout>
  );
};

export default StoreScreen;
