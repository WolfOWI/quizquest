import React from 'react';
import { View, Text } from 'react-native';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import Heading from '@/components/typography/Heading';

const KnowledgeScrollScreen = () => {
  return (
    <StandardSafeLayout>
      <TopAppBar title="Knowledge Scroll" titleCenter />
      <View className="flex-1 items-center justify-center px-4">
        <Heading className="mb-4 text-center">Knowledge Scroll</Heading>
        <Text className="text-center text-gray-600 dark:text-gray-400">Monsters Slain</Text>
      </View>
    </StandardSafeLayout>
  );
};

export default KnowledgeScrollScreen;
