import React from 'react';
import { View, Text } from 'react-native';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import Heading from '@/components/typography/Heading';

const StoreScreen = () => {
  return (
    <StandardSafeLayout>
      <TopAppBar title="Store" titleCenter />
      <View className="flex-1 items-center justify-center px-4">
        <Heading className="mb-4 text-center">Store</Heading>
        <Text className="text-center text-gray-400">Store Page</Text>
      </View>
    </StandardSafeLayout>
  );
};

export default StoreScreen;
