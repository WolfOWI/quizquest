import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Domain } from '@/lib/types/content/ContentTypes';

interface DomainCategoryProps {
  domain: Domain;
  onPress: (domainId: string) => void;
}

const DomainCategory = ({ domain, onPress }: DomainCategoryProps) => {
  return (
    <Pressable onPress={() => onPress(domain.id)} className={`mr-4 items-center`}>
      <View
        className="mb-2 h-24 w-24 items-center justify-center rounded-2xl"
        style={{ backgroundColor: domain.hexColour }}>
        <Text className="text-5xl">{domain.iconKey}</Text>
      </View>
      <Text className="text-center font-pixelify text-sm text-white">{domain.title}</Text>
    </Pressable>
  );
};

export default DomainCategory;
