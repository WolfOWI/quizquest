import React from 'react';
import { View, Text } from 'react-native';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import Heading from '@/components/typography/Heading';

const StoriesScreen = () => {
  return (
    <StandardSafeLayout>
      <TopAppBar title="Stories" titleCenter />
      <View className="flex-1 items-center justify-center px-4">
        <Heading className="mb-4 text-center">Stories</Heading>
        <Text className="text-center text-gray-400">Stories screen</Text>
      </View>
    </StandardSafeLayout>
  );
};

export default StoriesScreen;
