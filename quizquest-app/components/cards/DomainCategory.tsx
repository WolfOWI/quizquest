import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Domain } from '@/lib/types/content/ContentTypes';

interface DomainCategoryProps {
  domain: Domain;
  onPress: (domainId: string) => void;
}

const DomainCategory = ({ domain, onPress }: DomainCategoryProps) => {
  const getCategoryColor = (domainId: string) => {
    // TODO: Setup colors for each domain (in content/domains.json)

    const colors = {
      animals: 'bg-green-400',
      programming: 'bg-purple-400',
      literature: 'bg-yellow-400',
      chemistry: 'bg-blue-400',
      history: 'bg-red-400',
      mathematics: 'bg-pink-400',
      physics: 'bg-indigo-400',
      biology: 'bg-emerald-400',
    };
    return colors[domainId as keyof typeof colors] || 'bg-gray-400';
  };

  const getCategoryIcon = (domainId: string) => {
    // TODO: Setup icons for each domain (in content/domains.json)
    // Simple emojis for now
    const icons = {
      animals: '🐢',
      programming: '💻',
      literature: '📚',
      chemistry: '🧪',
      history: '🏛️',
      mathematics: '📐',
      physics: '⚛️',
      biology: '🧬',
    };
    return icons[domainId as keyof typeof icons] || '📖';
  };

  return (
    <Pressable onPress={() => onPress(domain.id)} className={`mr-4 items-center`}>
      <View
        className={`h-24 w-24 rounded-2xl ${getCategoryColor(domain.id)} mb-2 items-center justify-center`}>
        <Text className="text-5xl">{getCategoryIcon(domain.id)}</Text>
      </View>
      <Text className="text-center font-pixelify text-sm text-white">{domain.title}</Text>
    </Pressable>
  );
};

export default DomainCategory;
