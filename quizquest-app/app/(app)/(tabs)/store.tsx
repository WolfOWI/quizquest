import React, { useState } from 'react';
import { View } from 'react-native';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { ChipTabs, ChipTabInterface } from '@/components/navigation/ChipTabs';
import CurrencyDisplay from '@/components/counters/CurrencyDisplay';
import { useAppStore } from '@/lib/state/appStore';
import Heading from '@/components/typography/Heading';
import StoriesTab from '@/components/storeTabs/StoriesTab';
import ItemsTab from '@/components/storeTabs/ItemsTab';
import CharactersTab from '@/components/storeTabs/CharactersTab';
import CurrencyTab from '@/components/storeTabs/CurrencyTab';
import PetsTab from '@/components/storeTabs/PetsTab';

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
        return <StoriesTab />;
      case 'items':
        return <ItemsTab />;
      case 'characters':
        return <CharactersTab />;
      case 'currency':
        return <CurrencyTab />;
      case 'pets':
        return <PetsTab />;
      default:
        return <StoriesTab />;
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
        <View className="mt-4 flex-1 items-center justify-center">{renderTabContent()}</View>
      </View>
    </StandardSafeLayout>
  );
};

export default StoreScreen;
