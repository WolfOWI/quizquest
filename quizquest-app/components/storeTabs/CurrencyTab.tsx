import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const CurrencyTab = React.memo(() => {
  return (
    <ScrollView className="w-full flex-1" showsVerticalScrollIndicator={false}>
      <View className="w-full flex-1 items-center justify-center py-20">
        <Text className="text-center font-pixelify text-gray-400">Currency Store</Text>
        <Text className="mt-2 text-center font-pixelify text-sm text-gray-500">Coming Soon</Text>
      </View>
    </ScrollView>
  );
});

export default CurrencyTab;
